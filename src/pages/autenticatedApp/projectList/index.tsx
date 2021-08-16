import { useState, useEffect } from "react";
import SearchPanel from "./components/searchPanel/index";
import TableList from "./components/tablelist/index";
import { useHttp } from "../../../utils/httpRequest";
import { deleteObjEmptyProperty, useDebounce } from "utils/tools";
import styled from "@emotion/styled";
import { Row } from "component/libStyle";
function Project() {
  const [params, setParams] = useState({
    personId: "",
    name: "",
  });
  const debounceParams = useDebounce(params, 1000);
  const [projectList, setProjectList] = useState([]);
  const [users, setUsers] = useState([]);
  const PList = useHttp();
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
          <h1>logo</h1>
          <h1>项目</h1>
          <h1>用户名</h1>
        </HeaderLeft>
        <HeaderRight></HeaderRight>
      </Header>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <TableList list={projectList} users={users} />
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
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
