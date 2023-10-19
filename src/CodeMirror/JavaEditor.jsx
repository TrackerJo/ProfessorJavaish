import React, { useRef, useEffect } from 'react';

import {basicSetup, EditorView} from "codemirror"
import {keymap} from '@codemirror/view'
import {EditorState} from "@codemirror/state"
import { defaultKeymap } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';

export const JavaEditor = ({code}) => {
  const editor = useRef();

  useEffect(() => {
    const startState = EditorState.create({
      
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap]),
        oneDark,
        java(),
      ],
    });

    const view = new EditorView({ state: startState, parent: editor.current });

    view.dispatch({
        changes: {from: 0, insert: code}
      })

    return () => {
      view.destroy();
    };
  }, [code]);

  return <div ref={editor}></div>;
};

export default JavaEditor;
