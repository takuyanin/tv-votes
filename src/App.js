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

class Tvs extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleVote = this.handleVote.bind(this)
  }

  componentWillMount() {
    TVS.forEach(tv => {
      this.setState({
        // ...this.state,
        [tv.id]: 0
      })
    })
  }
  handleVote(id) {
    this.setState({
      [id]: this.state[id] + 1
    })
  }

  render() {
    return (
      <div>
        <h2>Tvs</h2>
        <Route exact path='/tvs' render={props => <TvList handleVote={this.handleVote} />} />
        <Route path='/tvs/:id' render={props => <Tv match={props.match} votes={this.state} />} />
      </div>
    )
  }
}
// const Tvs = () => (
//   <div>
//     <h2>Tvs</h2>
//     <Route exact path='/tvs' component={TvList} />
//     <Route pathh path='/tvs/:id' component={Tv} />
//   </div>
// )

const TvList = (props) => (
  <div>
    {TVS.map(tv => (
      <li key={tv.id}>
        <Link to={`/tvs/${tv.id}`}>{tv.name}</Link>
        <button onClick={() => props.handleVote(tv.id)}>+</button>
      </li>
    ))}
  </div>
)

const Tv = props => {
  const { id } = props.match.params
  const tv = tvById(id)
  const vote = props.votes[id]

  if (typeof tv === 'undefined') {
    return (
      <div>
        <p>Tvs with id '{id}' does not exist.</p>
      </div>
    )
  }
  const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
  const contentsStyle = { margin: 0 }

  return (
    <div>
      <div style={containerStyle}>
        <p style={contentsStyle}>{tv.name}</p>
        <h1 style={contentsStyle}>{tv.description}</h1>
      </div>
      <h1>Vote: {vote}</h1>
    </div>
  )
}


const TVS = [
  {
    id: 'tabizaru',
      name: 'tabizaru',
      description: 'Some Japanese comedians travels around the world including in Japan.'
  },
  {
    id: 'gakitsuka',
    name: 'gakitsuka',
    description: 'Some of most famous Japanese comediana fool around and give us lots of laughter.'
  },
  {
  id: 'moyasama',
  name: 'moyasama',
  description: 'Japanese comedians and a female newcaster walk aorund less populated area mainly in Tokyo, Japan.'
  }
]

const tvById = id => TVS.find(tv => tv.id === id)

export default App
