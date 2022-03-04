export function handleError(error) {
// alert("Error");
    console.log(JSON.stringify(error, null, 2));
}

export function numberFormat(number) {
    if (number) {
        return Number(number).toLocaleString("en-US", {});
    }
    return number;
}