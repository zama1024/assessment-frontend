import { HOST_URL } from './utils'

export const fetchPageData = async (pageId: string) => {
    const response = await fetch(`${HOST_URL}/page/${pageId}`);
    const body = await response.json();

    return body;
}

export const fetchWeather = async (lat: string, lon: string) => {
    const response = await fetch(`${HOST_URL}/integration/weather?lat=${lat}&lon=${lon}`);
    const body = await response.json();
    
    return body;
}