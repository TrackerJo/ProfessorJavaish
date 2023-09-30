import './consoleMsg.css'

function ConsoleMsg({msg, type}){

    return (
            <div className={'ConsoleMsg ' + type}>
                {msg}
            </div>
    )
}

export default ConsoleMsg