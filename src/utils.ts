import Image from "./components/image/image";
import Weather from "./components/weather/weather";
import Button from "./components/button/button";
import cloudy from "./icons/cloudy.svg";
import clearday from "./icons/clear-day.svg";
import rain from "./icons/rain.svg";

interface ComponentMap {
    [key: string]: ({ options }: any) => JSX.Element;
}

interface WeatherImageSrcMap {
    [key: string]: string;
}

export const HOST_URL = "http://localhost:3030";

export const componentMapping: ComponentMap = {
    image: Image,
    weather: Weather,
    button: Button,
};

export const weatherImageSrcMapping: WeatherImageSrcMap = {
    cloudy: cloudy,
    "clear-day": clearday,
    rain: rain,
};
