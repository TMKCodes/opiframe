import React from 'react';

export default class Redlight extends React.Component {

	render() {
		let style = {
			backgroundColor:"white",
			height:200,
			width:200
		}
		//TODO: change the backgroundColor to red when the app state is appropriate
		if(this.props.color === "red") {
			style.backgroundColor = "red";
		} else {
			style.backgroundColor = "white";
		}
		return (
			<div style={style}></div>
		)
		
	
	}
}