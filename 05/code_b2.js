const { log } = require('console');
const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const ranges = txt.split('\r\n');
const ingredients = [];

// const ranges = [];
let range = true;

let index = 0;

const mins = [];
const maxs = [];
do {
	if (ranges?.[index] === undefined || ranges[index] === '') {
		range = false;
	} else {
		const min = parseInt(ranges[index].split('-')[0]);
		const max = parseInt(ranges[index].split('-')[1]);

		mins.push(min);
		maxs.push(max);
	}
	index++;
} while (range);

mins.sort((a, b) => a - b);
maxs.sort((a, b) => a - b);

let sum = 0;
let lastMax = null;

maxs.forEach((el, i) => {
	let delta = 0;
	let curMax = el;
	let curMin = mins[i];

	if (lastMax && curMin <= lastMax) {
		// console.log(curMax, '>', lastMin, 'Cambio valore massimo:', lastMin - 1);
		curMin = lastMax + 1;
	}

	if (curMin <= curMax) {
		delta = curMax - curMin + 1;
		sum += delta;
	}

	console.log(curMax, curMin, '-->', delta);

	lastMax = Math.max(lastMax ?? -Infinity, maxs[i]);
});

console.log('------------------');

console.log(sum);
