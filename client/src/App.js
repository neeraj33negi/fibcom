import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './otherPage';
import fib from './fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Route exact path = "/" component={fib}/>
            <Route path = "/otherpage" component={OtherPage}/>
          </div>
        </header>
      </div>
    </Router>
  );
}



export default App;
