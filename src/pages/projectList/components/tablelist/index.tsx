import { Users } from "../searchPanel";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
}
interface tabList {
  list: Project[];
  users: Users[];
}
function TableList({ list, users }: tabList) {
  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>
              {users.find((user) => user.id === item.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TableList;
