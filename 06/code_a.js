const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
console.log(txt);

const array = txt.split('\r\n');

const exercise = [];
array.forEach(row => {
	const nRow = [];
	row.split(' ').forEach(el => {
		if (el !== '') {
			nRow.push(el);
		}
	});

	exercise.push(nRow);
});

console.log(exercise);
console.log('----- Esecuzione -------');

let sum = 0;
const lastRowId = exercise.length - 1;
const lastRow = exercise[lastRowId];

for (let index = 0; index < lastRow.length; index++) {
	console.log('Colonna: ' + index);
	let colTotal = 0;
	let prevValue = parseInt(exercise[0][index]);
	// console.log(prevValue);

	for (let i = 1; i < lastRowId; i++) {
		const row = exercise[i];

		let rowTot = 0;
		const value = parseInt(row[index]);

		switch (lastRow[index]) {
			case '+':
				rowTot += prevValue + value;

				break;
			case '*':
				rowTot += prevValue * value;

				break;
			case '-':
				rowTot += prevValue - value;

				break;
			case '/':
				rowTot += prevValue / value;

				break;

			default:
				console.log('no value');

				break;
		}

		// console.log(prevValue, lastRow[index], value, '=', rowTot);
		// console.log(rowTot, '|', colTotal);
		colTotal = rowTot;
		prevValue = rowTot;
	}
	console.log('Totale:', colTotal);
	sum += colTotal;
}
console.log('----- Risultato -----');

console.log(sum);

/** Result: 6295830249262 */
