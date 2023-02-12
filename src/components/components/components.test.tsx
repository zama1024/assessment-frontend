import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Components from "./components";
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

describe("when there are no variables in pageData", () => {
    const pageData = {
        lists: [
            {
                id: 0,
                components: [1, 2],
            },
        ],
        components: [
            {
                id: 1,
                type: "image",
                options: {
                    src: "testSrc",
                    alt: "test alt",
                },
            },
            {
                id: 2,
                type: "weather",
                options: {
                    lon: "11.11",
                    lat: "22.22",
                },
            },
        ],
    };

    it("renders all components from first list", async () => {
        // @ts-ignore
        apiService.fetchWeather.mockResolvedValue({ data: weatherData });

        render(<Components pageData={pageData} />);

        await waitFor(() => {
            const image = screen.getByAltText("test alt");

            expect(image).toHaveAttribute("src", "testSrc");
            expect(screen.getByText(weatherData.location)).toBeInTheDocument();
        });
    });
});

describe("when there are variables in pageData", () => {
    const pageData = {
        variables: [
            {
                name: "show_weather",
                type: "string",
                initialValue: "show",
            },
        ],
        lists: [
            {
                id: 0,
                components: [1, 2, 3],
            },
            {
                id: 1,
                components: [4],
            },
        ],
        components: [
            {
                id: 1,
                type: "button",
                options: {
                    text: "Show",
                    variable: "show_weather",
                    value: "show",
                },
            },
            {
                id: 2,
                type: "button",
                options: {
                    text: "Hide",
                    variable: "show_weather",
                    value: "hide",
                },
            },
            {
                id: 3,
                type: "condition",
                options: {
                    variable: "show_weather",
                    value: "show",
                },
                children: 1,
            },
            {
                id: 4,
                type: "weather",
                options: {
                    lon: 11.11,
                    lat: 22.22,
                },
            },
        ],
    };

    it("uses condition components logic to render other components", async () => {
        // @ts-ignore
        apiService.fetchWeather.mockResolvedValue({ data: weatherData });

        render(<Components pageData={pageData} />);

        await waitFor(() => {
            const showButton = screen.getByText("Show");
            const hideButton = screen.getByText("Hide");

            expect(showButton).toBeInTheDocument();
            expect(hideButton).toBeInTheDocument();
            expect(screen.queryByText(weatherData.location)).not.toBeNull();

            fireEvent.click(hideButton);

            expect(screen.queryByText(weatherData.location)).toBeNull();
        });
    });
});
