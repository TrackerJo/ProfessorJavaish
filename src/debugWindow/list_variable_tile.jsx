import "./list_variable_tile.css"
import trashIcon from "../assets/trash_icon.png"

function ListVariableTile({name, type, elements, setValue, removeElement, addElement}){
    
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
                            <img src={trashIcon} alt="remove" className="remove-element" onClick={() => {removeElement(index); console.log("Click")}}/>
                        </div>
                    )
            }
            )}
            </div>
            <button onClick={() => addElement()} className="add-element">Add Element</button>

        </div>
    )
}

export default ListVariableTile