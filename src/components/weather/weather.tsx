import { useEffect, useState } from "react";
import styles from "./weather.module.css";
import { fetchWeather } from "../../apiService";
import { WeatherData, SingleUpcomingWeather } from "../../types";
import { weatherImageSrcMapping } from "../../utils";

type WeatherProps = {
    options: {
        lat: string;
        lon: string;
    };
};

const Weather = ({ options: { lat, lon } }: WeatherProps) => {
    const [data, setData] = useState<WeatherData>({
        condition: "",
        conditionName: "",
        temperature: null,
        unit: "",
        location: "",
        upcomming: [],
    });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchAndSetData = async (lat: string, lon: string) => {
            let resp = await fetchWeather(lat, lon);

            if (resp.error) {
                setError(resp.error);
            } else {
                setData(resp.data);
            }
        };

        fetchAndSetData(lat, lon);
    }, [lat, lon]);

    const forecast = data.upcomming.map(({ day, condition }: SingleUpcomingWeather) => {
        return (
            <div key={day} className={styles.forecastSingleDay}>
                <img
                    className={styles.iconSmall}
                    src={weatherImageSrcMapping[condition]}
                    alt="Missing source"
                />
                <span>{day}</span>
            </div>
        );
    });

    if (error) {
        return (
            <div className={styles.weather}>
                <h4>{error}</h4>
            </div>
        );
    }

    return (
        <div className={styles.weather}>
            <div className={styles.current}>
                <img
                    className={styles.icon}
                    src={weatherImageSrcMapping[data.condition]}
                    alt="Missing source"
                />
                <div className={styles.details}>
                    <span id={styles.temperature}>
                        {data.temperature}°{data.unit.toUpperCase()}
                    </span>
                    <span id={styles.conditionName}>{data.conditionName}</span>
                </div>
            </div>
            <div className={styles.forecast}>
                <span id={styles.location}>{data.location}</span>
                <div className={styles.forecastDetails}>{forecast}</div>
            </div>
        </div>
    );
};

export default Weather;
