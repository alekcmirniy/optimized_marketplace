function closeByButton(event: KeyboardEvent, emit: (event: string, ...args: Array<any>) => void
): void {
    if (event.key === "Escape")
        emit("close");
}
export { closeByButton };