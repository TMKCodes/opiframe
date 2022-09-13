import ShoppingRow from "./ShoppingRow";

const ShoppingList = (props) => {
    let items = props.list.map((item, index) => {
        return (
            <ShoppingRow key={index} item={item} />
        );
    });
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Tyyppi</th>
                    <th scope="col">Määrä</th>
                    <th scope="col">Hinta</th>
                    <th scope="col">Muokkaa</th>
                    <th scope="col">Poista</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    )
}

export default ShoppingList;