/**
 * State Event Object
 * @description Notifies observers on state change events.
 *
 * @author: [Kesi](mailto:keschat{@}r3technica.co.za)
 * @version 1.0.0
 * 
 * @example
 * // Get a state object.
 * let state = {data: "Hello World"}
 * // Get a EventModel instance.
 * let notifier = EventModel(state)
 * or inittialize without state:
 * let notifier = Observer()
 * and inittialize state afterwards:
 * notifier.initState(state);
 * // Step 2. Set Listeners 
 * notifier.setListener((value) => console.log(value))
 * // Step 3. Update the state
 * notifier.setState(newState)
 * 
 * @param {object | primitive} [state] - The state object or value to be observed for changes
 */
const EventModel = initialState => {

    const _eventModel = {

        /**
         *  @prop {Array} _listeners - List of callbacks
         */
        _listeners: [],
        /**
         *  @prop {object | primitive} _state - State object or primitive value to be observed for changes
         */
        _state: initialState,
        /**
            *  @prop {int} _state - Callback reference tokens
            */
        _token: -1,

        /**
         *  @function initialState
         *  @description Sets the initial state object or value to be observed for changes
         *  @param {object | primitive} [state] - Initial state object or primitive value
         */
        initState(initialState) {
            this._state = initialState;
        },

        /**
         *  @function getState
         *  @description Returns the state object
         *  @return {object | primitive} state object or primitive value
         */
        getState(param) {
            if (param) {

            }
            return this._state;
        },

        /**
         *  @function setState
         *  @description Publishes the event, passing the data to it's events
         *  @param {object | primitive} newState new state object or primitive value
         */
        setState(newState) {
            if ((typeof newState !== 'object') && (typeof this._state !== 'object')) {
                this._state = newState;
            } else {
                this._state = { ...this._state, ...newState };
                // this.state = Object.assign({}, this.state, newState);
            }
            this.notify();
        },

        /**
         *  @function clearState
         *  @description Clears the list of observer functions
         */
        clearState() {
            this._state = {};
        },

        // Main callback registration function
        _attach(callback, runOnce) {
            this._listeners = this._listeners ? this._listeners : [];

            let tokens = undefined;

            if (callback && !Array.isArray(callback)) {
                // using token because if individual fn is deleted, want a way to still get the fn
                this._listeners.forEach(listener => {
                    if (listener.callback === callback) {
                        tokens = listener.token;
                        console.log(`[${tokens}] - Callback already registered.`)
                    }
                });

                if (tokens) {
                    return tokens;
                } else {
                    const token = (++this._token + Date.now()).toString();
                    this._listeners.push({ token: token, callback: callback, isPaused: false, runOnce: runOnce, count: 0, notified: null, });
                    return token;
                }
            } else if (callback && Array.isArray(callback) && callback.length) {

                tokens = [];

                // using token because if individual fn is deleted, want a way to still get the fn
                this._listeners.forEach(listener => {

                    if (callback.includes(listener.callback)) {
                        tokens.push(listener.token);
                    }
                });
                if (tokens.length) {
                    console.log(`[${tokens}] - Callbacks already registered.`)
                    return tokens;
                } else {
                    const token = (++this._token + Date.now()).toString();

                    callback.forEach(item => {
                        this._listeners.push({ token: token, callback: item, isPaused: false, runOnce: runOnce, count: 0, notified: null });
                        tokens.push(token);
                    });
                    return tokens;
                }
            }
        },

        /**
         *  @function attachOnce
         *  @description Attach a callback or a collection of callbacks to a callback list.
         *  @param {function | array} Observer function to register
         */
        attachOnce(callback) {
            this._attach(callback, true)
        },

        /**
         *  @function attach
         *  @description Attach a callback or a collection of callbacks to a callback list.
         *  @param {function | array} Observer function to register
         */
        attach(callback) {
            this._attach(callback, false)
        },

        /**
         *  @function detach
         *  @description Removes a registered callback.
         *  @param {String|Callback|Array} callback
         */
        detach(callback) {

            if (!(this._listeners.length)) return;

            let _detached = undefined;

            if (callback && !Array.isArray(callback)) {

                this._listeners = this._listeners.filter(listener => listener.token !== callback);
                this._listeners = this._listeners.filter(listener => listener.callback !== callback);

            } else if (callback && Array.isArray(callback) && callback.length) {

                _detached = [];

                this._listeners.forEach(listener => {

                    if (callback.includes(listener.token)) {
                        this._listeners = this._listeners.filter(_l => _l !== listener);
                        _detached.push(listener);
                    } else if (callback.includes(listener.callback)) {
                        this._listeners = this._listeners.filter(_l => _l !== listener);
                        _detached.push(listener);
                    }
                });
            }
            return _detached;
        },

        /**
         *  @function count
         *  @description Returns number of registered callbacks
         *  @return {int} length
         */
        count() {
            return this._listeners.length;
        },

        /**
         *  @function register
         *  @description Checks if a callback is registered
         *  @param {function} callback
         */
        has(callback) {

            let _has = false;

            if (this._listeners.length) {

                this._listeners.forEach(listener => {

                    if (listener.token === callback) {
                        _has = true;
                    } else if (listener.callback === callback) {
                        _has = true;
                    }
                })
            }
            return _has;
        },

        /**
         *  @function register
         *  @description Checks if a callback is registered
         *  @param {function} callback
         */
        callbacks() {
            return this._listeners;
        },

        /**
         *  @function count
         *  @description Returns length of observer functions
         *  @return {int} length
         */
        pause(callback) {

            if (!(this._listeners.length)) return;

            if (callback && !Array.isArray(callback)) {

                this._listeners.forEach(listener => {

                    if (listener.token === callback) {
                        listener.isPaused = true;
                    } else if (listener.callback === callback) {
                        listener.isPaused = true;
                    }
                })

            } else if (callback && Array.isArray(callback) && callback.length) {

                this._listeners.forEach(listener => {

                    if (callback.includes(listener.token)) {
                        listener.isPaused = true;
                    } else if (callback.includes(listener.callback)) {
                        listener.isPaused = true;
                    }
                });
            } else if (!callback) {
                this._listeners.forEach(listener => {
                    listener.isPaused = true;
                })
            }
        },

        /**
         *  @function unpause
         *  @description Unpauses a paused callback.
         *  @param {String|Function} callback 
         */
        unpause(callback) {

            if (!(this._listeners.length)) return;

            if (callback && !Array.isArray(callback)) {

                this._listeners.forEach(listener => {

                    if (listener.token === callback) {
                        listener.isPaused = false;
                    } else if (listener.callback === callback) {
                        listener.isPaused = false;
                    }
                })

            } else if (callback && Array.isArray(callback) && callback.length) {

                this._listeners.forEach(listener => {

                    if (callback.includes(listener.token)) {
                        listener.isPaused = false;
                    } else if (callback.includes(listener.callback)) {
                        listener.isPaused = false;
                    }
                });
            } else if (!callback) {
                this._listeners.forEach(listener => {
                    listener.isPaused = false;
                })
            }
        },

        /**
         *  @function notify
         *  @description Notifies a single callback when state change occurs.
         *  @param {String|Function} callback 
         */
        notify(callback) {

            if (!(this._listeners.length)) return;

            if (callback && !Array.isArray(callback)) {

                this._listeners.forEach(listener => {

                    if (listener.token === callback) {
                        if (!listener.isPaused) {
                            listener.callback(this._state);
                            listener.count += 1;
                            listener.notified = Date.now();
                            //check later to merge this block of code. cant merge now due to index problem after delete
                            this._listeners = this._listeners.filter(listener => !listener.runOnce);
                        }
                    } else if (listener.callback === callback) {
                        if (!listener.isPaused) {
                            listener.callback(this._state);
                            listener.count += 1;
                            listener.notified = Date.now();
                            //check later to merge this block of code. cant merge now due to index problem after delete
                            this._listeners = this._listeners.filter(listener => !listener.runOnce);
                        }
                    }
                });
            } else if (callback && Array.isArray(callback) && callback.length) {

                if (this._listeners.length) {

                    this._listeners.forEach(listener => {

                        if (callback.includes(listener.token)) {
                            if (!listener.isPaused) {
                                listener.callback(this._state);
                                listener.count += 1;
                                listener.notified = Date.now();
                                //check later to merge this block of code. cant merge now due to index problem after delete
                                this._listeners = this._listeners.filter(listener => !listener.runOnce);
                            }
                        } else if (callback.includes(listener.callback)) {
                            if (!listener.isPaused) {
                                listener.callback(this._state);
                                listener.count += 1;
                                listener.notified = Date.now();
                                //check later to merge this block of code. cant merge now due to index problem after delete
                                this._listeners = this._listeners.filter(listener => !listener.runOnce);
                            }
                        }
                    });
                }
            } else if (!callback) {
                if (this._listeners.length) {
                    this._listeners.forEach(listener => {
                        if (!listener.isPaused) {
                            listener.callback(this._state);
                            listener.count += 1;
                            listener.notified = Date.now();
                            //check later to merge this block of code. cant merge now due to index problem after delete
                            this._listeners = this._listeners.filter(listener => !listener.runOnce);
                        };
                    })
                }
            }
        },
    }
    return _eventModel;
};

export default EventModel;