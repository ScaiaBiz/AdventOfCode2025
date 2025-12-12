const fs = require('fs');

const file = './example2.txt';
// const file = './input.txt';

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

const findPath = device => {
	const outputs = devices[device];

	const path = [];

	outputs.forEach(output => {
		path.push(output);
		if (output == 'out') {
			path.push(...path);
		} else {
			const nPath = findPath(output);
			path.push(...nPath);
		}
	});

	return path;
};

let sum = 0;
const problems = ['dac', 'fft'];

devicesList.forEach(device => {
	console.log({ device });

	const output = devices[device];
	let path = [];
	if (output == 'out') {
		sum++;
	} else {
		const nPath = findPath(device);
		path.push(...nPath);
	}

	console.log(path);
});

console.log(sum);
