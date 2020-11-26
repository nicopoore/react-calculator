import React, { Component } from 'react'
import { connect } from 'react-redux'

class Button extends Component {
  constructor(props) {
    super(props)
    this.updateInput = this.updateInput.bind(this)
  }
  
  handleClick = () => {
    this.updateInput()
    this.updateOutput()
  }

  evalEquation = (equation) => {
    try {
      return (Math.round(1000000000000 * eval(equation.replace(/x/g, '*'))) / 1000000000000).toString()
    } catch (e) {
      if (e instanceof SyntaxError) {
        return 'NaN'
      }
    }
  }

  handleEmpty = (empty) => {
    if(empty.charAt(0) === '0' && empty.charAt(1) !== '.') {
      return parseInt(empty).toString()
    } else return empty
  }

  updateInput = () => {
    let newInput

    switch (this.props.buttonType) {
      case 'clear':
        newInput = ''
        break;
      case 'equals':
        newInput = this.evalEquation(this.props.input)
        break;
      case 'number':
        if (this.props.output.length >= 20) {
          newInput = this.props.input
        } else {
          newInput = this.props.input.concat(this.props.content).toString()
        }
        break;
      case 'decimal':
        if (this.props.output.length >= 20) {
          newInput = this.props.input
        } else if(this.props.output.match(/\.+/)) {
          newInput = this.props.input
        } else if(isNaN(this.props.input.charAt(this.props.input.length-1)) || this.props.input === '') {
          newInput = this.props.input.concat('0.')
        } else {
          newInput = this.props.input.concat(this.props.content)
        }
        break;
      case 'operation':
        if(this.props.content === '-' && this.props.output === '-') {
          newInput = this.props.input
        } else if((isNaN(this.props.output) && this.props.content !== '-')) {
          newInput = this.props.input.replace(/\D*$/, this.props.content)
        } else {
          newInput = this.props.input.concat(this.props.content)
        }
        break;
      default:
        newInput = this.props.input
    }

    newInput = this.handleEmpty(newInput)

    this.props.dispatch({
      type: 'UPDATE_INPUT',
      input: newInput
    })
  }

  updateOutput = () => {
    let newOutput
    switch (this.props.buttonType) {
      case 'clear':
        newOutput = '0'
        break;
      case 'equals':
        newOutput = this.evalEquation(this.props.input)
        break;
      case 'operation':
        newOutput = this.props.content
        break;
      case 'decimal':
        if (this.props.output.length >= 20) {
          newOutput = this.props.output
        } else if(this.props.output.match(/\.+/)) {
          newOutput = this.props.output
        } else if(this.props.output === '0') {
          newOutput = '0.'
        } else {
          newOutput = this.props.output.concat(this.props.content)
        }
        break;
      case 'number':
        if (this.props.output.length >= 20) {
          newOutput = this.props.output
        } else if (this.props.output.match(/\.$/)) {
          newOutput = this.props.output.concat(this.props.content)
        } else {
          newOutput = this.props.output.concat(this.props.content).replace(/(?!\.)\W*x*/g, "")
        }
        break;
      default:
        newOutput = this.props.output
        break;
    }

    newOutput = this.handleEmpty(newOutput)

    this.props.dispatch({
      type: 'UPDATE_OUTPUT',
      output: newOutput
    })
  }

  render() {
    const divId = this.props.id.concat('-div')
    return (
      <div id={divId} className="padButton">
        <button id={this.props.id} onClick={this.handleClick}>{this.props.content}</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  input: state.input,
  output: state.output,
})

export default connect(mapStateToProps)(Button)