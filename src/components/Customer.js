import React, { Component } from 'react'

export class Customer extends Component {
  render() {
    return (
      <div>Customer {this.props.CustomerName}</div>
    )
  }
}

export default Customer