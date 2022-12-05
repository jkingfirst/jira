// import {Link,Switch,Route,useRouteMatch,Redirect} from 'react-router-dom' router v5
import { Link, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import TaskGroupsPage from "pages/autenticatedApp/taskGroups/taskGroups";
import KanpanPage from "pages/autenticatedApp/kanban/kanban";
const ProjectPage = () => {
  /*const {path,url} = useRouteMatch()
  return <div>
      <h1>ProjectPage</h1>
      <Link to={`${url}/kanban`}>看板</Link>
      <Link to={`${url}/taskGroups`}>任务组</Link>
      <Switch>
          <Route path={`${path}/kanban`}><KanpanPage/></Route>
          <Route path={`${path}/taskGroups`}><TaskGroupsPage/></Route>
          <Redirect to={`${path}/kanban`}></Redirect>
      </Switch>
  </div>;*/
  return (
    <div>
      <h1>ProjectPage</h1>
      <Link to={`kanban`}>看板</Link>
      <Link to={`taskGroups`}>任务组</Link>
      <Routes>
        <Route path={`kanban`} element={<KanpanPage />}></Route>
        <Route path={`taskGroups`} element={<TaskGroupsPage />}></Route>
        <Navigate
          to={`${window.location.pathname}/kanban`}
          replace={true}
        ></Navigate>
      </Routes>
    </div>
  );
};
export default ProjectPage;
