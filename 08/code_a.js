const fs = require('fs');

const file = './example.txt';
// const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
// console.log(txt);

const array = txt.split('\r\n');
// console.log(array);

const coords = [];
array.forEach(row => {
	const nRow = [];
	row.split(',').forEach(el => {
		if (el !== '') {
			nRow.push(parseInt(el));
		}
	});

	coords.push(nRow);
});

console.log(coords);

const findDistance = (p1, p2) => {
	// console.log(p1, p2);

	/** Non funziona così */
	// let base = 0;
	// for (let index = 0; index < p1.length - 1; index++) {
	// 	base += Math.pow(p1[index] - p2[index], 2);
	// }

	const distance = Math.sqrt(
		Math.pow(p1[0] - p2[0], 2) +
			Math.pow(p1[1] - p2[1], 2) +
			Math.pow(p1[2] - p2[2], 2)
	);

	return distance;
};

console.log('----- Esecuzione -------');

const circuits = [];

// const coordsObj = coords.map(c => {
// 	return {
// 		string: c.join(','),
// 		coords: c,
// 		distance: Math.abs(findDistance(c, coords[0])),
// 	};
// });

// coordsObj.sort((a, b) => a.distance - b.distance);

// console.log(coordsObj);

let connections = 0;
let connectionsLimit = 10;

let connectedList = [];

const eval1 = () => {
	coords.map((p1, p1id) => {
		// if (p1id > 2) {
		// 	return;
		// }
		// if (connections >= connectionsLimit) {
		// 	return;
		// }

		let minDist = Infinity;
		let nearest = null;

		coords.map((p2, p2id) => {
			// if (p2id > 2) {
			// 	return;
			// }
			const dist = Math.abs(findDistance(p1, p2));

			if (dist !== 0 && dist < minDist) {
				minDist = dist;
				nearest = p2;
			}
		});
		console.log(nearest);

		if (nearest && connections < connectionsLimit) {
			const target = p1.join(',');
			const founded = nearest.join(',');

			let found = false;
			circuits.forEach(circuit => {
				if (circuit.includes(founded) && circuit.includes(target)) {
					found = true;
				}
				if (circuit.includes(target) && !circuit.includes(founded)) {
					// circuit.push(founded);
					// found = true;
				}

				if (!found && circuit.includes(founded) && !circuit.includes(target)) {
					circuit.push(target);
					found = true;
				}
			});

			if (!found) {
				circuits.push([target, founded]);
			}

			connections++;
		} else {
			console.log('noNearest');
		}
	});
};
eval1();

const eval2 = () => {
	coordsObj.map((p1, p1id) => {
		// if (p1id > 2) {
		// 	return;
		// }
		if (connections >= connectionsLimit) {
			return;
		}

		let minDist = Infinity;
		let nearest = null;

		coordsObj.map((p2, p2id) => {
			// if (p2id > 2) {
			// 	return;
			// }
			const dist = p2.distance - p1.distance;

			if (dist !== 0 && dist < minDist) {
				minDist = dist;
				nearest = p2.string;
			}
		});

		if (nearest) {
			const target = p1.string;
			const founded = nearest;

			console.log(target, founded);

			let found = false;
			circuits.forEach(circuit => {
				if (circuit.includes(target) && !circuit.includes(founded)) {
					circuit.push(founded);
					found = true;
				}

				if (!found && circuit.includes(founded) && !circuit.includes(target)) {
					circuit.push(target);
					found = true;
				}

				if (!found && circuit.includes(founded) && circuit.includes(target)) {
					found = true;
				}
			});

			if (!found) {
				circuits.push([target, founded]);
			}

			connections++;
		} else {
			console.log('noNearest');
		}
	});
};
// eval2();

circuits.sort((a, b) => b?.length - a?.length);
console.log(circuits);

let sum = 1;
let lastLength = 0;
let count = 0;

circuits.forEach(c => {
	if (count < 3 && c.length !== lastLength) {
		console.log(c.length);

		sum = sum * c.length;
		lastLength = c.length;
		count++;
	}
});

console.log(sum);
