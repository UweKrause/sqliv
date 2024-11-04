import {exampleInputs} from "./exampleInputs.ts";

export default function LoadExample({setInputQuery, setInputFields}) {

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
