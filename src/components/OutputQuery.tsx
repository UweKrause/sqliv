import {useEffect, useState} from "react";

import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import solarizedDark from 'react-syntax-highlighter/dist/esm/styles/hljs/solarized-dark';
import solarizedLight from 'react-syntax-highlighter/dist/esm/styles/hljs/solarized-light';

SyntaxHighlighter.registerLanguage('sql', sql);

export default function OutputQuery({inputQuery, inputFields}) {

    const [syntaxHighlighterStyle,
        setSyntaxHighlighterStyle] = useState(
        window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? solarizedDark
            : solarizedLight
    )

    const [outputQuery, setOutputQuery] =
        useState("")

    // ToDo:
    //  https://react.dev/learn/you-might-not-need-an-effect#subscribing-to-an-external-store
    //  https://react.dev/reference/react/useSyncExternalStore
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                setSyntaxHighlighterStyle(event.matches
                    ? solarizedDark
                    : solarizedLight);
            });
    }, []);

    useEffect(() => {
            let outputQuery = inputQuery
            inputFields.forEach(
                ({name, value}) =>
                    outputQuery = outputQuery.replaceAll(name, value)
            )

            setOutputQuery(
                outputQuery
                    .trim()
                    .replace(/\s+/g, ' ')
            )
        }, [inputQuery, inputFields]
    )


    return (
        <fieldset className="querybox">
            <legend>Output Query</legend>
            <SyntaxHighlighter
                language="sql"
                style={syntaxHighlighterStyle}
            >
                {outputQuery}
            </SyntaxHighlighter>
        </fieldset>
    )
}
