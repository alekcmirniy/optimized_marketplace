function closeByButton(event: KeyboardEvent, emit: (event: string, ...args: Array<any>) => void
): void {
    if (event.key === "Escape")
        emit("close");
}

function getFormattedPrice(price: string) : string {   
    let outPrice = price.split("").reverse();
    let formatted = [];
    for (let i = 0; i < outPrice.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formatted.push(",");
        }
        formatted.push(outPrice[i]);
    }
    return formatted.reverse().join("");
}

import type { PossibleQueryParams } from "../types/interfaces"

function createURLFromParameters(params: PossibleQueryParams): string {
    const url = `/api/products/?`;
    const queries = [] as Array<string>;
    Array.from(Object.entries(params)).forEach((pair) => {
        switch (typeof pair[1]) {
            case "string":
                pair[1].length > 0 ? queries.push(`${pair[0]}=${pair[1]}`) : null;
                break;
            case "object":
                const valuesString = pair[1].join("%2C");
                valuesString.length > 0 ? queries.push(`${pair[0]}=${valuesString}`) : null;
                break;
            default:
                break;
        }
    });
    return url.concat(queries.join("&"));
}

import type { SelectedCategories } from "../types/interfaces";

function checkCategoriesEmpty(categories: SelectedCategories | undefined): boolean {
    if (!categories) return true;
    if (categories.brands.length === 0 &&
        categories.types.length === 0 &&
        !Object.entries(categories.subtypes).some(arr => arr[0].length || arr[1].length)
    ) return true;
    else return false;
}

function extractPageNumber(url?: string): string | undefined {
    return url?.match(/page=(\d+)/)?.[1];
}

export { closeByButton };
export { getFormattedPrice };
export { createURLFromParameters };
export { checkCategoriesEmpty };
export { extractPageNumber };