import { useState, useEffect } from "react";
import SearchPanel from "./components/searchPanel/index";
import TableList from "./components/tablelist/index";
import styled from "@emotion/styled";
import { Row } from "component/libStyle";
import { Button, Menu, Dropdown } from "antd";
import { ReactComponent as SortwareLogo } from "assets/software-logo.svg";
import { useAuth } from "context/auth-context";
// import {useAsync} from "utils/useAsync";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { resetRoute, useDebounce } from "utils/tools";
// import {Helmet} from 'react-helmet'
import { useDocumentTitle } from "utils/tools";
import ProjectPage from "pages/autenticatedApp/project/project";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useUrlQueryParams } from "utils/url";
function ProjectListPage() {
  useDocumentTitle("项目列表", false);
  // useEffect(() => {
  //
  //   PList("/users", {}).then((res) => {
  //     console.log('user--------')
  //     console.log('user',res)
  //     setUsers(res);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <Container>
      {/*<Helmet>
            <title>任务列表</title>
        </Helmet>*/}
      <PageHeader></PageHeader>
      <Router>
        {/*升级react-router v5到v6*/}
        {/*<Switch>
          <Route exact path={"/projects"}>
            {" "}
            <Main />
          </Route>
          <Route path={"/projects/:projectId"}>
            {" "}
            <ProjectPage />
          </Route>
            <Redirect to={'/projects'}></Redirect>
        </Switch>*/}
        <Routes>
          <Route path={"/projects"} element={<Main />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
          <Navigate to={"/projects"} />
        </Routes>
      </Router>
    </Container>
  );
}
function PageHeader() {
  const { user, logout } = useAuth();
  const menu = (
    <Menu>
      <Menu.Item className="Item" key={"logout"}>
        <Button type={"link"} onClick={logout}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <SortwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SortwareLogo>
        </Button>
        <h2>项目</h2>
        <h2>用户名</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={menu}>
          <Button type={"link"}>Hi:{user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
}
function Main() {
  // const [, setParams] = useState({
  //   personId: "",
  //   name: "",
  // });
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);
  const debounceParams = useDebounce(params, 1000);
  // const [projectList, setProjectList] = useState([]);
  // const [users, setUsers] = useState([]);
  const { data: projectList, isRuning } = useProject(debounceParams);
  const { data: users } = useUsers();
  // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js:110-186
  // 当obj是基本类型的时候，就不会无限循环
  // 当 obj是对象的时候，就会无限循环
  // 当 obj 是对象的state时，不会无限循环
  useEffect(() => {
    // run(PList("/projects", { data: deleteObjEmptyProperty(debounceParams)}))
    /*PList("/projects", { data: deleteObjEmptyProperty(debounceParams) }).then(
          (res) => {
            setProjectList(res);
          }
        ).catch(err=>{
            setProjectList([])
            message.error(err.message)
        }).finally(()=>{
          setLoading(false)
        });*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);
  // let searchParams = useUrlQueryParams(['name'])
  // console.log(searchParams)
  return (
    <Content>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      <TableList
        loading={isRuning}
        dataSource={projectList || []}
        users={users || []}
      />
    </Content>
  );
}
Main.whyDidYouRender = true;
export default ProjectListPage;
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Content = styled.div`
  padding: 3.2rem;
`;
