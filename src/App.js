import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const App = () => (
  <Router>
    <div className='App'>
      <Header />
      <div className='content'>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/tvs' component={Tvs} />
      </div>
    </div>
  </Router>
)
const Header = () => (
  <div className='header'>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
      <li><Link to='/tvs'>Tvs</Link></li>
    </ul>
  </div>
)

const Home = () => (
  <div className="home">
    <h2>Home</h2>
    <p>Hi, welcome!</p>
  </div>
)

const About = () => (
  <div className="about">
    <h2>About</h2>
    <p>App to vote for tv-programs.</p>
  </div>
)

class Tvs extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleVote = this.handleVote.bind(this)
  }

  componentDidMount() {
    TVS.forEach(tv => {
      this.setState({
        ...this.state,
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
      <div className='tvs'>
        {/* <h2>Tvs</h2> */}
        <Route exact path='/tvs' render={props => <TvList handleVote={this.handleVote} />} />
        <Route path='/tvs/:id' render={props => <Tv match={props.match} votes={this.state} />} />
      </div>
    )
  }
}

const TvList = (props) => (
  <table className='tvlist'>
    <tr>
      <th></th>
      <th>TV programs</th>
      <th></th>
    </tr>
    {TVS.map(tv => (
      <tr key={tv.id}>
        <td>☆</td>
        <td><Link to={`/tvs/${tv.id}`}>{tv.name}</Link></td>
        <td><button onClick={() => props.handleVote(tv.id)}>Vote</button></td>
      </tr>
    ))}
  </table>
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

  return (
    <div className='tv'>
      <div className='tv-title'>
        <p>{tv.name}</p>
        <p>{tv.description}</p>
      </div>
      <p className='vote'>Vote: {vote}</p>
      <div className='back'><Link to='/tvs'>⇨戻る</Link></div>
    </div>
  )
}

const tvById = id => TVS.find(tv => tv.id === id)

const TVS = [
  {
    id: 'tabizaru',
    name: 'tabizaru',
    description: 'Some Japanese comedians travel around the world including in Japan.'
  },
  {
    id: 'gakitsuka',
    name: 'gakitsuka',
    description: 'Some of most famous Japanese comediana fool around and give us lots of laughter.'
  },
  {
    id: 'moyasama',
    name: 'moyasama',
    description: 'Japanese comedians and a female newscaster walk aorund less populated area mainly in Tokyo, Japan.'
  },
  {
    id: 'WBS',
    name: 'WBS',
    description: 'They talk about business overseas and in Japan.'
  }
]

export default App
