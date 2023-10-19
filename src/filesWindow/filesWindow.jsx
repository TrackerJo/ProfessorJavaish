import { useState, useEffect } from 'react'
import './filesWindow.css'
import FileTile from './Components/fileTile'
import FilesTopBar from './topBar'
import forwardIcon from '../assets/forward_icon.png'
import backwardIcon from '../assets/backward_icon.png'
import backIcon from '../assets/back_icon.png'
function FilesWindow({handleSelectFile, files, addFile, projName, setProjName, exitProj, canCloudSave, cloudSave}){
    const [mini, setMini] = useState(false)
    useEffect(() => {
        console.log('files changed')
        console.log(files)
    }
    , [files])
    
    function handlieFlip(){
        setMini(!mini)
    }

    async function handleBackButton(){
        setMini(false)
        await exitProj()
    }
     
    
    return (
        <>
            {mini ? 
            <div className='FilesWindowMini'>
                <img src={backIcon} className='BackIconMini' alt='Back' onClick={handleBackButton}/>
                <div className='FilesBottom'>
                    <img src={forwardIcon} alt={"minimize"} onClick={handlieFlip} className='MinimizeIcon'/>
                </div>
            </div>
            : <div className='FilesWindow'>
                <FilesTopBar addFile={addFile} projName={projName} setProjName={setProjName} exitProj={exitProj} canCloudSave={canCloudSave} cloudSave={cloudSave}/>
                <div className='Files'>
                    {files.map((file, index) => {
                        return (
                        <FileTile fileName={file} key={index} handleSelectFile={handleSelectFile}/>
                        )
                    })}
                </div>
                <div className='FilesBottom'>
                    {projName != "" ? <img src={backwardIcon} alt={"minimize"} onClick={handlieFlip} className='MinimizeIcon'/> : null}
                </div>
                
                
                
            </div>}
        </>
    )
}



export default FilesWindow