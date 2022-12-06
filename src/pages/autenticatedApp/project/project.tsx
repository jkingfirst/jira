// import {Link,Switch,Route,useRouteMatch,Redirect} from 'react-router-dom' router v5
import { Link, Routes, Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router";
import TaskGroupsPage from "pages/autenticatedApp/taskGroups/taskGroups";
import KanpanPage from "pages/autenticatedApp/kanban/kanban";
import { ScreenContainer } from "../../../component/libStyle";
import styled from "@emotion/styled";
import { Menu } from "antd";
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
  const useCurrentRoute = () => {
    const unit = useLocation().pathname.split("/");
    return unit[unit.length - 1];
  };
  return (
    <Container>
      <Aside className={"aside"}>
        <Menu mode={"inline"} selectedKeys={[useCurrentRoute()]}>
          <Menu.Item key={"kanban"}>
            <Link to={`kanban`}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={`epic`}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={`kanban`} element={<KanpanPage />}></Route>
          <Route path={`taskGroups`} element={<TaskGroupsPage />}></Route>
          <Navigate
            to={`${window.location.pathname}/kanban`}
            replace={true}
          ></Navigate>
        </Routes>
      </Main>
    </Container>
  );
};
export default ProjectPage;
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
