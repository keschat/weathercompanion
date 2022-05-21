if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import apicache from 'apicache';
import axios from 'axios';
import express from 'express';

import cities from '../helpers/cities.json';

const apiRouter = express.Router();
const cache = apicache.middleware;
apiRouter.use('/', express.static('public'));

import RequestModel from '../models/request';

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY_NAME = process.env.WEATHER_API_KEY_NAME;
const WEATHER_API_KEY_VALUE = process.env.WEATHER_API_KEY_VALUE;
// const AUTOCOMPLETE_API_URL = process.env.AUTOCOMPLETE_API_URL;
// const AUTOCOMPLETE_API_KEY_NAME = process.env.AUTOCOMPLETE_API_KEY_NAME;
// const AUTOCOMPLETE_API_KEY_VALUE = process.env.AUTOCOMPLETE_API_KEY_VALUE;
// const OPENWEATHERMAP_API_URL = process.env.OPENWEATHERMAP_API_URL;
// const OPENWEATHERMAP_API_KEY_NAME = process.env.OPENWEATHERMAP_API_KEY_NAME;
// const OPENWEATHERMAP_API_KEY_VALUE = process.env.OPENWEATHERMAP_API_KEY_VALUE;
// const TOMTOM_KEY = process.env.TOMTOM_KEY;

/* GET home page. */
apiRouter.get(['/weather/:param1', '/weather/:param1/:param2'], cache('5 minutes'), async (req, res) => {
    //---------------------------------------------------
    console.log('[ 🚀🚀🚀 Getting weather report... please wait 🚀🚀🚀 ]');
    //---------------------------------------------------
    const param1 = req.params.param1;
    const param2 = req.params.param2;

    console.log(`.................. ${param1}`)
    // http://api.WEATHER.com/v1/current.json?key=<YOUR_API_KEY>&q=London
    // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    let WEATHE_API_URI;

    if (param1 && param2) {
        WEATHE_API_URI = `${WEATHER_API_URL}?${WEATHER_API_KEY_NAME}=${WEATHER_API_KEY_VALUE}&q=${param1},${param2}`;
    } else if (param1) {
        WEATHE_API_URI = `${WEATHER_API_URL}?${WEATHER_API_KEY_NAME}=${WEATHER_API_KEY_VALUE}&q=${param1}`;
    }

    if (process.env.NODE_ENV !== 'production') {
        console.log(`[ 🚀🚀🚀 REQUEST API: ${WEATHE_API_URI} 🚀🚀🚀 ]`);
    }

    try {
        const response = await axios.get(WEATHE_API_URI);
        const data = await response.data;
        res.json(data)
    } catch (err) {
        console.log(`[ 🚀🚀🚀 ${err} 🚀🚀🚀 ]`);
    }
    // const { data } = await axios.get(API_REQUEST_URI);
    // res.status(200).json(data);
    // res.sendFile(path.join(__dirname, '../../public/api.html'));
    // res.sendFile('index2.html', {root : __dirname + '/views'});
    // res.sendFile(path.join(__dirname+'/sitemap.html'));
    //---------------------------------------------------
});

// {
//     id: 7305,
//     coordinates_wkt: 'POINT (3.3895852125984334 6.445207512093191)',
//     name: 'Lagos',
//     name_alt: '',
//     name_ascii: 'Lagos',
//     is_capital: 0,
//     is_world_city: 1,
//     is_mega_city: 1,
//     country: 'Nigeria',
//     country_iso_alpha3: 'NGA',
//     region: 'Lagos',
//     time_zone: 'Europe/Athens'
//   }++

function parseCity(city) {
    //---------------------------------------------------
    const id = city.id;
    const name = city.name;
    const name_alt = city.name_alt;
    const name_ascii = city.name_ascii;
    const is_capital = city.is_capital;
    const is_world_city = city.is_world_city;
    const is_mega_city = city.is_mega_city;
    const country = city.country;
    const country_iso_alpha3 = city.country_iso_alpha3;
    const region = city.region;
    const time_zone = city.time_zone;
    //---------------------------------------------------
    // Accordingly, the order of latitude and longitude in those tuples is always long lat, as in POINT(long lat).
    const point = city.coordinates_wkt;
    const regex = /(-?\d+\.\d+)\s(-?\d+\.\d+)/;
    const result = regex.exec(point);
    const lon = result[1];
    const lat = result[2];
    //---------------------------------------------------
    return {
        id,
        name,
        name_alt,
        name_ascii,
        is_capital,
        is_world_city,
        is_mega_city,
        country,
        country_iso_alpha3,
        region,
        time_zone,
        lon,
        lat
    }
    //---------------------------------------------------
}

function paginate(array, page_size, page_number) {
    //---------------------------------------------------
    return array.slice((page_number - 1) * page_size, page_number * page_size);
    //---------------------------------------------------
}

apiRouter.get('/autocomplete/:val', (req, res) => {
    //---------------------------------------------------
    console.log('[ 🚀🚀🚀 Searching for suggestions... please wait 🚀🚀🚀 ]');
    //---------------------------------------------------
    if (req.params.val !== '') {

        let searchTerm = req.params.val;
        let results = [];

        const addCity = val => {
            // has city function to avoid duplicates
            const hasCity = results.some(city => city.id === val.id);
            if (!hasCity) results.push(parseCity(val));
        };

        cities.forEach(city => {

            if (city.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                addCity(city);
            }
            if (city.name_alt.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                addCity(city);
            }
            if (city.name_ascii.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                addCity(city);
            }
            if (city.country.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                addCity(city);
            }
            if (city.region.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                addCity(city);
            }
            if (city.time_zone.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                addCity(city);
            }

        });
        const page = paginate(results, 10, 1);
        res.status(200).send(page);
    }
    //---------------------------------------------------
});

export default apiRouter;