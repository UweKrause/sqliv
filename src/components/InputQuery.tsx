export default function InputQuery({inputQuery, setInputQuery}) {
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
