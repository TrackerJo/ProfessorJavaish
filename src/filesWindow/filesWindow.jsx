import { useState } from 'react'
import './filesWindow.css'
import FileTile from './Components/fileTile'

function FilesWindow({handleSelectFile, files}){

    
    
    return (
        <div className='Files'>
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