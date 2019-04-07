import moment from 'moment/src/moment'
import { renderChart } from './d3-example.js'
import preact from './preact-example.js'

const elem = document.createElement('div')
elem.innerText = `Time now: ${moment().format()}!`
document.body.appendChild(elem)

preact()
renderChart()
