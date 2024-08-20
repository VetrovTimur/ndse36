const fs = require('fs');

// Функция для анализа лог-файла
const analyzeLogFile = (filename) => {
    let totalGames = 0;
    let wins = 0;
    let losses = 0;

    try {
        const logData = fs.readFileSync(filename, 'utf8');
        const lines = logData.trim().split('\n');

        lines.forEach((line) => {
            const parts = line.split(', '); // Разбиваем строку на части
            const result = parts[2]; // Получаем результат из 3-й части (индекс 2)

            totalGames++;

            if (result.includes('Вы угадали!')) {
                wins++;
            } else {
                losses++;
            }
        });
    } catch (err) {
        console.error('Ошибка при чтении лог-файла:', err);
        return;
    }

    const winPercentage = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : 0;

    console.log('Статистика игры "Орёл или решка":');
    console.log(`Общее количество партий: ${totalGames}`);
    console.log(`Количество выигранных партий: ${wins}`);
    console.log(`Количество проигранных партий: ${losses}`);
    console.log(`Процентное соотношение выигранных партий: ${winPercentage}%`);
};

// Получаем путь к лог-файлу из аргументов командной строки или используем значение по умолчанию
const logFilePath = process.argv[2] || 'results.log';

// Запускаем анализ лог-файла
analyzeLogFile(logFilePath);