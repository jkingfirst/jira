import { useTaskSearchParams } from "../../util";
import { useSetSearchParams } from "../../../../../utils/url";
import { Row } from "component/libStyle";
import { Button, Input } from "antd";
import UserSelect from "../../../../../component/UserSelect/UserSelect";
import TaskTypeSelect from "../../../../../component/taskTypeSelect/TaskTypeSelect";

export const SearchPanel = () => {
  const params = useTaskSearchParams();
  const setParams = useSetSearchParams();
  const reset = () => {
    setParams({
      typeId: undefined,
      name: undefined,
      tagId: undefined,
      processorId: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        placeholder={"任务名"}
        value={params.name}
        onChange={(e) => setParams({ ...params, name: e.target.value })}
        style={{ width: "20rem" }}
      />
      <UserSelect
        value={params.processorId}
        onChange={(processorId) => setParams({ ...params, processorId })}
      />
      <TaskTypeSelect
        value={params.typeId}
        onChange={(typeId) => setParams({ ...params, typeId })}
      ></TaskTypeSelect>
      <Button onClick={reset}>重置</Button>
    </Row>
  );
};
