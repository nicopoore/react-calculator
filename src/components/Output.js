import React from 'react'
import { connect } from 'react-redux'

const Output = (props) => {
  return (
    <div className="calc-display output" id="display">
      {props.output}
    </div>
  )
}

const mapStateToProps = (state) => ({
  output: state.output
})

export default connect(mapStateToProps)(Output)