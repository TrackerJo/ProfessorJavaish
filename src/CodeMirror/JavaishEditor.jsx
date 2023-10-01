import {useRef, useEffect, useState} from 'react'

import {basicSetup, EditorView} from "codemirror"
import {keymap} from '@codemirror/view'
import {EditorState, Compartment} from "@codemirror/state"
import {python} from "@codemirror/lang-python"
import { example } from './JavaishLangauge';
import {indentWithTab} from "@codemirror/commands"
import './JavaishEditor.css'

import {tags} from "@lezer/highlight"
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"
import { oneDarkTheme } from '@codemirror/theme-one-dark';

const myHighlightStyle = HighlightStyle.define([
  {tag: tags.keyword, color: "#c678dd"},
  {tag: tags.typeName, color: "#ffdc8d"},
  {tag: tags.variableName, color: "#e06c75"},
  {tag: tags.operator, color: "#56b6c2"},
  {tag: tags.lineComment, color: "#98c379"},
  {tag: tags.number, color: "#d19a66"},
  {tag: tags.string, color: "#98c379"},
  {tag: tags.list, color: "#c678dd"},
  {tag: tags.paren, color: "#56b6c2"},
  {tag: tags.bracket, color: "#56b6c2"},
  {tag: tags.name, color: "#61afee"},
])


function Editor({startingCode, codeChanged, savedCode, canEdit})  {
    const editor = useRef();
    const [syncVal, setSyncVal] = useState("");
    function getCode(){
      return editor.current.firstChild.textContent
    }
  
  
    useEffect(() => {
    //   const startState = EditorState.create({
    //     doc: 'Hello World',
    //     extensions: [keymap.of(defaultKeymap)],
    //   });

      let language = new Compartment, tabSize = new Compartment

      let state = EditorState.create({
      extensions: [
          basicSetup,
          syntaxHighlighting(myHighlightStyle),
          language.of(example()),
          keymap.of([indentWithTab]),
          tabSize.of(EditorState.tabSize.of(8)),
          oneDarkTheme, 
          EditorView.updateListener.of(function(e) {
            setSyncVal(e.state.doc.toString());
        }),
        EditorView.editable.of(canEdit),
      ]
      })
  
      const view = new EditorView({
      state,
      parent: editor.current
      })


    
      view.dispatch({
        changes: {from: 0, insert: startingCode}
      })

      // console.log(getCode())
      //const view = new EditorView({ state: startState, parent: editor.current });
  
      return () => {
        view.destroy();
      };
    }, [startingCode]);

    useEffect(() => {
      console.log(syncVal)
      if(syncVal != savedCode){
        codeChanged(syncVal)
      }
    }, [syncVal])

    //Disable editting
  
   

    return <div ref={editor} className='CodeEditor'></div>;
  }

export default Editor