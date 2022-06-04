const location = {

    response: 'Could not get current location.',

    options: {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
    },

    currentCoords: {},

    async getCoords() {

        let pos;

        if (!navigator.geolocation) {
            pos = Promise.reject('Geolocation is not supported by your device');
        } else {
            const status = 'Locating…';
            pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, this.options);
            });
        }

        return { coords: pos.coords };
    },

    async watchCoords() {

            let id, target;

        //     function success(pos) {
        //       const crd = pos.coords;

        //       if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        //         console.log('Congratulations, you reached the target');
        //         navigator.geolocation.clearWatch(id);
        //       }
        //     }

        //     function error(err) {
        //       console.warn('ERROR(' + err.code + '): ' + err.message);
        //     }

        //     target = {
        //       latitude : 0,
        //       longitude: 0
        //     };

        //     options = {
        //       enableHighAccuracy: false,
        //       timeout: 5000,
        //       maximumAge: 0
        //     };

        //     id = navigator.geolocation.watchPosition(success, error, options);
    },
}

export default location;