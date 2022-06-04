const weather = {

    async getData({ searchTerm1, searchTerm2 }, timeout = 0) {

        let requestStr;

        if (searchTerm1 && searchTerm2) {
            requestStr = `/api/weather/${searchTerm1}/${searchTerm2}`;
        } else {
            requestStr = `/api/weather/${searchTerm1}`;
        }

        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    console.log(`[ 🚀🚀🚀 Requested for weather report. 🚀🚀🚀 ]`);
                    const response = await fetch(requestStr);
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    const json = await response.json();
                    resolve(json);
                }
                catch (error) {
                    reject(`Could not get weather report: ${error}`);
                }
            }, timeout * 1000);
        });
    }
}

export default weather;