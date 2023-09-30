import {useRef, useEffect} from 'react'

import {basicSetup, EditorView} from "codemirror"
import {EditorState, Compartment} from "@codemirror/state"
import {python} from "@codemirror/lang-python"
import { example } from './JavaishLangauge';
import './JavaishEditor.css'

import {tags} from "@lezer/highlight"
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"
import { oneDarkHighlightStyle, oneDarkTheme } from '@codemirror/theme-one-dark';

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


export const Editor = () => {
    const editor = useRef();

    
  
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
          tabSize.of(EditorState.tabSize.of(8)),
          oneDarkTheme
      ]
      })
  
      const view = new EditorView({
      state,
      parent: editor.current
      })
    
  
      //const view = new EditorView({ state: startState, parent: editor.current });
  
      return () => {
        view.destroy();
      };
    }, []);
  
    return <div ref={editor} className='CodeEditor'></div>;
  };