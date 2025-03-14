import React, { Component } from "react";

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      participate: "", 
      roll_no: "",
    };
  }

  changeHandler = (e) => {
    let nam = e.target.name;
    let val = e.target.value;

    if (nam === "roll_no" && isNaN(val)) {
      alert("Please enter a valid Roll Number (Numbers Only)");
      return; 
    }

    this.setState({
      [nam]: val, 
    });
  };

  render() {
    return (
      <div>
        <h2>Enter Your Name</h2>
        <input name="participate" type="text" onChange={this.changeHandler} />

        <h2>Enter Your Roll No</h2>
        <input name="roll_no" type="text" onChange={this.changeHandler} />

        <h1>
          Welcome {this.state.participate}, Your Roll Number is {this.state.roll_no}
        </h1>
      </div>
    );
  }
}

export default StudentForm;
