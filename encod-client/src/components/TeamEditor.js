import React from 'react'
import {RouteComponentProps} from "react-router-dom";
import TextEditor from './TextEditor';


function TeamEditor(props) {
    let id = props.match.params.id;
    return (
        <div>
        <TextEditor groupId={id}/>
            
        </div>
    )
}

export default TeamEditor
