const fs = require('fs');

const file = './example.txt';
// const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const rangesList = txt.replace(/[\n\r]/g, '').split(',');
console.log(rangesList);

let sum = 0;

rangesList.forEach((range, i) => {
	const range_start = parseInt(range.split('-')[0]);
	const range_end = parseInt(range.split('-')[1]);

	if (i === 0) {
		console.log(i);
	}

	for (let index = range_start; index <= range_end; index++) {
		if (i >= 0) {
			const target = index.toString();
			const t_length = target.length;

			const firstHalf = target.substring(0, t_length / 2);
			const secondHalf = target.substring(t_length / 2);

			// console.log(target, firstHalf, '-', secondHalf);

			if (firstHalf === secondHalf) {
				console.log('- Invalid:', index);

				sum += index;
			}
		}
	}
});

console.log(sum);
