import moment from 'moment/src/moment.js'
import { renderChart } from './d3-example.js'
import preact from './preact-example.js'

const root = document.getElementById('root')
root.innerText = `Time now: ${moment().format()}!`

preact()
renderChart()
