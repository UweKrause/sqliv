import './App.css'
import {useEffect, useState} from "react";

function App() {
    const inputQueryInitial =
        "select count(*) from table users\n" +
        "    where 'name'='$name';"

    const [inputQuery, setInputQuery] =
        useState(inputQueryInitial)

    const [inputUser, setInputUser] =
        useState("admin' or '1'='1")

    const [outputQuery, setOutputQuery] =
        useState(inputQueryInitial)

    useEffect(() => {
            setOutputQuery(
                inputQuery
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
                <textarea className="query"
                          value={outputQuery}
                          readOnly={true}
                />
            </fieldset>
        </>
    )
}

export default App
