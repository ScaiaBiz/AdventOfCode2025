const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const array = txt.split('\r\n');

let password = 0;
let lastValue = 50;

let totRotations = 0;

let zero = 0;
let currValue = lastValue;

array.forEach(el => {
	const movement = el.substring(0, 1);
	const value = Number(el.substring(1));

	let actValue = lastValue;

	const coef = movement === 'R' ? 1 : -1;
	const steps = (value * coef) % 100;

	for (let index = 1; index <= value; index++) {
		actValue += coef;

		if (actValue % 100 === 0) {
			zero++;
			actValue = 0;
		}
	}
	const rotations = Math.abs((lastValue + value * coef) / 100);

	let rotationCount = 0;
	if (rotations > 1) {
		rotationCount = Math.trunc(rotations);
		totRotations += rotationCount;
	}

	currValue += steps;

	if (lastValue > 0 && currValue < 0) {
		rotationCount++;
		totRotations++;
	}

	if (currValue > 99) {
		currValue -= 100;
	}

	if (currValue < 0) {
		currValue += 100;
	}

	// console.log(
	// 	el,
	// 	'=',
	// 	lastValue,
	// 	steps,
	// 	'=>',
	// 	currValue,
	// 	rotationCount,
	// 	';',
	// 	zero
	// );

	if (currValue === 0) {
		password++;
	}

	lastValue = currValue % 100;
});

console.log('========');
console.log(password);
console.log(totRotations);
// console.log(password + totRotations);
console.log('========');
console.log(zero);
// console.log(zero + password);
