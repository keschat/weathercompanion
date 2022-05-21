import StateEvent from '../../helpers/eventmodel/index';
import WEATHER_ICONS from '../images/weather-icons/icons-map';
import utils from '../scripts/utils';
import location from './location';
import weather from './weather';
/*
Sample data returned from API call.
{
    "location": {
        "name": "Matroosfontein",
        "region": "Western Cape",
        "country": "South Africa",
        "lat": -33.93,
        "lon": 18.58,
        "tz_id": "Africa/Johannesburg",
        "localtime_epoch": 1652391330,
        "localtime": "2022-05-12 23:35"
    },
    "current": {
        "last_updated_epoch": 1652390100,
        "last_updated": "2022-05-12 23:15",
        "temp_c": 15,
        "temp_f": 59,
        "is_day": 0,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
            "code": 1003
        },
        "wind_mph": 15,
        "wind_kph": 24.1,
        "wind_degree": 340,
        "wind_dir": "NNW",
        "pressure_mb": 1020,
        "pressure_in": 30.12,
        "precip_mm": 0,
        "precip_in": 0,
        "humidity": 82,
        "cloud": 75,
        "feelslike_c": 14.4,
        "feelslike_f": 58,
        "vis_km": 10,
        "vis_miles": 6,
        "uv": 1,
        "gust_mph": 11.4,
        "gust_kph": 18.4
    }
}
*/

