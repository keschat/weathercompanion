const utils = {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async isOnline(timeout = 5) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const online = await fetch("/img/16x16.png");
                    const onlineStatus = online.status >= 200 && online.status < 300; // either true or false
                    resolve(onlineStatus);
                }
                catch (e) {
                    reject(false);
                }
            }, timeout * 1000);
        });
    }
}

export default utils;