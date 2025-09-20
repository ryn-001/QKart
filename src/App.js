import {Route,Routes} from "react-router-dom";
import Header from "./component/Header.js";
import Products from "./component/Products.js";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={<Products/>}></Route>
        <Route path="/register"></Route>
        <Route path="/login"></Route>
        <Route path="/checkout"></Route>
        <Route path="/thanks"></Route>
      </Routes>
    </div>
  );
}

export default App;
