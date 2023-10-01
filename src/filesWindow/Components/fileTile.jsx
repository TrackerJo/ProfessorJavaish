import './fileTile.css'

function FileTile({fileName, handleSelectFile}){

    function handleClick(e){
        document.querySelector('.selected')?.classList.remove('selected')
        e.target.classList.add('selected')
        handleSelectFile(fileName)

    }
    return (
        <div className='FileTile' onClick={handleClick}>
            {fileName}
        </div>
    )
}

export default FileTile;