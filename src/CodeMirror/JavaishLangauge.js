import {parser} from "./parser.js"
import {foldNodeProp, foldInside, indentNodeProp} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {LRLanguage} from "@codemirror/language"
import {completeFromList, CompletionContext} from "@codemirror/autocomplete"
import {LanguageSupport, syntaxTree} from "@codemirror/language"


let parserWithMetadata = parser.configure({
  props: [
    indentNodeProp.add({
      Application: context => context.column(context.node.from) + context.unit
    }),
    foldNodeProp.add({
      Application: foldInside
    })
  ]
})

export const exampleLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: {line: "//"}
  }
})

const TypeOptions = [
  "String", "int", "bool", "float", "String[]", "int[]", "bool[]", "float[]"
].map(tag => ({label: tag, type: "type"}))

const KeywordOptions = [
  {label: "let", detail: ""}, {label: "if", detail: ""}, {label: "for", detail: "loop"}, {label: "while", detail: "loop"}, {label: "for when", detail: "loop"}, {label: "for each", detail: "loop"},
  {label: "add", detail: "mutation"}, {label: "subtract", detail: "mutation"}, {label: "divide", detail: "mutation"}, {label: "multiply", detail: "mutation"}, {label: "remove", detail: "listMutation"}, {label: "removeAll", detail: "listMutation"}, {label: "removeAt", detail: "listMutation"},
  {label: "function", detail: "function"}, {label: "return", detail: "function"}
].map(tag => ({label: tag.label, detail: tag.detail, type: "keyword"}))

const ExpressionOptions = [
  {label: "greater than", detail: "comparison"}, {label: "less than", detail: "comparison"}, {label: "greater than or equal to", detail: "comparison"}, {label: "less than or equal to", detail: "comparison"}, {label: "equals", detail: "comparison"}, {label: "not equals", detail: "comparison"}, 
].map(tag => ({label: tag.label, detail: tag.detail, type: "keyword"}))

const ForOptions = [
  {label: "when", detail: "loop"}, {label: "each", detail: "loop"}
].map(tag => ({label: tag.label, detail: tag.detail, type: "keyword"}))

function Completions(context) {
  let word = context.matchBefore(/\w*/)
  console.log(word)
  let wordLength = word.to - word.from
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos - wordLength, -1)
  //Get all text before nodeBefore
  let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos)
  console.log(textBefore + " textBefore")
  console.log(nodeBefore.name + " nodeBefore")
  if (nodeBefore.name == "Declaration"){
    return DeclarationCompletions(context)
  }
  if (nodeBefore.name == "Program" || nodeBefore.name == "⚠"){
    return KeywordCompletions(context)
  }

  if (nodeBefore.name == "BinaryExpression"){
    return ExpressionCompletions(context)
  }

  if (nodeBefore.name == "ForStatement"){
    return ForCompletions(context)
  }

}

function KeywordCompletions(context) {
  let word = context.matchBefore(/\w*/)
  console.log(word)
  let wordLength = word.to - word.from
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos - wordLength, -1)
  let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos)
  console.log(word.to - textBefore.length + " textCBefore " + word.from + " word")
  let tagBefore = /@\w*$/.exec(textBefore)
  return {
    from: word.to - textBefore.length,
    options: KeywordOptions,
    validFor: /^(@\w*)?$/
  }
}

function ForCompletions(context) {
    //Get length of word before cursor to space
    let word = context.matchBefore(/\w*/)
  
    //Set pastWord to the word before the word before the cursor
  
    let wordLength = word.to - word.from
    let pastNode = syntaxTree(context.state).resolveInner(context.pos - wordLength - 1, -1)
    console.log(pastNode.name + " pastWord")
    
    let nodeBefore = syntaxTree(context.state).resolveInner(context.pos - wordLength, -1)
  
    let wordBefore = syntaxTree(context.state).resolveInner(context.pos - (wordLength - 1), 0)
  
    console.log(wordBefore.name + " Before")
    
    if(pastNode.name == "ForKW"){
      return {
        from: word.from,
        options: ForOptions,
        validFor: /^(@\w*)?$/
      }
    }
  }  

function DeclarationCompletions(context) {
  //Get length of word before cursor to space
  let word = context.matchBefore(/\w*/)
  
  //Set pastWord to the word before the word before the cursor

  let wordLength = word.to - word.from
  let pastNode = syntaxTree(context.state).resolveInner(context.pos - wordLength - 1, -1)
  console.log(pastNode.name + " pastWord")
  
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos - wordLength, -1)

  let wordBefore = syntaxTree(context.state).resolveInner(context.pos - (wordLength - 1), 0)

  console.log(wordBefore.name + " Before")
  
  if(pastNode.name == "LetKW"){
    return TypeCompletions(context)
  }

  if(pastNode.name == "Equal" ){
    return ExpressionCompletions(context)
  }
}

function TypeCompletions(context) {
  let word = context.matchBefore(/\w*/)
  return {
    from: word.from,
    options: TypeOptions,
    validFor: /^(@\w*)?$/
  }
}

function ExpressionCompletions(context) {
  let word = context.matchBefore(/\w*/)
  return {
    from: word.from,
    options: ExpressionOptions,
    validFor: /^(@\w*)?$/
  }
}

function myCompletions(context) {
  let word = context.matchBefore(/\w*/)
  if (word.from == word.to )
    return null
  return {
    from: word.from,
    options: [
      {label: "let", type: "keyword"},
      {label: "if", type: "keyword"},
      {label: "for", type: "keyword"},
      {label: "while", type: "keyword"},
      {label: "for when", type: "keyword"},
      {label: "for each", type: "keyword"},
      {label: "String", type: "type"},
      {label: "int", type: "type"},
      {label: "bool", type: "type"},
      {label: "float", type: "type"},
      {label: "String[]", type: "type"},
      {label: "int[]", type: "type"},
      {label: "bool[]", type: "type"},
      {label: "float[]", type: "type"},
      {label: "add", type: "keyword"},
      {label: "subtract", type: "keyword"},
      {label: "divide", type: "keyword"},
      {label: "multiply", type: "keyword"},
      {label: "remove", type: "keyword"},
      {label: "removeAll", type: "keyword"},
      {label: "removeAt", type: "keyword"},

      
    ]
  }
}

export const exampleCompletion = exampleLanguage.data.of({
  autocomplete: Completions
})

export function example() {
  return new LanguageSupport(exampleLanguage, [exampleCompletion])
}