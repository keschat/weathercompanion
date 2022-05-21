function fetch_current_data() {
    // The fetch() API returns a Promise.  This function
    // exposes a similar API, except the fulfillment
    // value of this function's Promise has had more
    // work done on it.
    return fetch('current-data.json').then(response => {
        if (response.headers.get('content-type') != 'application/json') {
            throw new TypeError();
        }
        var j = response.json();
        // maybe do something with j
        return j; // fulfillment value given to user of
        // fetch_current_data().then()
    });
}

function fetch_weather_data() {
    // The fetch() API returns a Promise.  This function
    // exposes a similar API, except the fulfillment
    // value of this function's Promise has had more
    // work done on it.
    return fetch('current-data.json').then(response => {
        if (response.headers.get('content-type') != 'application/json') {
            throw new TypeError();
        }
        var j = response.json();
        // maybe do something with j
        return j; // fulfillment value given to user of
        // fetch_current_data().then()
    });
}
