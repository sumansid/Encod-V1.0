import React,{useState, useEffect} from "react";
import {RouteComponentProps} from "react-router-dom";
import TextEditor from './TextEditor';
import Header from './Header';
import Select from './Select';
import { javascript } from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";


function TeamEditor(props) {

    const extensions = [
    {
      id: "1",
      label: "Javascript",
      value: javascript(),
      ext : "js"
    },
    {
      id: "2",
      label: "Python",
      value: python(),
      ext:"py"
    }

  ];

  const temp = extensions.find((ext) => ext.value);

  const [currentExtension, setCurrentExtension] = useState(temp);
    let id = props.match.params.id;
    return (
        <div>
        <Header/>
        <div className="p-1"></div>

        <div className="mx-auto max-w-xs p-2">
        <Select
          //className="flex-1"
          options={extensions}
          selectedOption={currentExtension}
          handelChange={(event) => {
            setCurrentExtension(event);
          }}
        />
        </div>
        <TextEditor groupId={id} codeSyntax = {currentExtension}/> 
        </div>
    )
}

export default TeamEditor
