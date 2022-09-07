import React from 'react';

export default class Image extends React.Component {

	render() {
		//TODO: Create a suitable image style. Remember to add width and height variables into <img>-tag.
		let style = {
			width: 200,
			height: 200
		}
		return(
			<div style={style}>
				<img src={this.props.src} />
			</div>
		)
	}
}