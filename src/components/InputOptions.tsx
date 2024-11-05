import React, {useState} from "react";

import {InputField} from "./exampleInputs.ts";

type InputOptions = {
    inputFields: InputField[],
    setInputFields: React.Dispatch<React.SetStateAction<InputField[]>>
}

const defaultNameNewInputField = "$";

export default function InputOptions(
    {inputFields, setInputFields}: InputOptions) {

    const [newInputVieldFormVisible, setnewInputVieldFormVisible] =
        useState(false)

    const [newInputFieldName, setNewInputFieldName] =
        useState(defaultNameNewInputField)

    const [newInputFieldStatus, setNewInputFieldStatus] =
        useState("$variable will be replaced")

    return (
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
    )
}
