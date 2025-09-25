import {Route,Routes} from "react-router-dom";
import Header from "./component/Header.js";
import Products from "./component/Products.js";
import './App.css';

export const config = {
  endPoint: `https://qkart-frontend-kts7.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Products/>}></Route>
        <Route path="/register"></Route>
        <Route path="/login"></Route>
        <Route path="/checkout"></Route>
        <Route path="/thanks"></Route>
      </Routes>
    </div>
  );
}

export default App;
