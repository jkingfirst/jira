import { useState, useEffect } from "react";
import SearchPanel from "./components/searchPanel/";
import TableList from "./components/tablelist/";
import * as qs from "qs";
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
  useEffect(() => {
    fetch(
      `${BASE_API_URL}/projects?${qs.stringify(
        deleteObjEmptyProperty(debounceParams)
      )}`
    )
      .then(async (response) => await response.json())
      .then((res) => {
        setProjectList(res);
        console.log(projectList);
      });
  }, [debounceParams]);
  useEffect(() => {
    fetch(`${BASE_API_URL}/users`)
      .then(async (response) => response.json())
      .then((res) => {
        setTimeout(() => {
          setUsers(res);
        }, 0);
        console.log(users);
      });
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
