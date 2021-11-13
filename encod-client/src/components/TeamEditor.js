import React from 'react'
import {RouteComponentProps} from "react-router-dom";
import TextEditor from './TextEditor';
import Header from './Header';


function TeamEditor(props) {
    let id = props.match.params.id;
    return (
        <div>
        <Header/>
        <TextEditor groupId={id}/> 
        </div>
    )
}

export default TeamEditor
