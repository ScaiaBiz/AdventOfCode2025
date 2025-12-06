const { log } = require('console');
const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const gridString = txt.split('\r\n');

const ranges = [];
const ingredients = [];
let range = true;

gridString.forEach(el => {
	if (el === '') {
		return (range = false);
	}

	if (range) {
		ranges.push(el);
	} else {
		ingredients.push(parseInt(el));
	}
});

let sum = 0;

ingredients.forEach(ing => {
	found = false;
	ranges.forEach(range => {
		if (found) {
			return;
		}
		const min = range.split('-')[0];
		const max = range.split('-')[1];

		if (ing >= min && ing <= max) {
			found = true;
			sum++;
			return;
		}
	});
});

console.log(sum);
