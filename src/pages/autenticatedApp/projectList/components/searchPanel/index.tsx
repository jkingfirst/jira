/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
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
    <Form layout={"inline"} css={{ marginBottom: "2rem" }}>
      <Form.Item>
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
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
}
export default SearchPanel;
