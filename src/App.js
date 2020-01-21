import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./components/Home";
import Students from "./components/Students";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import Dashboard from "./components/Dashboard";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <NavLink exact to="/" className="logo" activeClassName="logo">
          ✨
        </NavLink>
        <NavLink
          exact
          to="/"
          className="navbar-item"
          activeClassName="selected"
        >
          Home
        </NavLink>
        <NavLink
          exact
          to="/students"
          className="navbar-item"
          activeClassName="selected"
        >
          Students
        </NavLink>
        <NavLink
          exact
          to="/dashboard"
          className="navbar-item"
          activeClassName="selected"
        >
          Dashboard
        </NavLink>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/students/:id" component={Student} />
          <Route exact path="/add-student" component={AddStudent} />
          <Route exact path="/edit-student/:id" component={EditStudent} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
