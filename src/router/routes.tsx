import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function JiraRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={"/projects"}></Route>
      </Routes>
    </Router>
  );
}
