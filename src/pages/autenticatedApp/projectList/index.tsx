import { useState, useEffect } from "react";
import SearchPanel from "./components/searchPanel/index";
import TableList from "./components/tablelist/index";
import { useHttp } from "../../../utils/httpRequest";
import { deleteObjEmptyProperty, useDebounce } from "utils/tools";
import styled from "@emotion/styled";
import { Row } from "component/libStyle";
import { Button, Menu, Dropdown } from "antd";
import { ReactComponent as SortwareLogo } from "assets/software-logo.svg";
import { useAuth } from "context/auth-context";

function Project() {
  const [params, setParams] = useState({
    personId: "",
    name: "",
  });
  const debounceParams = useDebounce(params, 1000);
  const [projectList, setProjectList] = useState([]);
  const [users, setUsers] = useState([]);
  const PList = useHttp();
  const { user, loginout } = useAuth();
  const menu = (
    <Menu>
      <Menu className="Item" key={"logout"}>
        <Button type={"link"} onClick={loginout}>
          登出
        </Button>
      </Menu>
    </Menu>
  );
  useEffect(() => {
    PList("/projects", { data: deleteObjEmptyProperty(debounceParams) }).then(
      (res) => {
        setProjectList(res);
      }
    );
  }, [debounceParams]);
  useEffect(() => {
    PList("/users", {}).then((res) => {
      setUsers(res);
    });
  }, []);
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true}>
          <SortwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SortwareLogo>
          <h2>项目</h2>
          <h2>用户名</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type={"link"}>{user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Content>
        <h1>项目列表</h1>
        <SearchPanel users={users} params={params} setParams={setParams} />
        <TableList list={projectList} users={users} />
      </Content>
    </Container>
  );
}
export default Project;
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
