import d3linear from './node_modules/d3-scale/src/linear'
import d3band from './node_modules/d3-scale/src/band'
import d3select from './node_modules/d3-selection/src/select.js'
import {axisBottom, axisLeft} from './node_modules/d3-axis/src/axis.js'

async function readData () {
  const response = await fetch('./data.json')
  return await response.json()
}

export function renderChart () {
  // set the dimensions and margins of the graph
  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  // set the ranges
  const x = d3band()
    .range([0, width])
    .padding(0.1)
  const y = d3linear()
    .range([height, 0])

  // Prep the svg workspace for the chart
  const svg = d3select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform',
          `translate(${margin.left},${margin.top})`)

  readData().then(data => {
    console.log(data)

    // Scale the range of the data in the domains
    x.domain(data.map((d) => d.person))
    y.domain([0, 50])

    // append the rectangles for the bar chart
    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.person))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.sales))
        .attr('height', (d) => height - y(d.sales))

    // add the x Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(axisBottom(x))

    // add the y Axis
    svg.append('g')
        .call(axisLeft(y))
  })
}
