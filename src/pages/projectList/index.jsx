import {useState, useEffect} from 'react'
import SearchPanel from './components/searchPanel/'
import TableList from './components/tablelist/'
import * as qs from 'qs'
import {deleteObjEmptyProperty} from 'utils/tools'
let BASE_API_URL = process.env.REACT_APP_API_URL
 function Project() {
    const [params, setParams] = useState({
        personId:'',
        name:''
    })
    const [projectList,setProjectList] = useState([])
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch(`${BASE_API_URL}/projects?${qs.stringify(deleteObjEmptyProperty(params))}`).then(async (response)=> await response.json()).then(res=>{
            setProjectList(res)
            console.log(projectList)
        })
    },[params])
    useEffect(()=>{
        fetch(`${BASE_API_URL}/users`).then(async response => response.json()).then(res=>{
            setTimeout(()=>{
                setUsers(res)
            },0)
            console.log(users)
        })
    },[])
    return<>
        <div>hello</div>
        <SearchPanel users={users} params={params} setParams={setParams}/>
        <TableList list={projectList} users={users}/>
    </>
}
export default Project