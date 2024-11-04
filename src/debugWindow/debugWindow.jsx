/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import './debugWindow.css'

import DebugTopBar from './topBar'
import VariableTile from './variable_tile'
import ListVariableTile from './list_variable_tile'

function DebugWindow({setIsDebugging}){
    const [states, setStates] = useState([])
    const [currentLine, setCurrentLine] = useState(-1)
    const [reachedEnd, setReachedEnd] = useState(false)
    const [globalVariables, setGlobalVariables] = useState([])
    const [loadedVariables, setLoadedVariables] = useState([])
    function runNext(){
        setGlobalVariables([])
        if(reachedEnd) return
        let line = currentLine + 1
        setCurrentLine(line)
        console.log(line)
        let state = ""
        if(line == 0){
            state = ""
        } else {
            state = states[line - 1]
        }
        console.log(state)
        console.log(states)
        document.querySelector('.State').innerHTML = state == "" ? "" : JSON.stringify(state)
        document.getElementById("root").classList.add("debug")
        main(true)
        document.getElementById("root").classList.remove("debug")
        let stateJSON = JSON.parse(document.querySelector('.State').textContent)
        goToCurrentLine(getCurrentRuntimeLine(stateJSON))
        let globalVariables = getVariables(stateJSON)
        
        let loadedVars = checkIfVariablesLoaded(globalVariables)
        console.log(loadedVars, "loaded variables")
        globalVariables = sortArrayByLoadedVars(globalVariables, loadedVars)
        setGlobalVariables([...globalVariables])
        checkIfVariablesLoaded(globalVariables)
        
        console.log(globalVariables, "global variables")
        if(stateJSON.isComplete && stateJSON.isGlobal){
            setReachedEnd(true)
        } else {
            setReachedEnd(false)
        }
        let newStates = [...states]
        newStates[line] = stateJSON
        setStates(newStates)
        // let consoleArea = document.querySelector('.ConsoleArea')
        // consoleArea.scrollTop = consoleArea.scrollHeight;
        console.log(newStates)
        console.log("current line", currentLine)
    }



    function getVariables(StateJSON){
        let variables = []
        
        variables = [...variables]
        if(StateJSON.states.length > 0){
            let currentState = StateJSON
            while(currentState.states.length > 0){
                
                let localVariables = objectToArray(currentState.localVariables)
                //Remove duplicates
                for(let j = 0; j < localVariables.length; j++){
                    let localVariable = localVariables[j]
                    for(let k = 0; k < variables.length; k++){
                        let variable = variables[k]
                        if(localVariable.name == variable.name){
                            variables.splice(k, 1)
                        }
                    }
                }
                variables = [...variables, ...localVariables]
                currentState = currentState.states[currentState.states.length - 1]
            }
            let localVariables = objectToArray(currentState.localVariables)
            //Remove duplicates
            for(let j = 0; j < localVariables.length; j++){
                let localVariable = localVariables[j]
                for(let k = 0; k < variables.length; k++){
                    let variable = variables[k]
                    if(localVariable.name == variable.name){
                        variables.splice(k, 1)
                    }
                }
            }
            variables = [...variables, ...localVariables]
            currentState = currentState.states[currentState.states.length - 1]
            let lastState = StateJSON.states[StateJSON.states.length - 1]
            let globalVariables = objectToArray(lastState.globalVariables)
            //Remove duplicates
            for(let i = 0; i < globalVariables.length; i++){
                let globalVariable = globalVariables[i]
                for(let j = 0; j < variables.length; j++){
                    let variable = variables[j]
                    if(globalVariable.name == variable.name){
                        variables.splice(j, 1)
                    }
                }
            }
            variables = [...variables, ...globalVariables]
        } else {
            let globalVariables = objectToArray(StateJSON.globalVariables)
            variables = [...variables, ...globalVariables]
        }

        

        
        return variables
    }

    function getCurrentRuntimeLine(StateJSON){
        //Check if there are states
        if(StateJSON.states.length == 0){
            return StateJSON.currentRuntimeLine
        } else {
            //Get Last state
            let current = StateJSON.states[StateJSON.states.length - 1]
            while (current.states.length > 0){
                current = current.states[current.states.length - 1]
            }
            return current.currentRuntimeLine
        }
    }

    function goToCurrentLine(currentLine){
        let code = document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content')
        //console.log("CLICK")
        let lines = code.children
        //console.log(lines)
        //console.log("Scrolling to line " + i)
        lines[currentLine - 1].scrollIntoView()

        document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-activeLine').classList.remove('cm-activeLine')
        if(document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-focusLine') != null){
            document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-focusLine').classList.remove('cm-focusLine')
        }
        lines[currentLine-1].classList.add('cm-activeLine')
        //Set focus to line
        lines[currentLine-1].classList.add('cm-focusLine')
          
        
      
    }

    function checkIfVariablesLoaded(variables){
        let lVariables = loadedVariables
        for(let i = 0; i < variables.length; i++){
            let variable = variables[i]
            if(lVariables.includes(variable.name)){
                continue
            } else {
                lVariables.push(variable.name)
            }
        }
        lVariables = checkIfVariableRemoved(variables, lVariables)
        setLoadedVariables(lVariables)
        return lVariables
    }

    function checkIfVariableRemoved(variables, loadedVariables){
        let newVariables = []
        for(let i = 0; i < loadedVariables.length; i++){
            let loadedVariable = loadedVariables[i]
            for(let j = 0; j < variables.length; j++){
                let variable = variables[j]
                if(loadedVariable == variable.name){
                    newVariables.push(variable.name)
                }
            }
        }
        return newVariables
    }

    

    function objectToArray(obj){
        let arr = []
        for(let key in obj){
            arr.push(obj[key])
        }
        return arr
    }

    function runPrev(){
        if(currentLine <= 0) return
        let line = currentLine - 1
        setCurrentLine(line)
        console.log(line, "line")
        let state = ""
        
        if(line == -1){
            state = ""
        } else if(states[line - 1] == undefined){
            state = ""
        }
        else {
            state = states[line - 1]
        }
        console.log(state, "state")
        console.log(states)
        document.querySelector('.State').innerHTML = state == "" ? "" : JSON.stringify(state)
        document.getElementById("root").classList.add("debug")
        main(true)
        document.getElementById("root").classList.remove("debug")
        let stateJSON = JSON.parse(document.querySelector('.State').textContent)
        goToCurrentLine(getCurrentRuntimeLine(stateJSON))
        let globalVariables = getVariables(stateJSON)
        
        let loadedVars = checkIfVariablesLoaded(globalVariables)
        console.log(loadedVars, "loaded variables")
        globalVariables = sortArrayByLoadedVars(globalVariables, loadedVars)
        setGlobalVariables(globalVariables)
        checkIfVariablesLoaded(globalVariables)
        
        console.log(globalVariables, "global variables")
        if(stateJSON.isComplete && stateJSON.isGlobal){
            setReachedEnd(true)
        } else {
            setReachedEnd(false)
        }
        let newStates = [...states]
        newStates[line] = stateJSON
        setStates(newStates)
        // let consoleArea = document.querySelector('.ConsoleArea')
        // consoleArea.scrollTop = consoleArea.scrollHeight;
        console.log(newStates)
    }

    function stopDebugging(){
        setCurrentLine(-1)
        setReachedEnd(false)
        setStates([])
        document.querySelector('.State').innerHTML = ""
        setIsDebugging(false)

    }

    const setVariableValue = (index) => (value) => {
        let newGlobalVariables = [...globalVariables]
        newGlobalVariables[index].value = value
        setGlobalVariables(newGlobalVariables)
        let state = states[currentLine]
        state.globalVariables[newGlobalVariables[index].name].value = value
        let newStates = [...states]
        newStates[currentLine] = state
        setStates(newStates)
    }

    const setListValue = (index) => (value, eIndex) => {
        let newGlobalVariables = [...globalVariables]
        newGlobalVariables[index].value.value[eIndex] = value
        // setGlobalVariables(newGlobalVariables)
        let state = states[currentLine]
        state.globalVariables[newGlobalVariables[index].name].value.value[eIndex] = value
        let newStates = [...states]
        newStates[currentLine] = state
        setStates(newStates)
        console.log("new states", newStates)
    }

    const addListElement = (index) => () =>{
        let newGlobalVariables = [...globalVariables]
        newGlobalVariables[index].value.value.push("")
        setGlobalVariables(newGlobalVariables)
        let state = states[currentLine]
        state.globalVariables[newGlobalVariables[index].name] = newGlobalVariables[index]
        let newStates = [...states]
        newStates[currentLine] = state
        setStates(newStates)
    }

    const removeListElement = (index) => (eIndex) => {
        let newGlobalVariables = [...globalVariables]
        newGlobalVariables[index].value.value.splice(eIndex, 1)
        setGlobalVariables(newGlobalVariables)
        let state = states[currentLine]
        state.globalVariables[newGlobalVariables[index].name] = newGlobalVariables[index]
        let newStates = [...states]
        newStates[currentLine] = state
        setStates(newStates)
        console.log("new states", newStates)
        console.log("new global variables", newGlobalVariables)
    }


    const sortArrayByLoadedVars = (arr, loadedVars) => {
        let sortedArr = []
        for(let i = 0; i < loadedVars.length; i++){
            for(let j = 0; j < arr.length; j++){
                if(loadedVars[i] == arr[j].name){
                    sortedArr.push(arr[j])
                }
            }
        }
        console.log(sortedArr, "sorted arr")
        return sortedArr
    }

    const convertTypeToString = (type) => {
        if(type == "INT"){
            return "int"
        } else if(type == "STRING"){
            return "String"
        } else if(type == "BOOLEAN"){
            return "bool"
        } else if(type == "INTLIST"){
            return "int[]"
        } else if(type == "STRINGLIST"){
            return "string[]"
        } else if(type == "BOOLEANLIST"){
            return "boolean[]"
        } else if(type == "FUNCTION"){
            return "function"
        }
    }
    
    return (
        <>
            <div className='DebugWindow'>
                <DebugTopBar runNext={runNext} runPrev={runPrev} currentLine={currentLine} reachedEnd={reachedEnd} stopDebugging={stopDebugging}/>
                <h3 className='Title'>Variables</h3>
                <div className='GlobalVariables'>
                    {globalVariables.length > 0 ? globalVariables.map((variable, index) => {
                        if(variable.type == "FUNCTION"){
                            return 
                        }
                        if(variable.type == "INTLIST" || variable.type == "STRINGLIST" || variable.type == "BOOLEANLIST"){
                            // console.log("list variable", variable.value.value, "value")
                            return (
                                <>
                                <ListVariableTile key={variable.name} name={variable.name} type={convertTypeToString(variable.type)} elements={variable.value.value} setValue={setListValue(index)} removeElement={removeListElement(index)} addElement={addListElement(index)}/>
                                <br />
                                </>
                                )
                        } else {
                            return (
                                <>
                                <VariableTile key={variable.name} name={variable.name} type={convertTypeToString(variable.type)} value={variable.value} setValue={setVariableValue(index)}/>
                                <br />
                                </>
                            )
                        }
                    }) : <p>No variables</p>}
                    </div>
                    
                
                
            </div>
        </>
    )
}



export default DebugWindow