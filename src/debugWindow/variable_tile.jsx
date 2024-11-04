function VariableTile({name, type, value, setValue}){
    return(
        <div className="variable-tile">
            <div className="variable-tile__name">Name: {name}</div>
            <div className="variable-tile__type">Type: {type}</div>
            <div className="variable-tile__value">Value</div>
            <div className="variable-tile__value">
                {type == "BOOLEAN" ? 
                    <select onChange={(e) => setValue(e.target.value)} value={value}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                 :<input type={type == "INT" ? "number" : "text"} value={value} onChange={(e) => setValue(e.target.value)} />}
            </div>
        </div>
    )
}

export default VariableTile