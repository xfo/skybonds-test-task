const input = [
    '1.5',
    '3',
    '6',
    '1.5'
];

const processInput = (input) => {
    const parsed = input.map(parseFloat);
    const sum = parsed.reduce((sum, v) => (sum + v), 0);

    return parsed.map(v => (v * 100 / sum).toFixed(3));
};

// Вычислительная сложность: O(n) – линейная
// Оценка необходимой памяти: n * 3

console.log(processInput(input));

// Тест производительности функции. Вызывает функцию {times} раз и возвращает среднее время выполнения в ms
const performanceTest = (func, argument, times = 100) => {
    const performanceResults = [];

    for (let i = 0; i < times; i++) {
        const t0 = performance.now();
        func(argument);
        const t1 = performance.now();
        performanceResults.push(t1 - t0);
    }

    return performanceResults.sort()[Math.ceil(performanceResults.length / 2)];
};

// Узнаем max размер массива, который сможет обработать функция за 100мс
const calculateMaxDataSize = (maxTime = 100) => {
    let lastTime = 0;
    let input = [];

    // Заполним тестовый массив 1000 рандомными значениями
    for (let i = 0; i <= 1000; i++) {
        input.push((Math.random() * 100).toFixed(2));
    }

    while (lastTime < maxTime) {
        lastTime = performanceTest(processInput, input, 3);

        // С каждым разом будем увеличивать тестовые данные на +1000 записей
        input = [...input, ...input];
    };

    return `за ${maxTime} мс функция обработала массив из ${input.length} значений`;
};

console.log(calculateMaxDataSize());
// за 100 мс функция обработала массив из 512512 значений
// Т.к. сложность линейная, за 5 сек функция обработает ~ 512512 * 50 значений