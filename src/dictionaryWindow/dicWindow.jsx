import { useEffect, useState, useRef } from 'react'
import './dicWindow.css'


import DicTopBar from './topbar';

function DicWindow({convertedCode, closeDicWindow}){
    const [code, setCode] = useState(convertedCode)
   
    useEffect(() => {
        setCode(convertedCode)
        console.log(convertedCode)
    }, [convertedCode])
   
    
    return (
        <div className='DicColumn'>
            <DicTopBar closeDicWindow={closeDicWindow}/>
            <div className='DicWindow'>
                    
            
                
                
                
            </div>
        </div>
    )
}

export default DicWindow