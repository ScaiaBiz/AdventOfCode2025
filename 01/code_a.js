const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const array = txt.split('\r\n');

let password = 0;
let lastValue = 50;

array.forEach(el => {
	const movement = el.substring(0, 1);
	const value = Number(el.substring(1));

	// console.log(lastValue, movement, value);

	const coef = movement === 'R' ? 1 : -1;

	lastValue = lastValue + ((value * coef) % 100);

	if (lastValue < 0) {
		lastValue += 100;
	}
	if (lastValue > 100) {
		lastValue -= 100;
	}
	if (Math.abs(lastValue) === 100) {
		lastValue = 0;
	}

	if (lastValue === 0) {
		password++;
	}

	// console.log(lastValue);
	// console.log('-------');
});

console.log(password);
