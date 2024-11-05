import React from "react";

import {exampleInputs, InputField} from "./exampleInputs.ts";


type LoadExample = {
    setInputQuery: React.Dispatch<React.SetStateAction<string>>,
    setInputFields: React.Dispatch<React.SetStateAction<InputField[]>>
}

export default function LoadExample(
    {setInputQuery, setInputFields}: LoadExample) {

    return (
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
    )
}
