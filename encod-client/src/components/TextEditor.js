import React,{useState, useEffect} from "react";
import io from "socket.io-client";
//import CodeMirror from 'react-codemirror'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/lib/codemirror.css'
import "./TextEditor.css"
import { javascript } from "@codemirror/lang-javascript";

const socket = io.connect("http://localhost:4000/")
console.log("process env", process.env);
console.log("env server url",process.env.SERVER_URL);

function TextEditor(props) {
    const client_group_id = props.groupId;
    
    const [code, setCode] = useState("function helloWorld(){}")
    
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
        <div className="App">
        <h1> Enter code</h1>
        
        <CodeMirror
        
        value={code}
        height={230}
        extensions={[javascript({ jsx: true })]}
       
        onChange={(value, viewUpdate) => {
            sendData(value);
        }}
        />
        </div>
        );
    }
    
export default TextEditor
    