import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from './Button'

class NumPad extends Component {

  renderButtons = (i, arr) => {
    return (
      <Button
        key={arr[i].id}
        id={arr[i].id}
        content={arr[i].content}
        buttonType={arr[i].button}
      />
    )
  }

  render() {
    let numPad = this.props.numPadData.map((_, i, arr) => this.renderButtons(i, arr))
    
    return (
      <div id="NumPad">
        {numPad}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  numPadData: state.numPadData
})

export default connect(mapStateToProps)(NumPad)