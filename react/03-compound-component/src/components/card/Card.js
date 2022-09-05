import { useState } from 'react';
import Square from './Square';
import Label from './Label';

const Card = (props) => {
    const [state, setState] = useState({ color: "red" });


    const onColorChange = () => {
        let newColor = "#";
        const colorPicker = "0123456789ABCDEF";
        for (let i = 0; i < 6; i++) {
            newColor += colorPicker[Math.floor(Math.random() * 16)];
        }
        setState({ color: newColor });
    }

    let cardStyle = {
        margin: '15px',
        height: 200,
        width: 150,
        backgroundColor: "white",
        webKitFilter: "drop-shadow(0px 0px 5px #666)",
        filter: "drop-shadow(0px 0px 5px #666)",
    };

    return (
        <div style={cardStyle}>
            <Square color={state.color} />
            <Label color={state.color}  onColorChange={onColorChange} />
        </div>
    );
}

export default Card;