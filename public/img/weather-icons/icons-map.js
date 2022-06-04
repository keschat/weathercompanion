const WEATHER_ICONS = [
	{
		"code": 1000,
		"day": "Sunny",
		"night": "Clear",
		"icon": 113,
		"animated": { "day": "clear-day", "night": "clear-night" }
	},
	{
		"code": 1003,
		"day": "Partly cloudy",
		"night": "Partly cloudy",
		"icon": 116,
		"animated": { "day": "partly-cloudy-day", "night": "partly-cloudy-night" }
	},
	{
		"code": 1006,
		"day": "Cloudy",
		"night": "Cloudy",
		"icon": 119,
		"animated": { "day": "cloudy", "night": "cloudy" }
	},
	{
		"code": 1009,
		"day": "Overcast",
		"night": "Overcast",
		"icon": 122,
		"animated": { "day": "overcast", "night": "overcast" }
	},
	{
		"code": 1030,
		"day": "Mist",
		"night": "Mist",
		"icon": 143,
		"animated": { "day": "mist", "night": "mist" }
	},
	{
		"code": 1063,
		"day": "Patchy rain possible",
		"night": "Patchy rain possible",
		"icon": 176,
		"animated": { "day": "partly-cloudy-day-rain", "night": "partly-cloudy-night-rain" }
	},
	{
		"code": 1066,
		"day": "Patchy snow possible",
		"night": "Patchy snow possible",
		"icon": 179,
		"animated": { "day": "partly-cloudy-day-snow", "night": "partly-cloudy-night-snow" }
	},
	{
		"code": 1069,
		"day": "Patchy sleet possible",
		"night": "Patchy sleet possible",
		"icon": 182,
		"animated": { "day": "partly-cloudy-day-sleet", "night": "partly-cloudy-night-sleet" }
	},
	{
		"code": 1072,
		"day": "Patchy freezing drizzle possible",
		"night": "Patchy freezing drizzle possible",
		"icon": 185,
		"animated": { "day": "partly-cloudy-day-drizzle", "night": "partly-cloudy-night-drizzle" }
	},
	{
		"code": 1087,
		"day": "Thundery outbreaks possible",
		"night": "Thundery outbreaks possible",
		"icon": 200,
		"animated": { "day": "thunderstorms-day", "night": "thunderstorms-night" }
	},
	{
		"code": 1114,
		"day": "Blowing snow",
		"night": "Blowing snow",
		"icon": 227,
		"animated": { "day": "fog", "night": "fog" }
	},
	{
		"code": 1117,
		"day": "Blizzard",
		"night": "Blizzard",
		"icon": 230,
		"animated": { "day": "haze", "night": "haze" }
	},
	{
		"code": 1135,
		"day": "Fog",
		"night": "Fog",
		"icon": 248,
		"animated": { "day": "fog-day", "night": "fog-night" }
	},
	{
		"code": 1147,
		"day": "Freezing fog",
		"night": "Freezing fog",
		"icon": 260,
		"animated": { "day": "haze-day", "night": "haze-night" }
	},
	{
		"code": 1150,
		"day": "Patchy light drizzle",
		"night": "Patchy light drizzle",
		"icon": 263,
		"animated": { "day": "drizzle", "night": "drizzle" }
	},
	{
		"code": 1153,
		"day": "Light drizzle",
		"night": "Light drizzle",
		"icon": 266,
		"animated": { "day": "drizzle", "night": "drizzle" }
	},
	{
		"code": 1168,
		"day": "Freezing drizzle",
		"night": "Freezing drizzle",
		"icon": 281,
		"animated": { "day": "sleet", "night": "sleet" }
	},
	{
		"code": 1171,
		"day": "Heavy freezing drizzle",
		"night": "Heavy freezing drizzle",
		"icon": 284,
		"animated": { "day": "sleet", "night": "sleet" }
	},
	{
		"code": 1180,
		"day": "Patchy light rain",
		"night": "Patchy light rain",
		"icon": 293,
		"animated": { "day": "partly-cloudy-day-drizzle", "night": "partly-cloudy-night-drizzle" }
	},
	{
		"code": 1183,
		"day": "Light rain",
		"night": "Light rain",
		"icon": 296,
		"animated": { "day": "drizzle", "night": "drizzle" }
	},
	{
		"code": 1186,
		"day": "Moderate rain at times",
		"night": "Moderate rain at times",
		"icon": 299,
		"animated": { "day": "partly-cloudy-day-drizzle", "night": "partly-cloudy-night-drizzle" }
	},
	{
		"code": 1189,
		"day": "Moderate rain",
		"night": "Moderate rain",
		"icon": 302,
		"animated": { "day": "drizzle", "night": "drizzle" }
	},
	{
		"code": 1192,
		"day": "Heavy rain at times",
		"night": "Heavy rain at times",
		"icon": 305,
		"animated": { "day": "partly-cloudy-day-rain", "night": "partly-cloudy-night-rain" }
	},
	{
		"code": 1195,
		"day": "Heavy rain",
		"night": "Heavy rain",
		"icon": 308,
		"animated": { "day": "rain", "night": "rain" }
	},
	{
		"code": 1198,
		"day": "Light freezing rain",
		"night": "Light freezing rain",
		"icon": 311,
		"animated": { "day": "sleet", "night": "sleet" }
	},
	{
		"code": 1201,
		"day": "Moderate or heavy freezing rain",
		"night": "Moderate or heavy freezing rain",
		"icon": 314,
		"animated": { "day": "sleet", "night": "sleet" }
	},
	{
		"code": 1204,
		"day": "Light sleet",
		"night": "Light sleet",
		"icon": 317,
		"animated": { "day": "sleet", "night": "sleet" }
	},
	{
		"code": 1207,
		"day": "Moderate or heavy sleet",
		"night": "Moderate or heavy sleet",
		"icon": 320,
		"animated": { "day": "sleet", "night": "sleet" }
	},
	{
		"code": 1210,
		"day": "Patchy light snow",
		"night": "Patchy light snow",
		"icon": 323,
		"animated": { "day": "partly-cloudy-day-snow", "night": "partly-cloudy-night-snow" }
	},
	{
		"code": 1213,
		"day": "Light snow",
		"night": "Light snow",
		"icon": 326,
		"animated": { "day": "snow", "night": "snow" }
	},
	{
		"code": 1216,
		"day": "Patchy moderate snow",
		"night": "Patchy moderate snow",
		"icon": 329,
		"animated": { "day": "partly-cloudy-day-snow", "night": "partly-cloudy-night-snow" }
	},
	{
		"code": 1219,
		"day": "Moderate snow",
		"night": "Moderate snow",
		"icon": 332,
		"animated": { "day": "snow", "night": "snow" }
	},
	{
		"code": 1222,
		"day": "Patchy heavy snow",
		"night": "Patchy heavy snow",
		"icon": 335,
		"animated": { "day": "partly-cloudy-day-snow", "night": "partly-cloudy-night-snow" }
	},
	{
		"code": 1225,
		"day": "Heavy snow",
		"night": "Heavy snow",
		"icon": 338,
		"animated": { "day": "snow", "night": "snow" }
	},
	{
		"code": 1237,
		"day": "Ice pellets",
		"night": "Ice pellets",
		"icon": 350,
		"animated": { "day": "hail", "night": "hail" }
	},
	{
		"code": 1240,
		"day": "Light rain shower",
		"night": "Light rain shower",
		"icon": 353,
		"animated": { "day": "partly-cloudy-day-drizzle", "night": "partly-cloudy-night-drizzle" }
	},
	{
		"code": 1243,
		"day": "Moderate or heavy rain shower",
		"night": "Moderate or heavy rain shower",
		"icon": 356,
		"animated": { "day": "partly-cloudy-day-rain", "night": "partly-cloudy-night-rain" }
	},
	{
		"code": 1246,
		"day": "Torrential rain shower",
		"night": "Torrential rain shower",
		"icon": 359,
		"animated": { "day": "partly-cloudy-day-rain", "night": "partly-cloudy-night-rain" }
	},
	{
		"code": 1249,
		"day": "Light sleet showers",
		"night": "Light sleet showers",
		"icon": 362,
		"animated": { "day": "partly-cloudy-day-sleet", "night": "partly-cloudy-night-sleet" }
	},
	{
		"code": 1252,
		"day": "Moderate or heavy sleet showers",
		"night": "Moderate or heavy sleet showers",
		"icon": 365,
		"animated": { "day": "partly-cloudy-day-sleet", "night": "partly-cloudy-night-sleet" }
	},
	{
		"code": 1255,
		"day": "Light snow showers",
		"night": "Light snow showers",
		"icon": 368,
		"animated": { "day": "partly-cloudy-day-snow", "night": "partly-cloudy-night-snow" }
	},
	{
		"code": 1258,
		"day": "Moderate or heavy snow showers",
		"night": "Moderate or heavy snow showers",
		"icon": 371,
		"animated": { "day": "partly-cloudy-day-snow", "night": "partly-cloudy-night-snow" }
	},
	{
		"code": 1261,
		"day": "Light showers of ice pellets",
		"night": "Light showers of ice pellets",
		"icon": 374,
		"animated": { "day": "partly-cloudy-day-hail", "night": "partly-cloudy-night-hail" }
	},
	{
		"code": 1264,
		"day": "Moderate or heavy showers of ice pellets",
		"night": "Moderate or heavy showers of ice pellets",
		"icon": 377,
		"animated": { "day": "partly-cloudy-day-hail", "night": "partly-cloudy-night-hail" }
	},
	{
		"code": 1273,
		"day": "Patchy light rain with thunder",
		"night": "Patchy light rain with thunder",
		"icon": 386,
		"animated": { "day": "thunderstorms-day-rain", "night": "thunderstorms-night-rain" }
	},
	{
		"code": 1276,
		"day": "Moderate or heavy rain with thunder",
		"night": "Moderate or heavy rain with thunder",
		"icon": 389,
		"animated": { "day": "thunderstorms-rain", "night": "thunderstorms-rain" }
	},
	{
		"code": 1279,
		"day": "Patchy light snow with thunder",
		"night": "Patchy light snow with thunder",
		"icon": 392,
		"animated": { "day": "thunderstorms-day-snow", "night": "thunderstorms-night-snow" }
	},
	{
		"code": 1282,
		"day": "Moderate or heavy snow with thunder",
		"night": "Moderate or heavy snow with thunder",
		"icon": 395,
		"animated": { "day": "thunderstorms-snow", "night": "thunderstorms-snow" }
	}
]

export default WEATHER_ICONS;