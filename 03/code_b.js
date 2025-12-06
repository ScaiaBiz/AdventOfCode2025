const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const banks = txt.split('\r\n');
console.log(banks);

let sum = 0;

banks.forEach(bank => {
	// console.log(bank);

	const length = 12;
	const actvieBatteries = [];
	const usedBatteries = [];
	for (let index = 0; index < length; index++) {
		actvieBatteries[index] = 0;
		usedBatteries[index] = -1;
	}

	for (let index = 0; index < length; index++) {
		const bankArray = bank.split('');

		for (let idx = 0; idx < bankArray.length; idx++) {
			const value = bankArray[idx];

			if (!usedBatteries.includes(idx)) {
				let remainingValues = bankArray.length - (idx + 1);
				let remainingLimit = length + (index + 1) * -1;
				let isVaidPosition = remainingValues >= remainingLimit;

				if (index > 0 && idx < usedBatteries[index - 1]) {
					isVaidPosition = false;
				}

				if (value > actvieBatteries[index] && isVaidPosition) {
					actvieBatteries[index] = value;
					usedBatteries[index] = idx;
				}
			}
		}
	}

	console.log(actvieBatteries.join(''));
	// console.log(usedBatteries);

	sum += parseInt(actvieBatteries.join(''));
});
console.log('-----');

console.log(sum);
