import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NumPad, Input, Output } from './components'
import Author from './components/Author'

const defaultState = {
  input: '',
  output: '0',
  numPadData: [
    {
      id: "clear",
      content: "AC",
      buttonType: "clear"
    },
    {
      id: "divide",
      content: "/",
      buttonType: "operation"
    },
    {
      id: "multiply",
      content: "x",
      buttonType: "operation"
    },
    {
      id: "seven",
      content: "7",
      buttonType: "number"
    },
    {
      id: "eight",
      content: "8",
      buttonType: "number"
    },
    {
      id: "nine",
      content: "9",
      buttonType: "number"
    },
    {
      id: "subtract",
      content: "-",
      buttonType: "operation"
    },
    {
      id: "four",
      content: "4",
      buttonType: "number"
    },
    {
      id: "five",
      content: "5",
      buttonType: "number"
    },
    {
      id: "six",
      content: "6",
      buttonType: "number"
    },
    {
      id: "add",
      content: "+",
      buttonType: "operation"
    },
    {
      id: "one",
      content: "1",
      buttonType: "number"
    },
    {
      id: "two",
      content: "2",
      buttonType: "number"
    },
    {
      id: "three",
      content: "3",
      buttonType: "number"
    },
    {
      id: "equals",
      content: "=",
      buttonType: "equals"
    },
    {
      id: "zero",
      content: "0",
      buttonType: "number"
    },
    {
      id: "decimal",
      content: ".",
      buttonType: "decimal"
    }
  ]
}

const rootReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'UPDATE_INPUT':
      return {
        ...state,
        input: action.input
      }
    case 'UPDATE_OUTPUT':
      return {
        ...state,
        output: action.output
      }
    default:
      return state
  }
}

const store = createStore(rootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Input />
        <Output />
        <NumPad />
        <Author />
      </div>
    </Provider>
  );
}

export default App;
