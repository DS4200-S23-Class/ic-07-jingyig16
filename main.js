
console.log('linked')

const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50}


const data = [55000, 48000, 27000, 66000, 90000]; 

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME = d3.select('#vis')
					.append('svg')
						.attr('height', FRAME_HEIGHT)
						.attr('width', FRAME_WIDTH)
						.attr('class', 'frame');

// Scaling functions
const MAX_X = d3.max(data, (d) => {return d});
console.log('Max x: ' + MAX_X);
// max_x is 40000

// scale function
const X_SCALE = d3.scaleLinear()
					.domain([0, (MAX_X + 10000)])
// tells my scaling function to handle 0 to max_x+10000 (50000)
					.range([0, VIS_WIDTH]);
					// output value from 0 to vis_width (400)

FRAME.selectAll('points')
		.data(data)
		.enter()
		.append('circle')
			.attr('cx', MARGINS.left)
			.attr('cy', (d) => {
				return (X_SCALE(d) + MARGINS.top);
			})
			.attr('r', 10)
			.attr('class', 'point');


// add an axis
FRAME.append('g')
		.attr('transform',
			"translate(" + MARGINS.left + "," + MARGINS.top + ")")
		.call(d3.axisLeft(X_SCALE).ticks(6))
			.attr('font-size', '20px');
