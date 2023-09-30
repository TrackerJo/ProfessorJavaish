import './alert.css'

function Alert({msg, closeAlert}){

    return (
            <div className={'Alert'}>
                {msg}
                <button className='AlertButton' onClick={closeAlert}>
                    OK
                </button>
            </div>
    )
}

export default Alert