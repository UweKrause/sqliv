import './App.css'
import {useState} from "react";

import LoadExample from "./components/LoadExample.tsx";
import InputQuery from "./components/InputQuery.tsx";
import InputOptions from "./components/InputOptions.tsx";
import InputFields from "./components/InputFields.tsx";
import OutputQuery from "./components/OutputQuery";

import {exampleInputs} from "./components/exampleInputs.ts";

const initialInputQuery = exampleInputs[0].inputQuery
const initialInputFields = exampleInputs[0].inputFields

function App() {

    const [inputQuery, setInputQuery] =
        useState(initialInputQuery)

    const [inputFields, setInputFields] =
        useState(initialInputFields)

    return (
        <>
            <LoadExample
                setInputQuery={setInputQuery}
                setInputFields={setInputFields}
            />

            <InputQuery
                inputQuery={inputQuery}
                setInputQuery={setInputQuery}
            />

            <InputOptions
                inputFields={inputFields}
                setInputFields={setInputFields}
            />

            <InputFields
                inputFields={inputFields}
                setInputFields={setInputFields}
            />

            <OutputQuery
                inputQuery={inputQuery}
                inputFields={inputFields}
            />
        </>
    )
}

export default App
