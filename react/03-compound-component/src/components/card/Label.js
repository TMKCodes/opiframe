const Label = (props) => {
    const labelStyle = {
        fontFamily : 'sans-serif',
        fontWeight : 'bold',
        padding: 13,
        margin: 0,
        color: props.color
    };
    return (
        <p style={labelStyle} onClick={props.onColorChange}>{props.color}</p>
    );
}

export default Label;