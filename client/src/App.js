import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import otherPage from './otherPage';
import fib from './fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/otherPage">Other Page</Link>
        </header>
        <div>
          <Route exact path = "/" component={fib}/>
          <Route path = "/otherpage" component={otherPage}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
