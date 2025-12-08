const fs = require('fs');

const file = './example.txt';
// const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
// console.log(txt);

const array = txt.split('\r\n');

const diagramString = [];
const diagram = [];
array.forEach(row => {
	const nRow = [];
	row.split(' ').forEach(el => {
		if (el !== '') {
			diagram.push(el.split(''));
		}

		diagramString.push(el);
	});
});

console.log('----- Esecuzione -------');

let prevBimCol = null;

const checkTrip = () => {};
let splitFound = false;
diagram.map((r, rowIdx) => {
	if (splitFound) {
		return;
	}
	if (rowIdx <= 2) {
		const nRow = [];

		r.forEach((v, col) => {
			if (v === '|' || v === 'S') {
				prevBimCol = col;
			}
			if (col === prevBimCol && v !== '^') {
				v = '|';
			}

			if (v === '^') {
				if (col === prevBimCol) {
					let splitCount = 1;
					let lastSplitRow = rowIdx;

					nRow[col - 1] = '|'; //TODO: Definire come/quando calcolare + o -
					prevBimCol = col - 1;

					/**
					 * Luppare le righe alla ricerca degli splitter fino alla riga finale
					 * sommare al conteggio e poi contare l'ultima riga utilizzata per poi deviare a destra
					 * ...
					 *
					 */
				}
			}

			nRow.push(v);
		});

		console.log(r.join(''), nRow.join(''));
	}
});
