import { useProjectIdInUrl, useTaskQueryKey } from "../../util";
import { useAddTask } from "../../../../../utils/task";
import { useEffect, useState } from "react";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const submit = async () => {
    await addTask({ projectId, kanbanId, name });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);
  useEffect(() => {
    setName("");
  }, [inputMode]);
  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        value={name}
        placeholder={"任务名"}
        onChange={(evt) => setName(evt.target.value)}
        onPressEnter={submit}
      />
    </Card>
  );
};
