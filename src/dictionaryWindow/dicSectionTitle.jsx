import { useEffect, useState, useRef } from 'react'

import plusIcon from '../assets/add_icon.png';
import minusIcon from '../assets/minus_icon.png';


function DicSectionTitle({connectedSection, sectionTitle}){
    const [open, setOpen] = useState(false)

    function handleClick(){
        setOpen(!open)
        let section = document.getElementById(connectedSection)
        if(open){
            section.classList.add('DicSectionClosed')
        } else {
            section.classList.remove('DicSectionClosed')
        }
    }
    
    return (
        <div className='DicSectionTitle' onClick={handleClick}>
            <h1>{sectionTitle}</h1>
            <img src={open ? minusIcon : plusIcon} alt="open" className={open ? 'CloseIcon' : 'OpenIcon'} />
        </div>
    )
}

export default DicSectionTitle