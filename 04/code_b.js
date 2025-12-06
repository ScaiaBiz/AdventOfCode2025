const { log } = require('console');
const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const gridString = txt.split('\r\n');

const grid = gridString.map(el => {
	return el.split('');
});

const range = 1;
const limit = 4;

let sum = 0;

let needNewCicle = false;

let nGrid = [...grid];
let oldGrid = [];

const chekPosition = (row, col) => {
	if (oldGrid?.[row]?.[col] === '@') {
		return 1;
	}
	return 0;
};

const checkValuesRange = (row, col) => {
	let r_found = 0;

	for (let i = 1; i <= range; i++) {
		r_found += chekPosition(row - i, col - i);
		r_found += chekPosition(row - i, col);
		r_found += chekPosition(row - i, col + i);

		r_found += chekPosition(row, col - i);
		r_found += chekPosition(row, col + i);

		r_found += chekPosition(row + i, col - i);
		r_found += chekPosition(row + i, col);
		r_found += chekPosition(row + i, col + i);
	}
	// console.log('Partenza', col, row, { found });
	return r_found;
};

let count = 0;
do {
	needNewCicle = false;
	oldGrid = [...nGrid];

	oldGrid.forEach((items, row) => {
		const nRow = [...oldGrid[row]];
		items.forEach((value, col) => {
			let found = 0;
			if (value === '@') {
				found = checkValuesRange(row, col);

				if (found < limit) {
					sum++;
					needNewCicle = true;
					nRow[col] = 'x';
				}
			}
		});
		nGrid[row] = [...nRow];
		// console.log(grid[row].join('|'));
		// console.log('Riga: -------', row, { sum });
		// console.log(grid[row].join('|'));
	});
	count++;

	// } while (needNewCicle === true);
} while (needNewCicle);

console.log({ count });

// console.log('____ OLD ___');
// grid.forEach(row => {
// 	console.log(row.join('|'));
// });

// console.log('____ NEW ___');
// nGrid.forEach(row => {
// 	console.log(row.join('|'));
// });

console.log(sum);
