/**
 * File: utils.js
 * @description Contains utility functions
 *
 * @author: [Kesi](mailto:keschat{@}r3technica.co.za)
 */

/**
 *  @function addText
 *  @description Returns the state object
 *  * @example
 *  // Step 1a. Get an observer instance
 *  let observableState = Observer(state)
 *  // 1b. or using an empty state obeject, adding state after getting instance
 *  @param {object | primitive} [state] - Initial state object or primitive value
 *  @return {object | primitive} state object or primitive value
 */
export function addText(text, parent) {
    //---
    if (!text || typeof text !== 'string') {
        console.log(`${text}: is not a valid parameter`);
        console.log(`syntax: addText(text, parent)`);
        return;
    }
    if (!parent) {
        console.log(`${parent}: is not a valid parameter`);
        console.log(`syntax: addText(text, parent)`);
        return;
    }
    const _tag = parent instanceof HTMLElement ? parent : document.createElement('parent');
    _tag.innerText = text;
    return _tag;
}

/**
 *  @function hyphen2camel
 *  @description Returns the state object
 *  * @example
 *  // Step 1a. Get an observer instance
 *  let observableState = Observer(state)
 *  // 1b. or using an empty state obeject, adding state after getting instance
 *  @param {object | primitive} [state] - Initial state object or primitive value
 *  @return {object | primitive} state object or primitive value
 */
export function hyphen2camel(string) {
    return string.replace(/-([a-z])/g, function (match) {
        return match[1].toUpperCase();
    });
}


export function delay() {
    const timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
};

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// export async function isOnline() {
//     try {
//         const online = await fetch("/16x16.png");
//         return online.status >= 200 && online.status < 300; // either true or false
//     } catch (err) {
//         return false; // definitely offline
//     }
// };

// function doSomething() {
//     return new Promise((resolve, reject) => {
//         if (somethingSuccesfulHappened) {
//             const successObject = {
//                 msg: 'Success',
//                 data,//...some data we got back
//             }
//             resolve(successObject);
//         } else {
//             const errorObject = {
//                 msg: 'An error occured',
//                 error, //...some error we got back
//             }
//             reject(errorObject);
//         }
//     });
// }


let count = 0;

const debounce = (callback, timer = 0) => {
    let currentCallbackTimer = -1;
    return () => {
        count += 1;
        clearTimeout(currentCallbackTimer);
        currentCallbackTimer = setTimeout(callback, timer)
    }
};

export const isOnline = async () => {
    try {
        const online = await fetch("/16x16.png");
        return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
        return false; // definitely offline
    }
};

const api = {

    redirect(location) {
        window.location.href = location;
    },

    query(selector, scope) {
        if (!selector) throw new Error('Please provide a selector.');
        return scope ? scope.querySelector(selector) : document.querySelector(selector);
    },

    queryAll(selector, scope) {
        if (!selector) throw new Error('Please provide a selector.');
        return scope ? scope.querySelectorAll(selector) : document.querySelectorAll(selector);
    },

    //element, event, callback, eventcapture
    addEvent(el, ev, cb, ec) {

        if (!el) throw new Error('Please provide an element to attach the event to.');
        if (!ev) throw new Error('Please provide an event to listen for.');
        if (!cb || typeof cb !== 'function') throw new Error('Please provide a valid callback function to run');

        // if (el === '[object HTMLCollection]' || el === '[object NodeList]') {
        if (NodeList.prototype.isPrototypeOf(el) || HTMLCollection.prototype.isPrototypeOf(el)) {
            for (const item of el) {
                item.addEventListener(ev, cb, ec || false)
            }
        } else {
            el.addEventListener(ev, cb, ec || false);
        }
    },

};

// Expose the public methods
export default api;


// https://stackoverflow.com/questions/36532307/rem-px-in-javascript

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}



// https://tzi.fr/js/convert-em-in-px/

// Convert rem in pixels
function getElementFontSize(context) {

    return parseFloat(
        //---
        getComputedStyle(
            context || document.documentElement
        ).fontSize
    );
}

function convertRem(value) {
    return convertEm(value);
}

function convertEm(value, context) {
    return value * getElementFontSize(context);
}

// Examples
convertRem(2); // 32 (px)

// end https://tzi.fr/js/convert-em-in-px/


// https://code-examples.net/en/q/9d41c9



// end https://code-examples.net/en/q/9d41c9
