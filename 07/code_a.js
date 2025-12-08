const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
// console.log(txt);

const array = txt.split('\r\n');

const diagram = [];
array.forEach(row => {
	const nRow = [];
	row.split(' ').forEach(el => {
		if (el !== '') {
			nRow.push(el);
		}
	});

	diagram.push(nRow);
});

// console.log(diagram);
console.log('----- Esecuzione -------');

let validSplitter = 0;
let prevBeamPosition = [];
let nextBeamPosition = [];

diagram.forEach((r, rowIdx) => {
	const row = r.toString().split('');
	nextBeamPosition = [];
	nextBeamPosition.length > 0;

	// if (rowIdx > 4) {
	// 	return;
	// }

	let prevValue = null;
	const nRow = [];
	row.map((v, col) => {
		let prevRowValue = prevBeamPosition[col] || null;

		if (v === '^') {
			nRow[col - 1] = '|';

			if (prevRowValue === '|') {
				nextBeamPosition[col - 1] = '|';
				nextBeamPosition[col] = '.';
				nextBeamPosition[col + 1] = '|';
				validSplitter++;
			}
		}

		if (v !== '^' && (prevRowValue === '|' || prevRowValue === 'S')) {
			v = '|';
		}

		if (prevRowValue === '^') {
			v = '.';
		}

		if (prevValue === '^') {
			v = '|';
		}

		/*** Assegnaizione */

		prevBeamPosition[col] = v;

		if (nextBeamPosition[col] === undefined) {
			nextBeamPosition[col] = v;
		}

		prevValue = v;

		nRow.push(v);
	});
	// console.log(
	// 	prevBeamPosition.join('') || null,
	// 	nRow.join(''),
	// 	nextBeamPosition.join('') || null
	// );

	prevBeamPosition = [...nRow];
});
console.log(validSplitter);
