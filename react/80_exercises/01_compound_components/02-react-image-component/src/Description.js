import React from 'react';

export default class Description extends React.Component {

	render() {
		//TODO: Create a simple style and choose a HTML element of your liking as the text source. Remember that the actual description comes as a prop from FancyImage-component.
		let style = {
			backgroundColor : "white",
			marginTop: 10,
			marginLeft: 10,
			height: 200,
			width: 200,
			margin: "auto"
		}
		return (
			<p style={style}>{this.props.text}</p>
		)
	}
}