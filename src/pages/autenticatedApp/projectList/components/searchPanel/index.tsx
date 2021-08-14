import { Input, Select } from "antd";
const { Option } = Select;
export interface Users {
  id: string;
  name: string;
}
interface searchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: searchPanelProps["params"]) => void;
  users: Users[];
}
function SearchPanel({ params, setParams, users }: searchPanelProps) {
  return (
    <div style={{ display: "flex" }}>
      <Input
        type="text"
        placeholder="用户名或者项目名"
        allowClear={true}
        value={params.name}
        onChange={(e) => {
          setParams({
            ...params,
            name: e.target.value,
          });
        }}
      />
      <Select
        value={params.personId}
        onSelect={(value) => {
          setParams({
            ...params,
            personId: value,
          });
        }}
      >
        <Option value="">负责人</Option>
        {users.map((item) => {
          return (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
export default SearchPanel;
