import React from 'react';
import Redlight from './Redlight';
import Yellowlight from './Yellowlight';
import Greenlight from './Greenlight';

export default class TrafficLight extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			color:"red",
			timer:0
		}
	}
	
	componentDidMount() {
		// TODO: start the timer and change the timer state to save the handle to the timer. Use setInterval-function.
		let timer = setInterval(() => {
			this.changeLight();
		}, 3000);
		this.setState({timer:timer});
	}
	
	changeLight = () => {
		// TODO: Change the state color variable of the application from red->green->yellow->red 
		if (this.state.color === "red") {
			this.setState({color:"green"});
		} else if (this.state.color === "green") {
			this.setState({color:"yellow"});
		} else if (this.state.color === "yellow") {
			this.setState({color:"red"});
		}
	}
	
	render() {
		let style = {
			backgroundColor:"black",
			height:630,
			width:220,
			margin:"auto",
			marginTop:100,
			paddingTop:10
		}
		return(
			<div style={style}>
				<Redlight color={this.state.color}/>
				<Yellowlight color={this.state.color}/>
				<Greenlight color={this.state.color}/>
			</div>
		)
	}
	
}

