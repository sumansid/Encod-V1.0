import React,{useState, useEffect} from "react";
import io from "socket.io-client";
import CodeMirror from '@uiw/react-codemirror';

const socket = io.connect("http://localhost:4000/")

function TextEditor(props) {
    const client_group_id = props.groupId;
    
    const [code, setCode] = useState("start")
    
    useEffect(() => {
        socket.on(`message-${client_group_id}`, handleCodeArea)
    })
    
    function handleCodeArea(newCode){
        
        console.log("receiving from the server ", newCode)
        console.log("receiving from the server ", typeof(newCode))
        setCode(newCode)
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
      height="200px"
      onChange={(value, viewUpdate) => {
        sendData(value);
      }}
    />
        </div>
        );
    }
    
export default TextEditor
    