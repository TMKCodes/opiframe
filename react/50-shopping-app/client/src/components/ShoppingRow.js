
const ShoppingRow = (props) => {
    return (
        <tr>
            <td>{props.item.type}</td>
            <td>{props.item.count}</td>
            <td>{props.item.price}</td>
            <td><button className="btn btn-danger">Edit</button></td>
            <td><button className="btn btn-danger">Remove</button></td>
        </tr>
    )
}

export default ShoppingRow;