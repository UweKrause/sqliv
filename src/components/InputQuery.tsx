import React from "react";

type InputQuery = {
    inputQuery: string;
    setInputQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function InputQuery(
    {inputQuery, setInputQuery}: InputQuery) {

    return (
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
    )
}
