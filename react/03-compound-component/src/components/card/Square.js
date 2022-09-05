const Square = (props) => {
    const squareStyle = {
        backgroundColor: props.color,
        height: '150px'
    };

    return (
        <div style={squareStyle}></div>
    );
}

export default Square;