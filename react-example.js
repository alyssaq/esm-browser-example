import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.person} from react`);
  }
}

const elem = document.createElement('div')
document.body.appendChild(elem)

ReactDOM.render(
  React.createElement(Hello, {person: 'world'}, null),
  elem
)
