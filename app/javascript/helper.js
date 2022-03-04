export function handleError(error) {
    console.log(error)
    console.log(JSON.stringify(error, null, 2));
    const message = []
    if (error) {
        console.log(error.response, error.response.data)
        if (error.response) {
            for (let key in error.response.data) {
                message.push(error.response.data[key])
            }
        } else {
            message.push(error.message)
        }

    }
    return message
}

export function numberFormat(number) {
    if (number) {
        return Number(number).toLocaleString("en-US", {});
    }
    return number;
}