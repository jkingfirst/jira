import { useState, useEffect } from "react";
import SearchPanel from "./components/searchPanel/index";
import TableList from "./components/tablelist/index";
import * as qs from "qs";
import { useHttp } from "../../../utils/httpRequest";
import { deleteObjEmptyProperty, useDebounce } from "utils/tools";
let BASE_API_URL = process.env.REACT_APP_API_URL;
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
    /*fetch(`${BASE_API_URL}/users`)
      .then(async (response) => response.json())
      .then((res) => {
        setTimeout(() => {
          setUsers(res);
        }, 0);
        console.log(users);
      });*/
  }, []);
  return (
    <>
      <div>hello</div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <TableList list={projectList} users={users} />
    </>
  );
}
export default Project;
