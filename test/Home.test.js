import { fireEvent, render, screen } from "@testing-library/react";
import Home, { EMPTY_RESULT_HINT } from "@pages/";

describe("<Home/>...", () => {
    //----------------- ---------------------
    //-  feel free to add more test cases  -
    //--------------------------------------

    describe("renders properly the...", () => {
        it("headline", () => {
            render(<Home />);
            screen.getByRole("heading", { name: "FizzBuzz - Bewerber Quiz", level: 1 });
        });

        it("input for target digit", () => {
            render(<Home />);
            screen.getByLabelText("Target Digit");
        });

        it("submit button", () => {
            render(<Home />);
            screen.getByRole("button", { name: "Submit" });
        });

        it("hint text that a digit greater 0 has to be submitted", () => {
            render(<Home />);
            screen.getByText("Please submit a digit greater than 0.", { selector: ".hint" });
        });

        describe("result when...", () => {
            it("only digits has to be rendered", async () => {
                render(<Home />);
                submitFormWith(2);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText(/^1$/, { selector: ".result li" });
                screen.getByText(/^2$/, { selector: ".result li" });
            });

            it("Fizz has to be rendered", async () => {
                render(<Home />);
                submitFormWith(3);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText("Fizz", { selector: ".result li" });
            });

            it("Buzz has to be rendered", async () => {
                render(<Home />);
                submitFormWith(5);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText("Buzz", { selector: ".result li" });
            });

            it("FizzBuzz has to be rendered", async () => {
                render(<Home />);
                submitFormWith(15);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText("FizzBuzz", { selector: ".result li" });
            });

            it("renders Fizz for multiples of 3", async () => {
                render(<Home />);
                submitFormWith(6);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText("Fizz", { selector: ".result li" });
            });

            it("renders Buzz for multiples of 5", async () => {
                render(<Home />);
                submitFormWith(10);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText("Buzz", { selector: ".result li" });
            });

            it("renders FizzBuzz for multiples of both 3 and 5", async () => {
                render(<Home />);
                submitFormWith(30);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                screen.getByText("FizzBuzz", { selector: ".result li" });
            });
        });

        it("error message when a digit lower than 1 was submitted", async () => {
            render(<Home />);
            submitFormWith(0);
            expect(screen.queryByText("Please enter a valid digit greater than 0.", { selector: ".error" })).toBeInTheDocument();
        });
    });

    it("clears result list when input gains focus", async () => {
        render(<Home />);
        expect(screen.queryByText("1")).not.toBe(null);
        fireEvent.focus(screen.getByLabelText("Target Digit"));
        expect(screen.queryByText("1")).toBeNull();
    });

    function submitFormWith(digit) {
        const input = screen.getByLabelText("Target Digit");
        const submitButton = screen.getByRole("button", { name: "Submit" });
        fireEvent.change(input, { target: { value: digit } });
        fireEvent.click(submitButton);
    }

    function gainFocusOnInput() {
        const input = screen.getByLabelText("Target Digit");
        fireEvent.focus(input);
    }
});
