import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function JiraRoutes() {
  return (
    <Router>
      <Switch>
        <Route path={"/projects"}></Route>
      </Switch>
    </Router>
  );
}
