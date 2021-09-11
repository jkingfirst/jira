import React from "react";
import "./App.css";
// import Project from "pages/projectList/";
// import Test from "pages/reactTest";
import AuthenticatedApp from "pages/autenticatedApp";
import UnAuthenticatedApp from "pages/unAuthenticatedApp";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "./component/errorBoundary";
import { FullPageError } from "./component/libStyle";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
