import React from 'react';

export default class Yellowlight extends React.Component {

	render() {
		let style = {
			backgroundColor:"white",
			marginTop:10,
			marginLeft:10,
			height:200,
			width:200
		}
		//TODO: change the backgroundColor to yellow when the app state is appropriate
		if(this.props.color === "yellow") {
			style.backgroundColor = "yellow";
		} else {
			style.backgroundColor = "white";
		}
		return (
			<div style={style}></div>
		)
		
	
	}
}