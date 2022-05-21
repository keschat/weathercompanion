async function fetdata(context) {

    try {
        const response = await fetch(context);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(`Could not get data - [ ${error} ]`);
    }
}