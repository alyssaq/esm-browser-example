import { h, render } from 'preact/src/preact'

export default function() {
  render(
    h('div', {class: 'hi'}, 'Hello World rendered with preact!'),
    document.body
  )
}
