function TableList ({list,users}) {
    return <table>
        <thead>
        <tr>
            <td>名称</td>
            <td>负责人</td>
        </tr>
        </thead>
        <tbody>
        {list.map(item=> <tr>
            <td>{item.name}</td>
            <td>{users.find(user => user.id === item.personId)?.name||'未知'}</td>
        </tr>)}
        </tbody>
    </table>
}
export default TableList