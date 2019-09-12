import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/tvs'>Tvs</Link></li>
      </ul>

      <hr />

      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/tvs' component={Tvs} />
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Hi, welcome!</p>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
    <p>The page to vote to tv-programs.</p>
  </div>
)

const Tvs = () => (
  <div>
    <h2>Tvs</h2>
    <p>Write the list of tvs here.</p>
  </div>
)

export default App
