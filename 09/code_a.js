const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
// console.log(txt);

const array = txt.split('\r\n');

// console.log(array);

const positions = [];
array.forEach(el => {
	const nRow = {};
	coords = el.split(',');
	nRow.coords = el;
	nRow.col = coords[0];
	nRow.row = coords[1];

	positions.push(nRow);
});

// console.log(positions);
console.log('----- Esecuzione -------');

positions.sort((a, b) => {
	if (a.row !== b.row) {
		return a.row - b.row;
	}

	return a.col - b.col;
});

const evalMaxMinValue = (v1, v2) => {
	const values = [parseInt(v1), parseInt(v2)];
	values.sort((a, b) => b - a);

	return values;
};

const getArea = (p1, p2) => {
	const b = evalMaxMinValue(p1.row, p2.row);
	const h = evalMaxMinValue(p1.col, p2.col);

	if (b[1] > b[0] || h[1] > h[0]) {
		console.log('error', b, h, b[0] > b[1], h[0] > h[1]);
		return null;
	}
	const base = b[0] - (b[1] - 1);
	const heigth = h[0] - (h[1] - 1);

	if (base < 0 || heigth < 0) {
		console.log('---------');
		console.log(b[0], b[1], ' - ', h[0], h[1]);

		return 0;
	}

	return base * heigth;
};

let maxArea = 0;
let startPoint = null;
let endPoint = null;
positions.forEach(starter => {
	// console.log(starter);

	positions.forEach(point => {
		const area = getArea(starter, point);
		// console.log(point.row, point.col, area);

		if (area !== 0 && area > maxArea) {
			maxArea = area;
			startPoint = starter;
			endPoint = point;
		}
	});
	// console.log('----------');
});

console.log(startPoint);
console.log(endPoint);
console.log(maxArea);
