import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const st = {
  textAlign: 'center',
  padding: '10px'
}

ReactDOM.render(
  <div style={st}>
    <App />
  </div>,
  document.getElementById('root')
)
