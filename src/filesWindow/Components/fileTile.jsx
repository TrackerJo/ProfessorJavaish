import './fileTile.css'

function FileTile({fileName, handleSelectFile}){

    function handleClick(e){
        if(document.querySelector('.selected') != null){
            document.querySelector('.selected').onkeydown = null
            document.querySelector('.selected').classList.remove('selected')
        }
        
        e.target.classList.add('selected')
        e.target.addEventListener('keydown', handleKeyClick  )
        handleSelectFile(fileName)
        
    }

    function handleKeyClick(e){
        console.log(e.keyCode)
        if(e.keyCode == 8 && e.metaKey){
            console.log('delete')
          }
    }
    return (
        <div className='FileTile' onClick={handleClick}>
            {fileName}
        </div>
    )
}

export default FileTile;