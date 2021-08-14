import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Project from "pages/projectList/";
// import Test from "pages/reactTest";
import AuthenticatedApp from "pages/autenticatedApp";
import UnAuthenticatedApp from "pages/unAuthenticatedApp";
import { useAuth } from "./context/auth-context";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
