import styles from "@styles/Home.module.css";
import { Button, Label, Input, ResultList, Result, singleResult, HintText } from "../components/components";
import Head from "next/head";
import { useState } from "react";

export const EMPTY_RESULT_HINT = "Geben Sie einen Werte > 1 ein in das Formular ein.";

function Home() {
    const [results, setResults] = useState([]);
    const [inputFocus, setInputFocus] = useState(false);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const targetDigit = parseInt(event.target.elements.targetDigit.value);
        if (targetDigit > 1) {
            const newResults = [];
            for (let i = 1; i <= targetDigit; i++) {
                let result = "";
                if (i % 3 === 0) result += "Fizz";
                if (i % 5 === 0) result += "Buzz";
                if (i % 3 === 0 && i % 5 === 0) result = "Fizz Buzz";
                newResults.push(result || i);
            }
            setResults(newResults);
        }
    };
    const handleInputFocus = () => {
        setInputFocus(true);
        setResults([]);
    };
    return (
        <>
            <Head>
                <title>Bewerber-Quiz - FizzBuzz - Autohaus König</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>FizzBuzz - Bewerber Quiz</h1>
                <form onSubmit={handleFormSubmit} >
                    <Label htmlFor="targetDigit">Target Digit</Label>
                    <Input type="number" id="targetDigit" name="targetDigit"
                        onFocus={handleInputFocus} />
                    <Button type="submit" role="button">Submit</Button>
                    <HintText className="hint">Please submit a digit greater than 0.</HintText>
                </form>
                <h2>Ergebnisse</h2>
                <ResultList className="result">
                    {results.map((result, index) => (
                        <Result key={index}>
                            <singleResult>
                                {result}
                            </singleResult>
                        </Result>
                    ))}
                </ResultList>

            </main>
        </>
    );
}

export default Home;
