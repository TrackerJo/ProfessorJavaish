import './fileTile.css'

function FileTile({fileName, handleSelectFile, selectedFile}){

    function handleClick(e){
        if(document.querySelector('.selected') != null){
            document.querySelector('.selected').onkeydown = null
            
        }
        
     
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
        <div className={'FileTile ' + (selectedFile == fileName ? 'selected' : '')} onClick={handleClick}>
            {fileName}
        </div>
    )
}

export default FileTile;