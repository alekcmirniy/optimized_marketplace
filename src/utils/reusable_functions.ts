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

export { closeByButton };
export { getFormattedPrice }