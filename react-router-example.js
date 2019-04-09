import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Index() {
  return <h2>React-router Home</h2>
}

function About() {
  return <h2>React-router About</h2>
}

function Users() {
  return <h2>React-router Users</h2>
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  )
}

const elem = document.createElement('div')
document.body.prepend(elem)

render(
  AppRouter(),
  elem
)
