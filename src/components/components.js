import { styled } from "styled-components";

const Input = styled.input``;
const Button = styled.button``;
const Label = styled.label``;
const ResultList = styled.ul``;
const Result = styled.li``;
const HintText = styled.p``;(({ value }) => {
    const classes = [
        "hint",
        {
            "error": true,
        },
    ];

    return (
        <p className={classes.join("    ")}>
            {value ? value : "Please enter a valid digit greater than 0."}
        </p>
    );
});



export { Input, Button, Label, ResultList, Result, HintText };