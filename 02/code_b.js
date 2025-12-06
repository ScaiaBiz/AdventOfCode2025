const { log } = require('console');
const fs = require('fs');

// const file = './example.txt';
const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
const rangesList = txt.replace(/[\n\r]/g, '').split(',');
// console.log(rangesList);

let sum = 0;

rangesList.forEach((range, i) => {
	const range_start = parseInt(range.split('-')[0]);
	const range_end = parseInt(range.split('-')[1]);
	// console.log(range);

	for (let index = range_start; index <= range_end; index++) {
		if (i >= 0) {
			// if (i == 10) {
			let found = false;
			const target = index.toString();
			const t_length = target.length;

			const firstHalf = target.substring(0, t_length / 2);
			const secondHalf = target.substring(t_length / 2);

			if (firstHalf === secondHalf) {
				// console.log('>>> Confronto metà', index);
				found = true;
			}

			//se è dispari
			if (!found && t_length > 1 && t_length <= 7) {
				const chekValue = target.substring(0, 1);
				let equal = true;
				target.split('').forEach(v => {
					if (v !== chekValue) {
						equal = false;
						return;
					}
				});

				if (equal) {
					// console.log('>>> Tutti uguali: ', index);
					found = true;
				}
			}

			//Se è pari
			if (!found && (t_length % 2 === 0 || t_length > 7)) {
				let pattern = '';
				let hasPattern = false;
				let first = true;
				target.split('').forEach((v, idx) => {
					if (!hasPattern && idx >= 0) {
						pattern += v;
						const pattern_length = pattern.length;
						let chunk = target.substring(pattern_length, pattern_length * 2);

						// first && console.log(target, ': p-', pattern, chunk);

						if (pattern === chunk) {
							hasPattern = true;
						}

						if (hasPattern) {
							// console.log('>>> Pattern ripetuto: ' + target);
							let validPattern = true;

							for (let index = 0; index < t_length; index += pattern_length) {
								let check = target.substring(index, index + pattern_length);
								// console.log(target, ':', index, pattern_length, check);
								// console.log(check, pattern, check === pattern);
								if (check !== pattern) {
									validPattern = false;
								}
							}
							if (validPattern) {
								// console.log('>>> Pattern ripetuto', index);

								found = true;
							}

							return;
						}

						if (!hasPattern && idx + 1 >= t_length / 2) {
							// first &&
							// 	console.log(
							// 		'-- No',
							// 		target,
							// 		pattern,
							// 		chunk,
							// 		'idx:',
							// 		idx,
							// 		't_length:',
							// 		t_length / 2
							// 	);
							first = false;
							return;
						}
					}
				});
			}

			if (found) {
				console.log('Aggiungere:', index);

				sum += index;
			}
		}
	}
	// console.log('--------');
});

console.log(sum);
