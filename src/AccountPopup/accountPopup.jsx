import './accountPopup.css'
import { useState, useEffect } from 'react'
import closeIcon from '../assets/close_icon.png'

function AccountPopup({setShowAccPopup}){
    const [loading, setLoading] = useState(true)
    const [signedIn, setSignedIn] = useState(false)
    const [displayName, setDisplayName] = useState("Nathaniel")
    const [email, setEmail] = useState("nkemme54@gmail.com")
    
    useEffect(() => {
        document.addEventListener('click', handleClickAway)
        console.log('added event listener')
    }, [loading])

    function handleClickAway(e){
        //Check if click was outside of popup
        let popup = document.querySelector('.AccountPopup')
        //console.log(popup.contains(e.target))
        if(popup == null){
            return
        }
        if(!popup.contains(e.target) && !loading){
            handleClose()
        }
        if (loading){
            setLoading(false)
        }
    }
    
    function handleClose(){
        console.log('close')
        setLoading(true)

        setShowAccPopup(false)
    }

    return (
        <div className='AccountPopup'>
            <img onClick={handleClose} className='AccountPopupClose' src={closeIcon} alt='Close'/>
            <div className='AccountPopupContent'>
                <div className='AccountPopupHeader'>
                    <h2>Account</h2>
                    
                </div>
                <div className='AccountPopupBody'>
                   <div className='AccountPopupSignedIn'>
                        <p>Hello {displayName}!</p>
                        <p>{email}</p>
                    </div>
                
                </div>
            </div>
        </div>
    )


}

export default AccountPopup