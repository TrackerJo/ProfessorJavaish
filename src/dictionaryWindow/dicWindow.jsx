import { useEffect, useState, useRef } from 'react'
import './dicWindow.css'
import plusIcon from '../assets/add_icon.png';
import minusIcon from '../assets/minus_icon.png';
import DicTopBar from './topbar';
import DicSectionTitle from './dicSectionTitle';

function DicWindow({closeDicWindow}){
 
   
    
    return (
        <div className='DicColumn'>
            <DicTopBar closeDicWindow={closeDicWindow}/>
            <div className='DicWindow'>
                <div className='DicInfo'>
                    <br />
                    <p>Placeholder data is wrapped in colons, ex. :name: </p>
                    <DicSectionTitle connectedSection='DicVariablesSection' sectionTitle='Variables'/>
                    <div className='DicSectionText DicSectionClosed' id='DicVariablesSection'>
                        <p>Variables are used to store data in a program. They can be used to store any of the following data types:</p>
                        <label>Integer - any whole number - <code>int</code></label>
                        <br />
                        <label>Float - any decimal number - <code>float</code></label>
                        <br />
                        <label>String - any text - <code>String</code></label>
                        <br />
                        <label>Boolean - true or false - <code>bool</code></label>
                        <br />
                        <label>String List - List of Strings - <code>String[]</code></label>
                        <br />
                        <label>Integer List - List of Integers - <code>int[]</code></label>
                        <br />
                        <label>Float List - List of Floats - <code>float[]</code></label>
                        <br />
                        <label>Boolean List - List of Booleans - <code>bool[]</code></label>
                        <br />
                        <h3>Variable Declaring</h3>
                        <label><code>let :type: :varName: = :expression:.</code></label>

                        <h3>Variable Assigning</h3>
                        <label><code>:varName: = :expression:.</code></label>

                        <h3>Variable Mutating</h3>
                        <label><code>add :expression: to :varName:.</code> - (Also used to add value to list)</label>
                        <br />
                        <label><code>subtract :expression: from :varName:.</code></label>
                        <br />
                        <label><code>multiply :varName: by :expression:.</code></label>
                        <br />
                        <label><code>divide :varName: by :expression:.</code></label>

                        <h3>List Specific Mutating</h3>
                        <label><code>remove :expression: from :varName:.</code> - Removes one value from list</label>
                        <br />
                        <label><code>removeAll :expression: from :varName:.</code> - Removes all values from list</label>
                        <br />
                        <label><code>removeAt :expression: from :varName:.</code> - Removes value at index from list</label>

                        <h3>List Accessing</h3>
                        <label><code>:listName: sub :index:</code> - Accesses element in list at index</label>
                        <br />
                        <label><code>length of :listName:</code> - Returns length of list</label>
                    </div>
                    <br />
                    <DicSectionTitle connectedSection='DicFunctionsSection' sectionTitle='Functions'/>
                    <div className='DicSectionText DicSectionClosed' id='DicFunctionsSection'>
                        <p>Functions are used to store a block of code that can be called later. Functions can take in parameters and return a value.</p>
                        <h3>Function Declaring</h3>
                        <label><code>function :funcName:(:type: :argName:, ...){`{`}</code></label>
                        <br />
                        <label>&emsp;<code>:code:</code></label>
                        <br />
                        <label><code>{`}`}</code></label>

                        <h3>Function Calling</h3>
                        <label><code>:funcName:(:expression:, ...).</code></label>

                        <h3>Function Returning</h3>
                        <label><code>return :expression:.</code> - Exits the function with a return value</label>
                        <br />
                        <label><code>return.</code> - Exits the function with no return value</label>

                        <h3>Built-in Functions</h3>
                        <label><code>print(:expression:).</code> - Prints the expression to the console</label>
                        <br />
                        <label><code>showMessageDialog(:expression:).</code> - Shows message box to user</label>
                        <br />
                        <label><code>showInputDialog(:expression:).</code> - Shows input box to user and returns the inputted value as a String</label>
                        <br />
                        <label><code>toString(:expression:).</code> - Converts other value to String</label>
                        <br />
                        <label><code>toInt(:expression:).</code> - Converts other value to Integer</label>
                        <br />
                        <label><code>toFloat(:expression:).</code> - Converts other value to Float</label>
                        <br />
                        <label><code>toBool(:stringExpression:).</code> - Converts String to Boolean</label>


                    </div>
                    <br />
                    <DicSectionTitle connectedSection='DicOperatorsSection' sectionTitle='Operators'/>
                    <div className='DicSectionText DicSectionClosed' id='DicOperatorsSection'>
                        <p>Operators are used to perform operations on variables and values.</p>
                        <h3>Math Operators</h3>
                        <label><code>+</code> or <code>plus</code></label>
                        <br />
                        <label><code>-</code> or <code>minus</code></label>
                        <br />
                        <label><code>*</code> or <code>times</code></label>
                        <br />
                        <label><code>/</code> or <code>divide</code></label>
                        <br />

                        <h3>Comparison Operators</h3>
                        <label><code>==</code> or <code>equals</code></label>
                        <br />
                        <label><code>!=</code> or <code>not equals</code></label>
                        <br />
                        <label><code>&gt;</code> or <code>greater than</code></label>
                        <br />
                        <label><code>&lt;</code> or <code>less than</code></label>
                        <br />
                        <label><code>&gt;=</code> or <code>greater than or equal to</code></label>
                        <br />
                        <label><code>&lt;=</code> or <code>less than or equal to</code></label>
                        <br />
                        <label><code>&&</code> or <code>and</code></label>
                        <br />
                        <label><code>||</code> or <code>or</code></label>


                    </div>
                    <br />
                    <DicSectionTitle connectedSection='DicExpressionsSection' sectionTitle='Expressions'/>
                    <div className='DicSectionText DicSectionClosed' id='DicExpressionsSection'>
                        <p>Expressions can consist of values, variables, or operators and evaluate to a data type</p>
                        <h3>Constants</h3>
                        <label><code>:integer:</code></label>
                        <br />
                        <label><code>:float:</code></label>
                        <br />
                        <label><code>":string:"</code></label>
                        <br />
                        <label><code>:bool:</code></label>

                        <h3>List Constant</h3>
                        <p>Note that if a list constant is used in an expression, it must be the only element in the expression</p>
                        <label><code>[:expression:, ...]</code></label>
                    </div>
                </div>
                    
            
                
                
                
            </div>
        </div>
    )
}

export default DicWindow