import './App.css'
import {useEffect, useState} from "react";

import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import solarizedDark from 'react-syntax-highlighter/dist/esm/styles/hljs/solarized-dark';

SyntaxHighlighter.registerLanguage('sql', sql);

function App() {
    const inputQueryInitial =
        "select count(*)\n" +
        "   from table users\n" +
        "   where name='$name';"

    const [inputQuery, setInputQuery] =
        useState(inputQueryInitial)

    const [inputUser, setInputUser] =
        useState("admin' or '1'='1")

    const [outputQuery, setOutputQuery] =
        useState(inputQueryInitial)

    useEffect(() => {
            setOutputQuery(
                inputQuery
                    .trim()
                    .replace(/\s+/g, ' ')
                    .replace("$name", inputUser)
            )
        }, [inputQuery, inputUser]
    )

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
                <label>$name
                    <input
                        name="name"
                        value={inputUser}
                        onChange={(e) =>
                            setInputUser(e.target.value)}
                    />
                </label>
            </fieldset>

            <fieldset className="querybox">
                <legend>Output query</legend>
                <SyntaxHighlighter language="sql" style={solarizedDark}>
                    {outputQuery}
                </SyntaxHighlighter>
            </fieldset>
        </>
    )
}

export default App
