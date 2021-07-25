import { useArray } from "utils/tools";
export default function Test() {
  let arr: { name: string; age: number }[] = [
    { name: "jack", age: 18 },
    { name: "ma", age: 16 },
  ];
  let { list, addItem, clear, removeItem } = useArray(arr);

  return (
    <div>
      <button onClick={() => addItem({ name: "jking", age: 19 })}>添加</button>
      <button onClick={() => removeItem(0)}>删除</button>
      <button onClick={() => clear()}>清空</button>
      {list.map((item) => {
        return (
          <div key={item.name}>
            {item.name}
            {item.age}
          </div>
        );
      })}
    </div>
  );
}
