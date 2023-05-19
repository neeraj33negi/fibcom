const keys = require("./keys");
const express = require("express");
const redis = require("redis");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  port: keys.pgPort,
  password: keys.pgPassword,
  database: keys.pgDatabase
});

pgClient.on("error", () => console.log("Lost Connection"));

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();


app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Number too high");
  }

  redisClient.hset('values', index, "Nothing yet");
  redisPublisher.publish("insert", index);
  pgClient.query("insert into values(number) VALUES($1)", [index]);
  res.send({working: true});
});

app.listen(5000, err => {
  console.log("-------LISTENING--------");
});
