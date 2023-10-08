import { useState } from 'react'
import './filesWindow.css'
import FileTile from './Components/fileTile'
import FilesTopBar from './topBar'

function FilesWindow({handleSelectFile, files, addFile, projName, setProjName, exitProj}){

    
    
    return (
        <div className='Files'>
            <FilesTopBar addFile={addFile} projName={projName} setProjName={setProjName} exitProj={exitProj}/>
            {files.map((file, index) => {
                return (
                   <FileTile fileName={file} key={index} handleSelectFile={handleSelectFile}/>
                )
            })
            }
        </div>
    )
}



export default FilesWindow