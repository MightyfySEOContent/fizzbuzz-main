import styles from "@styles/Home.module.css";
import { Button, Label, Input, ResultList, Result, HintText } from "../components/components";
import Head from "next/head";
import { useState } from "react";

export const EMPTY_RESULT_HINT = "Geben Sie einen Wert größer als 1 in das Formular ein.";

function Home() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(false);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const targetDigit = parseInt(event.target.elements.targetDigit.value);
        if (targetDigit > 0) {
            setError(false);
            const newResults = [];
            for (let i = 1; i <= targetDigit; i++) {
                let result = "";
                if (i % 3 === 0) result += "Fizz";
                if (i % 5 === 0) result += "Buzz";
                if (!result) result = i.toString();
                newResults.push(result);
            }
            setResults(newResults);
        } else {
            setError(true); // Setze die Fehlerklasse hier
        }
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
                    <Input type="number" id="targetDigit" name="targetDigit" />
                    <Button type="submit" role="button">Submit</Button>
                    <HintText className={error ? "error" : "hint"}>
                        {error ? "Please enter a valid digit greater than 0" : " Please submit a digit greater than 0."}
                    </HintText>
                </form>
                <h2>Ergebnisse</h2>
                <ResultList className="result">
                    {results.map((result, index) => (
                        <Result key={index}>
                            {result}
                        </Result>
                    ))}
                </ResultList>
            </main>
        </>
    );
}

export default Home;
