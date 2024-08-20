const readline = require('readline');

const min = 0;
const max = 100;
const secretNumber = Math.floor(Math.random() * (max - min + 1));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const startGame = () => {
    console.log(`Загадано число в диапазоне от ${min} до ${max}`);
    askForGuess();
};

const askForGuess = () => {
    rl.question('Введите ваше число: ', (input) => {
        const guess = parseInt(input, 10);

        if (isNaN(guess)) {
            console.log('Пожалуйста, введите число.');
            askForGuess();
            return;
        }

        if (guess < min || guess > max) {
            console.log(`Число должно быть в диапазоне от ${min} до ${max}.`);
            askForGuess();
            return;
        }

        if (guess < secretNumber) {
            console.log('Больше');
            askForGuess();
        } else if (guess > secretNumber) {
            console.log('Меньше');
            askForGuess();
        } else {
            console.log(`Отгадано число ${secretNumber}! Поздравляем!`);
            rl.close();
        }
    });
};

startGame();