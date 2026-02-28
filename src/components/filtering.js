export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map((name) => {
                    // @todo: создать и вернуть тег опции
                    const option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    return option;
                }),
            );
        });
    };

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === "clear") {
            const input =
                action.parentElement.querySelector('input[type="text"]');
            input.value = "";
            state[action.dataset.field] = "";
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const filter = {};
        Object.keys(elements).forEach((key) => {
            if (elements[key]) {
                if (
                    ["INPUT", "SELECT"].includes(elements[key].tagName) &&
                    elements[key].value
                ) {
                    // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] =
                        elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query; // если в фильтре что-то добавилось, применим к запросу
    };

    return {
        updateIndexes,
        applyFiltering,
    };
}
