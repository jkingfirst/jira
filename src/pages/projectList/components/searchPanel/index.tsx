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
    <form>
      <input
        type="text"
        value={params.name}
        onChange={(evt) => {
          setParams({
            ...params,
            name: evt.target.value,
          });
        }}
      />
      <select
        value={params.personId}
        onChange={(e) => {
          console.log(e.target.value);
          setParams({
            ...params,
            personId: e.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {users.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </form>
  );
}
export default SearchPanel;
