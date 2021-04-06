import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UnitTagging from "./components/UnitTagging/UnitTagging.js";  
import Academics from "./components/Academics/Academics.js";
import { homePage } from "./components/homePage/homePage"
import Allocations from "./components/Allocations/Allocations";
import "bootstrap/dist/css/bootstrap.min.css";
import Import from "./components/Import/Import.js";
import Export from "./components/Export/Export.js"; 

// Remove token from local storage upon page close or reload
window.onbeforeunload = function() {
  localStorage.clear();
  return "";
};

// MAIN APP FUNCTION
function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Route exact path="/" component={homePage} />
          <Route path="/Academics" component={Academics} />
          <Route path="/Units" component={UnitTagging} />
          <Route path="/Allocations" component={Allocations} />
          <Route path="/Import" component={Import} />
          <Route path="/Export" component={Export} />
        </main>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
