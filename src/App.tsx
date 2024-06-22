import './App.css'
import {ChangeEvent, useEffect, useState} from "react";

import {Light as SyntaxHighlighter} from
        'react-syntax-highlighter';

import sql from
        'react-syntax-highlighter/dist/esm/languages/hljs/sql';

import solarizedDark from
        'react-syntax-highlighter/dist/esm/styles/hljs/solarized-dark';

import solarizedLight from
        'react-syntax-highlighter/dist/esm/styles/hljs/solarized-light';

SyntaxHighlighter.registerLanguage('sql', sql);

function App() {
    const inputQueryInitial =
        "select count(*)\n" +
        "    from table users\n" +
        "    where name='$name'\n" +
        "    and password='$password';"

    const [inputQuery, setInputQuery] =
        useState(inputQueryInitial)

    const [inputFields, setInputFields] = useState(
        [
            {key: crypto.randomUUID(), name: "name", value: "admin' or '1'='1"},
            {key: crypto.randomUUID(), name: "password", value: "trustno1"},
        ]
    )

    const [outputQuery, setOutputQuery] =
        useState(inputQueryInitial)

    useEffect(() => {
            let outputQuery = inputQuery
            inputFields.forEach(
                ({name, value}) =>
                    outputQuery = outputQuery.replace("$" + name, value)
            )

            setOutputQuery(
                outputQuery
                    .trim()
                    .replace(/\s+/g, ' ')
            )
        }, [inputQuery, inputFields]
    )

    const [syntaxHighlighterStyle,
        setSyntaxHighlighterStyle] = useState(
        window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? solarizedDark
            : solarizedLight
    )

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                setSyntaxHighlighterStyle(event.matches
                    ? solarizedDark
                    : solarizedLight);
            });
    }, []);

    function handleInputFieldChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        const data = [...inputFields]
        data[index]["value"] = event.target.value
        setInputFields(data)
    }

    return (
        <>
            <fieldset className="querybox">
                <legend>Input query</legend>
                <textarea
                    name="inputQuery"
                    className="query"
                    value={inputQuery}
                    onChange={(e) =>
                        setInputQuery(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend>Input fields</legend>
                {
                    inputFields.map(
                        ({key, name, value}, index) => {
                            return (
                                <div
                                    key={key}>
                                    <label>${name}
                                        <input
                                            name={name}
                                            value={value}
                                            onChange={(event) =>
                                                handleInputFieldChange(index, event)}
                                        />
                                    </label>
                                    <br></br>
                                </div>
                            )
                        }
                    )
                }

            </fieldset>

            <fieldset className="querybox">
                <legend>Output query</legend>
                <SyntaxHighlighter
                    language="sql"
                    style={syntaxHighlighterStyle}
                >
                    {outputQuery}
                </SyntaxHighlighter>
            </fieldset>
        </>
    )
}

export default App
