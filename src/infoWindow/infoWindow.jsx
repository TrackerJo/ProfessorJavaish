import { useEffect, useState, useRef } from 'react'
import './infoWindow.css'

import InfoTopBar from './topbar';

function InfoWindow({closeInfoWinow}){
  

   
    
    return (
        <>
        <InfoTopBar closeInfoWinow={closeInfoWinow}/>
        <div className='InfoWindow'>
            <h1>What is Professor Javaish?</h1>
            <p>Professor Javaish is an IDE for a language that I wrote called Javaish. The whole goal of Prof. Java and Javaish is to create an easy way for beginners to see what programming is like, without the use of block coding. I tried to keep the language and IDE as simple as I could while not limiting the possibilities of what you could do too much.</p>
            <h1>Why was Professor Javaish and Javaish Made?</h1>
            <p>I am a firm believer that the best way to learn to do something is to make something with it. And the best way to get better at something is to make something hard and complicated. And so I decided to make this, not only to get better at programming, but hopefully create a tool for beginners to learn to program. One of the most annoying things about learning to program is all the setup you have to do just to start a project. I wanted to make and IDE and language that had little setup time, something that I would have wanted when I was learning to program.</p>
            <h1>How was Javaish made?</h1>
            <p>When first making a language, you need to decide what language you're going to use to make it and what is the grammar(syntax) going to look like. I chose to make Javaish using Java and as the name hints I wanted the grammar to resemble Java and English, and also some Javascript. After deciding the grammar you need a way to parse a text file to make it easier for the interpreter to read. And that brings us to the last step of making a language, the interpreter. The interpreter is what runs your code, it looks at the parsed file, and runs the current line. Now its much more complicated than that, so if you want to learn more about making a language, I'll link to a book here: <a href="http://www.craftinginterpreters.com/" target="_blank">http://www.craftinginterpreters.com/</a>.</p>
            <h1>How was Professor Javaish made?</h1>
            <p>Professor Java was made with&nbsp;<a href="https://react.dev/">ReactJS</a>,&nbsp;<a href="https://firebase.google.com/">Firebase</a>, and&nbsp;<a href="https://vitejs.dev/">Vite</a>. ReactJS was the framework used for the UI. Firebase was the backend and dealt with user authentication and storing the cloud projects. Vite was the&nbsp;build tool. The main package I used was&nbsp;<a href="https://codemirror.net/">CodeMirror</a>. CodeMirror was used as the text editor when editing Javaish code and implemented syntax highlighting and some intellisense.&nbsp;</p>
            <h1>What is to come?</h1>
            <p>I hope to implement the ability to execute the code line by line and go back. Also would like to add the ability to change variables while the program is running to see the effect it would have, making it easier to fix bugs and learn from the program.</p>
                        
                
            
        </div>
        </>
    )
}

export default InfoWindow