const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
// console.log(txt);

const array = txt.split('\r\n');

// console.log(array);

const devices = {};
const devicesList = [];

array.forEach(element => {
	const split = element.split(':');

	const device = split[0];
	const outputs = split[1].split(' ').filter(e => e !== '');

	devicesList.push(device);
	devices[device] = outputs;
});

// console.log(devices);
// console.log(devicesList);

console.log('----- Esecuzione -------');

const findWayOut = device => {
	let count = 0;
	outputs = devices[device];

	outputs.forEach(output => {
		if (output == 'out') {
			// console.log(output);
			count++;
		} else {
			count += findWayOut(output);
		}
	});
	// console.log(count);

	return count;
};

const startingPoint = devices.you;

let sum = 0;
startingPoint.forEach(output => {
	if (output == 'out') {
		sum++;
	} else {
		// console.log({ output });
		sum += findWayOut(output);
	}
});

console.log(sum);
