import './App.css'
import {useEffect, useState} from "react";

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

    const [inputUser, setInputUser] =
        useState("admin' or '1'='1")

    const [inputPassword, setInputPassword] =
        useState("trustno1")

    const [outputQuery, setOutputQuery] =
        useState(inputQueryInitial)

    useEffect(() => {
            setOutputQuery(
                inputQuery
                    .replace("$name", inputUser)
                    .replace("$password", inputPassword)
                    .trim()
                    .replace(/\s+/g, ' ')
            )
        }, [inputQuery, inputUser, inputPassword]
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
                <br></br>
                <label>$password
                    <input
                        name="password"
                        value={inputPassword}
                        onChange={(e) =>
                            setInputPassword(e.target.value)}
                    />
                </label>
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
