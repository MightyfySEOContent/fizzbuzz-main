import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

        it("error message when a digit lower than 1 was submitted", async () => {
            render(<Home />);
            submitFormWith(0);
            const errorMessage = await screen.findByText("Please enter a valid digit greater than 0.", { selector: ".error" });
            expect(errorMessage).toBeInTheDocument();
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
                const fizzElement = screen.getAllByText("Fizz", { selector: ".result li" });
                expect(fizzElement[0]).toBeInTheDocument()
            });

            it("renders Buzz for multiples of 5", async () => {
                render(<Home />);
                submitFormWith(10);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();
                const buzzElement = screen.getAllByText("Buzz", { selector: ".result li" });
                expect(buzzElement[0]).toBeInTheDocument();
            });

            it("renders FizzBuzz for multiples of both 3 and 5", async () => {
                render(<Home />);
                submitFormWith(30);
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();

                const fizzBuzzElements = screen.getAllByText("FizzBuzz", { selector: ".result li" });
                expect(fizzBuzzElements[0]).toBeInTheDocument();
            });

            it("error message when a digit lower than 1 was submitted", async () => {
                render(<Home />);
                submitFormWith(0);
                expect(screen.queryByText("Please enter a valid digit greater than 0.", { selector: ".error" })).toBeInTheDocument();
            });
        });

        it("clears result list when input gains focus", async () => {
            render(<Home />);
            await screen.findByText("1");

            const submitButton = screen.getByRole("button", { name: "Submit" });
            fireEvent.click(submitButton);
            const heading = screen.getByRole("heading", { name: "FizzBuzz - Bewerber Quiz" });
            fireEvent.focus(heading);
            await waitFor(() => {
                expect(screen.queryByText("1")).not.toBeInTheDocument();
            });
    });
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
