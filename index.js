const fs = require('fs');
const readline = require('readline');

const getRandomNumber = () => Math.floor(Math.random() * 2) + 1;

const logResult = (filename, result) => {
    fs.appendFile(filename, `${result}\n`, (err) => {
        if (err) {
            console.error('Ошибка записи в лог-файл:', err);
        }
    });
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const playGame = (filename) => {
    const randomNumber = getRandomNumber();
    console.log('Загадано число: 1 (Орёл) или 2 (Решка)');
    
    rl.question('Угадайте (1 или 2): ', (input) => {
        const userGuess = parseInt(input, 10);

        if (userGuess !== 1 && userGuess !== 2) {
            console.log('Пожалуйста, введите 1 или 2.');
            playGame(filename);
            return;
        }

        const result = userGuess === randomNumber ? 'Вы угадали!' : 'Вы не угадали.';
        console.log(result);
        logResult(filename, `Ваш выбор: ${userGuess}, Загаданное число: ${randomNumber}, Результат: ${result}`);

        rl.question('Хотите сыграть еще раз? (да/нет): ', (answer) => {
            if (answer.toLowerCase() === 'да') {
                playGame(filename);
            } else {
                console.log('Спасибо за игру!');
                rl.close();
            }
        });
    });
};


const filename = process.argv[2];

if (!filename) {
    console.error('Пожалуйста, укажите имя файла для логирования.');
    process.exit(1);
}


playGame(filename);