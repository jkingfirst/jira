/* @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { user } from "types/user";
import { IdSelect } from "component/IdSelect";
import { Project } from "types/project";
interface searchPanelProps {
  params: Partial<Pick<Project, "name" | "personId">>;
  setParams: (params: searchPanelProps["params"]) => void;
  users: user[];
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
        <IdSelect
          value={params.personId}
          defaultOptionName={"负责人"}
          options={users}
          onChange={(value) => {
            setParams({
              ...params,
              personId: value,
            });
          }}
        />

        {/*<Select
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
              <Option value={String(item.id)} key={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>*/}
      </Form.Item>
    </Form>
  );
}
export default SearchPanel;
