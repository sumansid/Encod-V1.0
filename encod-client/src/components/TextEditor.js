import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CodeMirror from "codemirror";
//import CodeMirror from '@uiw/react-codemirror';
import "codemirror/lib/codemirror.css";
import "./TextEditor.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/keymap/sublime";

//const socket = io.connect("https://encod-app.herokuapp.com/")

function TextEditor(props) {
  const [editor, setEditor] = useState();

  const [code, setCode] = useState("/* Enter your code here  */ ");

  function downloadAsFile() {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "codeFile." + props.codeSyntax.ext;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const client_group_id = props.groupId;

  useEffect(() => {
    const e = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
      lineNumbers: true,
      keyMap: "sublime",
      height: "auto",
      mode: "javascript",
    });

    setEditor(e);
  }, []);

  useEffect(() => {
    if (editor == null) {
      return;
    }

    const s = io.connect("https://encod-app.herokuapp.com/");
    editor.on("change", (instance, changes) => {
      const { origin } = changes;
      if (origin !== "setValue") {
        var res = instance.getValue();
        s.emit("message", { value: res, groupId: client_group_id });
      }
    });

    s.on(`message-${client_group_id}`, (newCode) => {
      setCode(newCode);
      editor.setValue(newCode);
    });

    return () => {
      s.disconnect();
    };
  }, [editor]);

  useEffect(() => {
    if (editor == null) {
      return;
    }
    editor.setOption("mode", props.codeSyntax.value);
  }, [props.codeSyntax.value, editor]);

  return (
    <div>
      <button
        type="button"
        className="m-2 py-2 px-4  bg-gray-900 hover:bg-gray-600 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg "
        onClick={downloadAsFile}
      >
        Download Code
      </button>

      <textarea id="codemirror" value="// Enter code here" />
    </div>
  );
}

export default TextEditor;

/*
Server side code :

const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);
const port = process.env.PORT || 4000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

server.listen(port, function () {
  console.log("listening in port ", port);
});

io.on("connection", function (client) {
  console.log("new connection");

  client.on("message", broadcastData);
  client.on("createNewRoom", createNewRoom);
  client.on("joinExistingRoom", joinExistingRoom);

  function broadcastData(data) {
    console.log("data from the client ", data);
    client.broadcast.emit(`message-${data.groupId}`, data.value);
  }
});
*/
