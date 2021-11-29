import React,{useState, useEffect} from "react";
import io from "socket.io-client";
//import CodeMirror from 'react-codemirror'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/lib/codemirror.css'
import "./TextEditor.css"
import Select from "./Select";
import { javascript } from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";


const socket = io.connect("https://encod-app.herokuapp.com/")

function TextEditor(props) {

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
       
    
        <CodeMirror
        
        value={code}
        height="auto"
        extensions={[props.codeSyntax.value]}
       
        onChange={(value, viewUpdate) => {
            sendData(value);
        }}
        />
     

        );
    }
    
export default TextEditor
    