function SearchPanel ({params,setParams,users}) {
    return <form >
        <input type="text" value={params.name} onInput={e=>{
            setParams({
                ...params,
                name:e.target.value
            })
        }}/>
        <select value={params.personId} onChange={e=>{
            console.log(e.target.value)
            setParams({
                ...params,
                personId:e.target.value
            })
        }}>
            <option value="">负责人</option>
            {users.map(item=>{
                return <option value={item.id} key={item.id}>{item.name}</option>
            })}
        </select>
    </form>
}
export default SearchPanel