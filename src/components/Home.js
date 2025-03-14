import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      text: "Welcome Student",
    };
    // this.chnageme = this.chnageme.bind(this);
  }

  chnageme = () => {
    this.setState((prevState) => ({
      text: prevState.text === "Welcome Student" ? "Welcome to the React class" : "Welcome Student",
    }));
  }



  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
        {/* <button onClick={()=> this.chnageme()}>Click me</button> */}
        <button onClick={this.chnageme}>Click me</button>
      </div>
    );
  }
}

export default Home;
