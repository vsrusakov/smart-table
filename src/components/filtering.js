import {createComparison} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const defaultRules = [
    // 'skipNonExistentSourceFields',
    'skipEmptyTargetValues',
    // 'failOnEmptySource',
    'arrayAsRange',
    'stringIncludes',
    'exactEquality'
];
const compareTotalFrom = (key, sourceValue, targetValue, source, target) => {
    if (key === 'totalFrom' && targetValue) {
        const minTotal = parseInt(targetValue);
        if (!isNaN(minTotal)) {
            return { result: source.total >= minTotal };
        }
    }
    return { continue: true };
}

const compareTotalTo = (key, sourceValue, targetValue, source, target) => {
    if (key === 'totalTo' && targetValue) {
        const maxTotal = parseInt(targetValue);
        if (!isNaN(maxTotal)) {
            return { result: source.total <= maxTotal };
        }
    }
    return { continue: true };
}

const compare = createComparison(defaultRules, [compareTotalFrom, compareTotalTo]);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        // @todo: создать и вернуть тег опции
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
            )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input[type="text"]');
            input.value = '';
            state[action.dataset.field] = '';
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}