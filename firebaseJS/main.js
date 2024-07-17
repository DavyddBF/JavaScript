import './style.css'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h2>Firebase + JS</h2>
  </div>
`

setupCounter(document.querySelector('#counter'))
