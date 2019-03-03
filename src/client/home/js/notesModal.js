import React from "react";
//Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw
import { Editor, EditorState, RichUtils ,convertFromHTML,ContentState,convertFromRaw,convertToRaw} from "draft-js";

import {stateToHTML} from 'draft-js-export-html';
import axios from "axios";


class notesModal extends React.Component {
	constructor(props) {
		super(props);
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.onUnderlineClick =  this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onHeadingOneClick = this.onHeadingOneClick.bind(this);
        this.onsubmitEditValue = this.onsubmitEditValue.bind(this);
		this.state = {
            modalIndividualUser:this.props.individualUser,
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML(this.props.individualUser.notes)
                )
              )
		};
	}

	onChange(editorState){
        this.setState({
          editorState
        });
      }
      handleKeyCommand(command){
        const newState = RichUtils.handleKeyCommand(
          this.state.editorState,
          command
        );
        if (newState) {
          this.onChange(newState);
          return "handled";
        }
        return "not-handled";
      }
      onUnderlineClick(){
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
      }
    
      onBoldClick(){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
      }
    
      onItalicClick(){
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
      }
      onHeadingOneClick(){
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, "CODE")
        );
      }
      onsubmitEditValue(e){
          e.preventDefault();
          axios.post(`/api/editNotesById/${this.props.notesId}`,{
              value:stateToHTML(this.state.editorState.getCurrentContent())
              })
              .then(response=>{
                  if(response.data.status==='success'){
                      location.reload();
                  }
            });
          
      }
	render() {
        //console.log(stateToHTML(this.state.editorState.getCurrentContent()))
		return (
			<div>
                <div className="row" style={{paddingLeft:10}}>
			<div>
			<button className="btn btn-primary" onClick={this.onUnderlineClick}>U</button>
			</div>
			<div style={{paddingLeft:10,paddingRight:10}}>
			<button className="btn btn-primary" onClick={this.onBoldClick}><b>B</b></button>
			</div>
			<div>
			<button className="btn btn-primary" onClick={this.onItalicClick}><em>I</em></button>
			</div>
            <div style={{paddingLeft:10}}>
			<button className="btn btn-primary" onClick={this.onHeadingOneClick}><em>Code</em></button>
			</div>
			</div>
			<div className="editors" style={{border:'1px solid #adadad',padding:16,margin:16}}>
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
                    />
				</div>
                <button className="btn btn-primary" onClick={this.onsubmitEditValue}>Save</button>
			</div>
		);
	}
}

export default notesModal;