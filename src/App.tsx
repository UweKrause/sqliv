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
    const exampleInputs = [
        {
            name: "Login by select count(*)",
            inputQuery: "select count(*)\n" +
                "    from table users\n" +
                "    where name='$name'\n" +
                "    and password='$password';",
            inputFields: [
                {key: crypto.randomUUID(), name: "$name", value: "admin"},
                {key: crypto.randomUUID(), name: "$password", value: "trustno1"},
            ]
        },
        // {
        //     name: "Login by select count(*) (sqli via line comment)",
        //     inputQuery: "select count(*)\n" +
        //         "    from table users\n" +
        //         "    where name='$name'\n" +
        //         "    and password='$password';",
        //     inputFields: [
        //         {key: crypto.randomUUID(), name: "$name", value: "admin' --"},
        //         {key: crypto.randomUUID(), name: "$password", value: "trustno1"},
        //     ]
        // },
        {
            name: "Search movie via name",
            inputQuery: "select id, title, genre, cover, rating\n" +
                "    from table movies\n" +
                "    where title like '%$title%';",
            inputFields: [
                {key: crypto.randomUUID(), name: "$title", value: "the"},
            ]
        },
        // {
        //     name: "Search movie via name (sqli via UNION)",
        //     inputQuery: "select id, title, genre, cover, rating\n" +
        //         "    from table movies\n" +
        //         "    where title like '%$title%';",
        //     inputFields: [
        //         {
        //             key: crypto.randomUUID(),
        //             name: "$title",
        //             value: "xxxxxx%' union select *,NULL,NULL from users --"
        //         },
        //     ]
        // },
        {
            name: "Filter movie via genre and/or rating",
            inputQuery: "select id, title, genre, cover, rating\n" +
                "    from table movies\n" +
                "    where genre like '%$genre%'\n" +
                "    and rating=$rating;",
            inputFields: [
                {key: crypto.randomUUID(), name: "$genre", value: "Comedy"},
                {key: crypto.randomUUID(), name: "$rating", value: "1"},
            ]
        },
    ]

    const initialInputQuery = exampleInputs[0].inputQuery
    const initialInputFields = exampleInputs[0].inputFields

    const defaultNameNewInputField = "$";

    const [inputQuery, setInputQuery] =
        useState(initialInputQuery)

    const [newInputVieldFormVisible, setnewInputVieldFormVisible] =
        useState(false)

    const [newInputFieldName, setNewInputFieldName] =
        useState(defaultNameNewInputField)

    const [newInputFieldStatus, setNewInputFieldStatus] =
        useState("$variable will be replaced")

    const [inputFields, setInputFields] =
        useState(initialInputFields)

    const [outputQuery, setOutputQuery] =
        useState(initialInputQuery)

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

    function handleInputFieldRemove(key: string) {
        console.log(key)
        setInputFields(inputFields.filter(
            (inputField) =>
                inputField.key != key)
        )
    }

    return (
        <>
            <fieldset>
                <legend>Load Example</legend>
                <form>
                    <select
                        onChange={(e) => {
                            setInputQuery(exampleInputs[~~e.target.value].inputQuery)
                            setInputFields(exampleInputs[~~e.target.value].inputFields)
                        }}
                    >
                        {
                            exampleInputs.map((eI, index) => {
                                return <option value={index}>{eI.name}</option>;
                            })
                        }
                    </select>
                </form>
            </fieldset>
            <fieldset className="querybox">
                <legend>Input Query</legend>
                <textarea
                    name="inputQuery"
                    className="query"
                    value={inputQuery}
                    onChange={(e) =>
                        setInputQuery(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend
                    onClick={
                        () => setnewInputVieldFormVisible(!newInputVieldFormVisible)
                    }
                >
                    Input Options
                </legend>
                <form className={newInputVieldFormVisible ? '' : 'hidden'}>
                    <input
                        id="newInputName"
                        value={newInputFieldName}
                        onChange={(e) => {
                            setNewInputFieldName(e.target.value)
                        }}
                    />
                    &nbsp;
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            if (!inputFields.some((inputField) => {
                                return inputField.name === newInputFieldName
                            })) {
                                setInputFields([
                                        ...inputFields,
                                        {key: crypto.randomUUID(), name: newInputFieldName, value: ""}
                                    ]
                                )
                                setNewInputFieldStatus("Added field " + newInputFieldName)
                                setNewInputFieldName(defaultNameNewInputField)
                            } else {
                                setNewInputFieldStatus("Field " + newInputFieldName + " already exists")
                            }
                        }
                        }
                    >
                        Add
                    </button>
                    &nbsp;
                    <span>{newInputFieldStatus}</span>
                </form>
            </fieldset>

            <fieldset>
                <legend>Input Fields</legend>
                {
                    inputFields.map(
                        ({key, name, value}, index) => {
                            return (
                                <div
                                    key={key}>
                                    <label>
                                        {name}
                                        &nbsp;
                                        <input
                                            name={name}
                                            value={value}
                                            onChange={(event) =>
                                                handleInputFieldChange(index, event)}
                                        />
                                    </label>
                                    &nbsp;
                                    <span onClick={() => handleInputFieldRemove(key)}>
                                        🗑
                                    </span>
                                    <br></br>
                                </div>
                            )
                        }
                    )
                }
            </fieldset>

            <fieldset className="querybox">
                <legend>Output Query</legend>
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