//-------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    const FILL_ICONS = 'weather-icons/fill/';
    const LINE_ICONS = 'weather-icons/line/';
    const ICON_PATH = LINE_ICONS;

    const notifier = StateEvent();
    notifier.attach(updateUI);

    const onlineStatusNotifier = StateEvent({ isOnline: false });
    onlineStatusNotifier.attach(updateOnlineStatus)

    const animatedIconEl = document.querySelector('[data-animated-icon]');
    const cityEl = document.querySelector('[data-city]');
    const descEl = document.querySelector('[data-desc]');
    const extraEl = document.querySelector('[data-extra]');
    const humidityEl = document.querySelector('[data-humidity]');
    const iconEl = document.querySelector('[data-icon]');
    const messageEl = document.querySelector('[data-message]');
    const finderEl = document.querySelector('[data-online-status]');
    const searchInputEl = document.querySelector('[data-search-input]');
    const searchFormEl = document.querySelector('[data-search-form]');
    const searchBtnEl = document.querySelector('[data-search-btn');
    const autocompleteResultEl = document.querySelector('[data-search-autocomplete]');
    // autocompleteResultEl.style.display = 'none';
    autocompleteResultEl.style.cursor = 'pointer';
    const tempEl = document.querySelector('[data-temp]');
    const tempUnitEl = document.querySelector('[data-temp-unit]');
    const tempValueEl = document.querySelector('[data-temp-value]');
    // const timezoneEl = document.querySelector('[data-timezone]');
    const uvEl = document.querySelector('[data-uv]');
    const windEl = document.querySelector('[data-wind]');

    function setAnimatedIcon(el, icon, isday) {
        WEATHER_ICONS.forEach(item => {
            if (item.code === icon) {
                const dayIcon = item.animated.day;
                const nightIcon = item.animated.night;
                const currentIcon = isday ? dayIcon : nightIcon;
                el ? el.innerHTML = `<div><img src="img/${ICON_PATH}${currentIcon}.svg" 
                width=256 height=256 alt="icon-${currentIcon}"></div>` : '';
            }
        });
    }

    //Allow to toggle between C and F units
    let unitIsC = true;
    //Icons
    const humidityIcon = `<img src="img/${ICON_PATH}humidity.svg" width=40 height=40 alt="icon-humidity">`;
    const windIcon = `<img src="img/${ICON_PATH}wind.svg" width=40 height=40 alt="icon-wind">`;

    function updateUI(state) {
        tempValueEl ? tempValueEl.innerHTML = `${state.temp_c}` : '';
        tempValueEl ? tempUnitEl.innerHTML = `<sup>&deg;</sup>C` : '';
        humidityEl ? humidityEl.innerHTML = `${humidityIcon} <code class="text-dark"> ${state.humidity}% </code>` : '';
        const uvIcon = `<img src="img/${ICON_PATH}uv-index-${state.uv}.svg" width=40 height=40 alt="icon-humidity">`;
        uvEl ? uvEl.innerHTML = `${uvIcon}` : '';
        windEl ? windEl.innerHTML = `${windIcon} <code class="text-dark"> ${state.wind_kph}kph/${state.wind_mph}mph</code>` : '';
        cityEl ? cityEl.innerHTML = `${state.name}, ${state.country}` : '';
        // timezoneEl.innerHTML = `${state.tz_id}`;
        descEl ? descEl.innerHTML = `${state.condition.text}` : '';
        iconEl ? iconEl.innerHTML = `<img src="${state.condition.icon}" alt="icon">` : '';
        setAnimatedIcon(animatedIconEl, state.condition.code, state.is_day);
        setEvents(state);
    }

    let isMouseOverSearchResults = false;

    function showAutoComplete(data) {
        if (!data.length) return;
        let items = '';
        data.forEach(item => {
            // let searchfield = document.createElement('li');
            // searchfield.innerHTML = `📍 <b>${item.name}</b>, ${item.region}, ${item.country}`;
            // autocompleteResultEl.appendChild(searchfield);
            items += `<li>
                        <button type="submit" class="searchform__autocomplete-btn" data-lat=${item.lat} data-lon=${item.lon} data-city="${item.name}, ${item.region}, ${item.country}">
                        <span>📍 <b>${item.name}</b>, ${item.region}, ${item.country}</span> 
                        <i class="fa-solid fa-magnifying-glass-location"></i>
                        </button>
                    </li>`;
        });
        autocompleteResultEl.innerHTML = `${items}`;
    }

    function debounce(func, timeout = 300) {
        let timer;
        return function (...args) {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    // Use this just in case the location info is not available and the user 
    // requests new location, then this has to be checked if still needed.
    let initialRun = false;

    async function autoCompleteSearch(data) {
        if (data === '') return;
        const response = await fetch(`/api/autocomplete/${data}`);
        const _d = await response.json();
        showAutoComplete(_d);
    }

    async function initialLocation() {
        // console.log('[ 🚀🚀🚀 Iniatial weather report...  🚀🚀🚀 ]');
        location.getCoords().then(res => {
            if (res) {
                finderEl.classList.remove('blinking');
                const lat = res.coords.latitude;
                const lon = res.coords.longitude;
                if (!initialRun) {
                    setWeatherReport(lat, lon);
                };
            }
        }).catch(e => {
            console.log('[ 🚀🚀🚀 Could not get coordinates...  🚀🚀🚀 ]');
        });
    }
    async function setWeatherReport(searchTerm1 = '', searchTerm2 = '') {
        // console.log('[ 🚀🚀🚀 Setting new weather report...  🚀🚀🚀 ]');
        weather.getData({ searchTerm1, searchTerm2 }, 6)
            .then(res => {
                if (res) {
                    const { temp_c, temp_f, is_day, humidity, condition, last_updated, wind_mph, wind_kph, uv } = res.current;
                    const { name, country, tz_id, lat, lon, localtime } = res.location;
                    const newState = { temp_c, temp_f, humidity, condition, name, country, tz_id, is_day, uv, lat, lon, localtime, last_updated, wind_mph, wind_kph };
                    notifier.setState(newState);
                    searchFormEl.classList.remove('loading');
                    initialRun = true;
                }
            })
            .catch(e => {
                if (initialRun) searchInputEl.placeholder = 'Unable to get weather report at this time...';
                console.log(`[ 🚀🚀🚀 ${e} 🚀🚀🚀 ]`);
                searchFormEl.classList.remove('loading');
                setEvents({});
            });
    }

    function setEvents(state) {

        tempEl.addEventListener('click', () => {
            if (!Object.keys(state).length) return;
            tempValueEl ? tempValueEl.innerHTML = (unitIsC ? `${state.temp_f}` : `${state.temp_c}`) : '';
            tempValueEl ? tempUnitEl.innerHTML = (unitIsC ? `<sup>&deg;</sup>F` : `<sup>&deg;</sup>C`) : '';
            unitIsC = !unitIsC;
        });

        searchInputEl.addEventListener('input', (e) => {
            autocompleteResultEl.style.display = (e.target.value === '') ? 'none' : 'block';
            autoCompleteSearch(e.target.value);
        });

        searchInputEl.addEventListener('focusin', (e) => {
            searchInputEl.select();
            autocompleteResultEl.style.display = 'block';
            autoCompleteSearch(e.target.value);
        });

        searchInputEl.addEventListener('focusout', (e) => {
            if (!isMouseOverSearchResults) {
                autocompleteResultEl.style.display = 'none';
            }
        });

        searchFormEl.addEventListener('submit', e => {
            e.preventDefault();
            if (searchInputEl.value === '') return;

            searchFormEl.classList.add('loading');
            isMouseOverSearchResults = false;
            autocompleteResultEl.style.display = 'none';

            const formSubmitter = e.submitter;
            if (formSubmitter.closest('.searchform__autocomplete-btn')) {
                const city = formSubmitter.dataset.city;
                const lat = formSubmitter.dataset.lat;
                const lon = formSubmitter.dataset.lon;
                searchInputEl.value = city;
                setWeatherReport(lat, lon);
            } else {
                setWeatherReport(searchInputEl.value);
            }
        }, false);

        autocompleteResultEl.addEventListener('mouseover', (e) => {
            isMouseOverSearchResults = true;
        });

        autocompleteResultEl.addEventListener('mouseout', (e) => {
            isMouseOverSearchResults = false;
        });
    }

    function updateOnlineStatus(state) {
        state.isOnline ? finderEl.classList.remove('blinking') : finderEl.classList.add('blinking');
    }

    async function watchOnlineStatus() {
        setInterval(utils.isOnline()
            .then( res => { if (res) { onlineStatusNotifier.setState({ isOnline: true }) } })
            .catch((e) => { onlineStatusNotifier.setState({ online: false })
            }), 3 * 60 * 1000);
    }

    async function main() {
        finderEl.classList.add('blinking');

        utils.isOnline()
            .then( res => { if (res) { onlineStatusNotifier.setState({ isOnline: true }); initialLocation() } })
            .catch((e) => { onlineStatusNotifier.setState({ online: false }); });
        watchOnlineStatus();
    }

    main().then(() => { }, e => console.error(e));
    /******************************************************************/
});