const fs = require('fs');
const { inflate } = require('zlib');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');

const array = txt.split('\r\n');

let prevValue = '';
const operators = array[array.length - 1].split('').map(el => {
	if (el != prevValue && el !== ' ') {
		prevValue = el;
	}

	return prevValue;
});

const exercise = [];

array.forEach(row => {
	// console.log(row);

	const nRow = [];

	row.split('').forEach(el => {
		nRow.push(el);
	});
	exercise.push(nRow);
});

console.log(operators.length);
console.log('----- Esecuzione -------');
let sum = 0;

let rowTot = 0;

for (let col = operators.length - 1; col > -1; col--) {
	let value = '';

	exercise.forEach(row => {
		const element = row[col];
		if (parseInt(element)) {
			value += element;
		}
	});

	if (parseInt(value)) {
		switch (operators[col]) {
			case '+':
				rowTot += parseInt(value);

				break;
			case '*':
				if (rowTot === 0) {
					rowTot = 1;
				}
				rowTot = rowTot * parseInt(value);

				break;

			default:
				break;
		}
	}

	if (value.trim() === '') {
		// console.log(sum, rowTot, ': ', sum + rowTot);
		sum += rowTot;

		rowTot = 0;
	}
}
// console.log(sum, rowTot, ': ', sum + rowTot);
sum += rowTot;

console.log('----- Risultato -----');

console.log(sum);
