import {ChangeEvent} from "react";

export default function InputFields({inputFields, setInputFields}) {

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
        </fieldset>)
}
