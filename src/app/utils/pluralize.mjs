const cases = [2, 0, 1, 1, 1, 2];

/**
 * Использование:
 * pluralize(['1 штука','2 штуки','5 штук'], число);
 *
 * pluralize(['Яблоко','Яблока','Яблок'], 0); // Яблок
 * pluralize(['Яблоко','Яблока','Яблок'], 1); // Яблоко
 * pluralize(['Яблоко','Яблока','Яблок'], 2); // Яблока
 */
const pluralize = (titles, number) => titles[
    (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
];

export default pluralize;
