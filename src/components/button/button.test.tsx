import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button";

it("renders button with the correct text", () => {
    const options = {
        text: "testText",
        variable: "testVar",
        value: "testVal",
    };

    render(<Button options={options} updateState={() => {}} />);

    expect(screen.getByText(options.text)).toBeInTheDocument();
});

describe("icon", () => {
    describe("when value is hide", () => {
        const options = {
            text: "testText",
            variable: "testVar",
            value: "hide",
        };

        it("shows the hide icon", () => {
            render(<Button options={options} updateState={() => {}} />);

            const image = screen.getByAltText("Missing source");
            expect(image).toHaveAttribute("src", "hide.svg");
        });
    });

    describe("when value is not hide or show", () => {
        const options = {
            text: "testText",
            variable: "testVar",
            value: "testVal",
        };

        it("shows the location icon", () => {
            render(<Button options={options} updateState={() => {}} />);

            const image = screen.getByAltText("Missing source");
            expect(image).toHaveAttribute("src", "location.svg");
        });
    });
});
