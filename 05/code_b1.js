const { log } = require('console');
const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const Soluzione = 366181852921027;

const txt = fs.readFileSync(file, 'utf-8');
const inventory = txt.split('\r\n');

const ranges = [];
const ingredients = [];
let range = true;

let index = 0;

const mins = [];
const maxs = [];
do {
	if (inventory?.[index] === undefined || inventory[index] === '') {
		range = false;
	} else {
		const min = parseInt(inventory[index].split('-')[0]);
		const max = parseInt(inventory[index].split('-')[1]);

		ranges.push({ min, max });
		mins.push(min);
		maxs.push(max);
	}
	index++;
} while (range);

// console.log(ranges);
ranges.sort((a, b) => b.max - a.max);
mins.sort((a, b) => b - a);
maxs.sort((a, b) => b - a);

/*** Inizio esecuzione */

const t_mins = [];
const t_maxs = [];

for (let i = 0; i < 10; i++) {
	if (mins?.[i] && maxs?.[i]) {
		t_mins.push(mins[i]);
		t_maxs.push(maxs[i]);
	}
}

// console.log(t_mins);t

let sum = 0;
let lastMin = null;

t_maxs.forEach((el, i) => {
	let delta = 0;
	let curMax = el;
	if (lastMin && curMax > lastMin) {
		// console.log(curMax, '>', lastMin, 'Cambio valore massomo:', lastMin - 1);
		curMax = lastMin - 1;
	}

	let curMin = t_mins[i];

	if (curMax > curMin) {
		delta = curMax - curMin + 1;
		sum += delta;
	}
	// console.log(curMax, curMin, '-->', delta);
	lastMin = curMin;
});

// console.log(ranges);

// ranges.forEach((range, idx) => {
// 	const { min, max } = range;

// 	if (idx>0) {

// 	}

// 	let count = max - min + 1;

// 	console.log(idx, 'di', ranges.length, '-', min, max, ':', count);

// 	sum += count;
// });
console.log('------------------');

console.log(sum);

if (sum != Soluzione) {
	console.log(Soluzione - sum);
}

/**
 * Non funziona|
 */
