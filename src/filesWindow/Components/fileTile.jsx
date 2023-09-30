import './fileTile.css'

function FileTile({fileName, handleSelectFile}){

    function handleClick(){
        handleSelectFile(fileName)
    }
    return (
        <div className='FileTile' onClick={handleClick}>
            <p>{fileName}</p>
        </div>
    )
}

export default FileTile;