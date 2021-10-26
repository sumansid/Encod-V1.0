import React,{useState, useEffect} from "react";
import io from "socket.io-client";

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
        var res = value.target.value
        
        socket.emit("message", {value : res, groupId : client_group_id})
        setCode(res)
    }
    return (
        <div className="App">
        <h1> Enter code</h1>
        
        <textarea onChange={sendData} value={code}/>
        </div>
        );
    }
    
export default TextEditor
    