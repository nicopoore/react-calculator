import React from 'react'
import { connect } from 'react-redux'

const Input = (props) => {
  return (
    <div className="calc-display input" id="input">
      {props.input}
    </div>
  )
}

const mapStateToProps = (state) => ({
  input: state.input
})

export default connect(mapStateToProps)(Input)