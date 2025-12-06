const { log } = require('console');
const fs = require('fs');

const file = './example.txt';
// const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const gridString = txt.split('\r\n');

const grid = gridString.map(el => {
	return el.split('');
});

const range = 1;
const limit = 4;

let sum = 0;

const chekPosition = (row, col) => {
	// if (row < 0 || col < 0) {
	// 	// console.log(col, row, 'OOB');
	// 	return 0;
	// } else {
	// console.log(col, row, grid[row][col]);
	if (grid?.[row]?.[col] === '@') {
		return 1;
	}
	return 0;
	// }
};

grid.forEach((items, row) => {
	items.forEach((value, col) => {
		let found = 0;
		// if (row == 0) {
		if (value === '@') {
			for (let i = 1; i <= range; i++) {
				found += chekPosition(row - i, col - i);
				found += chekPosition(row - i, col);
				found += chekPosition(row - i, col + i);

				found += chekPosition(row, col - i);
				found += chekPosition(row, col + i);

				found += chekPosition(row + i, col - i);
				found += chekPosition(row + i, col);
				found += chekPosition(row + i, col + i);
			}
			// console.log('Partenza', col, row, value, { found });
			// console.log();
			if (found < limit) {
				sum++;
			}
		}
		// }
	});
});

console.log(sum);
