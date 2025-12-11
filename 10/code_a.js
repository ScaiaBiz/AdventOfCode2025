const fs = require('fs');

const file = './example.txt';
// const file = './input.txt';

const txt = fs.readFileSync(file, 'utf-8');
// console.log(txt);

const array = txt.split('\r\n');

console.log(array);

const machines = array.map(a => {
	const nMachine = {
		leds: [],
		buttons: [],
		joltage: [],
	};
	a.split(' ').forEach(el => {
		const target = el.substring(1, el.length - 1);
		switch (el.substring(0, 1)) {
			case '[':
				const state = target.split('').map(s => (s === '.' ? 0 : 1));

				nMachine.leds.push(...state);
				break;
			case '(':
				nMachine.buttons.push(target.split(','));

				break;
			case '{':
				nMachine.joltage.push(...target.split(','));

				break;

			default:
				break;
		}
	});
	// console.log(nMachine);

	return nMachine;
});

console.log('----- Esecuzione -------');

const pressButton = (state, button) => {
	// const target = button.split('')
	button.forEach(position => {
		state[position] ^= 1;
	});

	return state;
};

machines.forEach(machine => {
	console.log('------- Macchina: --------');
	let lastState = machine.leds.map(l => 0);
	console.log(lastState, machine.leds);

	machine.buttons.forEach(b => {
		lastState = pressButton(lastState, b);
		console.log(b, lastState);
	});
});

// console.log(pressButton([false, false, false, false], ['1', '2']));
