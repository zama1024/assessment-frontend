import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Weather from "./weather";
import * as apiService from "../../apiService";

jest.mock("../../apiService");

const weatherData = {
    lon: "11.11",
    lat: "22.22",
    condition: "testCondition",
    conditionName: "TestCondition",
    temperature: 78,
    unit: "testUnit",
    location: "testLocation",
    upcomming: [
        {
            day: "day1",
            condition: "upcomingTestCondition1",
            conditionName: "UpcomingTestConditionName1",
        },
    ],
};

it("shows the location, current weather and forecast", async () => {
    // @ts-ignore
    apiService.fetchWeather.mockResolvedValue({ data: weatherData });

    const options = { lat: "11.11", lon: "22.22" };

    render(<Weather options={options} />);

    await waitFor(() => {
        expect(screen.getByText(`${weatherData.temperature}°${weatherData.unit.toUpperCase()}`)).toBeInTheDocument();
        expect(screen.getByText(weatherData.location)).toBeInTheDocument();
        expect(screen.getByText(weatherData.conditionName)).toBeInTheDocument();
        expect(screen.getByText(weatherData.upcomming[0].day)).toBeInTheDocument();
    });
});

describe("when there is an error in the api response", () => {
    it("shows the error message", async () => {
        // @ts-ignore
        apiService.fetchWeather.mockResolvedValue({ error: "test error" });

        const options = { lat: "11.11", lon: "invalid lon" };

        render(<Weather options={options} />);

        await waitFor(() => {
            expect(screen.getByText("test error")).toBeInTheDocument();
        });
    });
});
