import React,{useState, useEffect} from "react";
import io from "socket.io-client";
//import CodeMirror from 'react-codemirror'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/lib/codemirror.css'
import "./TextEditor.css"
import { javascript } from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";




const socket = io.connect("https://encod-app.herokuapp.com/")

function TextEditor(props) {


    function downloadAsFile() {
        const element = document.createElement("a");
        const file = new Blob([code], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "codeFile." + props.codeSyntax.ext;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
  }

    const client_group_id = props.groupId;

    const [code, setCode] = useState("/* Enter your code here  */ ")
    
    useEffect(() => {
        socket.on(`message-${client_group_id}`, handleCodeArea)
    })
    
    function handleCodeArea(newCode){
        
        console.log("receiving from the server ", newCode)
        console.log("receiving from the server ", typeof(newCode))
        
        setCode(newCode)
        console.log("code after setting ", code)
    }
    
    function sendData(value){
        //console.log("value from components ", value)
        //var res = value.target.value
        
        var res = value;
        socket.emit("message", {value : res, groupId : client_group_id})
        setCode(res)
    }
    return (
       
        <div>


<button type="button" className="m-2 py-2 px-4  bg-gray-900 hover:bg-gray-600 focus:ring-gray-900 focus:ring-offset-gray-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={downloadAsFile}>
    Download Code
</button>

        <CodeMirror
        
        value={code}
        height="auto"
        extensions={[props.codeSyntax.value]}
       
        onChange={(value, viewUpdate) => {
            sendData(value);
        }}
        />

        </div>
     

        );
    }
    
export default TextEditor
    