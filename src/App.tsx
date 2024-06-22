import './App.css'
import {useState} from "react";

function App() {
    const inputQueryInitial =
        "select count(*) from table users\n" +
        "    where 'name'='$name';"

    const [inputQuery, setInputQuery] =
        useState(inputQueryInitial)

    const [inputUser, setInputUser] =
        useState("user")

    const [outputQuery, setOutputQuery] =
        useState(inputQuery)

    function handleInputQueryChange(targetValue: string) {
        setInputQuery(targetValue)
        replaceOutputWithInput(targetValue, inputUser)
    }

    function handleUsernameChange(targetValue: string) {
        setInputUser(targetValue)
        replaceOutputWithInput(inputQuery, targetValue)
    }

    function replaceOutputWithInput(inputQuery: string, inputName: string) {
        setOutputQuery(
            inputQuery
                .replace("$name", inputName)
        )
    }

    return (
        <>
            <fieldset>
                <legend>Input query</legend>
                <textarea
                    name="inputQuery"
                    className="query"
                    value={inputQuery}
                    onChange={(e) =>
                        handleInputQueryChange(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <legend>Input fields</legend>
                <label>$name
                    <input
                        name="name"
                        value={inputUser}
                        onChange={(e) =>
                            handleUsernameChange(e.target.value)}
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
