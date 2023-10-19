import './accountPopup.css'
import { useState, useEffect } from 'react'
import closeIcon from '../assets/close_icon.png'
import { createUser, getCurrentUser, isLoggedIn, signIn, signOutUser } from '../firebase/auth'
import { getUserProjects } from '../firebase/database'

function AccountPopup({setShowAccPopup, loadUser}){
    
    const [signedIn, setSignedIn] = useState(true)
    const [displayName, setDisplayName] = useState("Nathaniel")
    const [email, setEmail] = useState("nkemme54@gmail.com")
    const [showSignIn, setShowSignIn] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    const [password, setPassword] = useState('')
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [isSigningIn, setIsSigningIn] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClickAway)
        console.log('added event listener')
        async function loadAuth(){
            let loggedIn = await isLoggedIn()
            setSignedIn(loggedIn)
            if(loggedIn){
                let user = await getCurrentUser()
                setDisplayName(user.displayName)
                setEmail(user.email)
            }
        }
        loadAuth()
    }, [signedIn])

    function handleClickAway(e){
        //Check if click was outside of popup
        let popup = document.querySelector('.AccountPopup')
        //console.log(popup.contains(e.target))
        if(popup == null){
            return
        }
        //Make sure didnt click account icon
        if(e.target.className === 'AccountIcon'){
            return
        }
        console.log(e.target)
        if(!popup.contains(e.target) && !popup.contains(e.target.parentNode) && !popup.contains(e.target.parentNode.parentNode)){
            console.log('click away')
            handleClose()
        }
       
    }
    
    function handleClose(){
        console.log('close')
        

        setShowAccPopup(false)
    }

    function handleSelectSignIn(){
        setShowSignIn(true)
        setShowSignUp(false)
    }

    function handleSelectSignUp(){
        setShowSignIn(false)
        setShowSignUp(true)
    }

    async function handleSignUp(){
        setIsSigningUp(true)
        let result = await createUser(displayName, email, password)
        console.log(result)
        if(result != null){
            setSignedIn(true)
            setShowSignUp(false)
        }
        setIsSigningUp(false)
    }

    async function handleSignIn(){
        setIsSigningIn(true)
        let result = await signIn(email, password)
        console.log(result)
        if(result != null){
            setSignedIn(true)
            setShowSignIn(false)
            loadUser()
        }
        setIsSigningIn(false)
    }

    async function handleSignOut(){
        await signOutUser()
        setSignedIn(false)
    }

  
    return (
        <div className='AccountPopup'>
            <img onClick={handleClose} className='AccountPopupClose' src={closeIcon} alt='Close'/>
            <div className='AccountPopupContent'>
                <div className='AccountPopupHeader'>
                    <h2>Account</h2>
                    
                </div>
                <div className='AccountPopupBody'>
                  {signedIn ? <div className='AccountPopupSignedIn'>
                        <p>Hello {displayName}!</p>
                        <p>{email}</p>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div> : showSignIn ? <div className='AccountPopupSignIn'> 
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        <br />
                        {isSigningIn ? <div className="loader"></div> : <button onClick={handleSignIn}>Sign In</button> }
                    </div> : showSignUp ? <div className='AccountPopupSignUp'>
                        <label htmlFor="displayName">Full Name:</label>
                        <input type="text" name="displayName" id="displayName" onChange={(e) => setDisplayName(e.target.value)}/>
                        <br />
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        <br />
                       {isSigningUp ? <div className="loader"></div> :  <button onClick={handleSignUp}>Sign Up</button>}
                    </div> : 
                    <div className='AccountPopupNotSignedIn'>
                        <button onClick={handleSelectSignIn}>Sign In</button>
                        <br />
                        <br />
                        <button onClick={handleSelectSignUp}>Sign Up</button>
                    </div>}
                
                </div>
            </div>
        </div>
    )


}

export default AccountPopup