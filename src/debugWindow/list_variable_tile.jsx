import "./list_variable_tile.css"

function ListVariableTile({name, type, elements, setValue}){
    
    return(
        <div className="list-variable-tile">
            <div className="list-variable-tile_name">Name: {name}</div>
            <div className="list-variable-tile_type">Type: {type}</div>
            <div className="variable-tile_elements">{
                elements.map((element, index) => {

                    return (
                        <div key={index} className="list-variable-tile_element">
                            {type == "BOOLEANLIST" ? 
                        <select onChange={(e) => setValue(e.target.value)} defaultValue={element}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    :<input type={type == "INTLIST" ? "number" : "text"} defaultValue={element} onChange={(e) => setValue(e.target.value, index)} />}
                        </div>
                    )
            }
            )}
            </div>

        </div>
    )
}

export default ListVariableTile