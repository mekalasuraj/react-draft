import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils ,convertFromHTML,ContentState,convertFromRaw,convertToRaw} from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import  axios from 'axios';
import Parser from 'html-react-parser';
import { Popover, OverlayTrigger, Button, Modal } from 'react-bootstrap';
import NotesModal from './notesModal';
class NotesPageApp extends React.Component{
    constructor(){
        super();
        this.onEditNotes = this.onEditNotes.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.onUnderlineClick =  this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onHeadingOneClick = this.onHeadingOneClick.bind(this);
        this.onLogoutCLick = this.onLogoutCLick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onNotesDelete = this.onNotesDelete.bind(this);
        this.state={
          editorState:EditorState.createEmpty(),
         comment:'',
         userDetails:document.getElementById('userDetails').value,
         individualUserNotes:'',
         userNotes:[],
         showInfoModal:false,
         notesId:'',
         individualNotes:{} 
        };
    }
   
    componentWillMount(){
        let self=this.state;
        axios.get(`/api/getUsersNotes/${this.state.userDetails}`)
        .then(response=>{
           self.userNotes=response.data;
           this.setState(self);
        });
    }
    onEditNotes(e){
        e.preventDefault();
        let self =this.state;
        self.notesId=e.target.getAttribute('data-notes-id');
      axios.get(`/api/getUsersNotesById/${self.notesId}`)
      .then(response=>{
          self.individualNotes=response.data[0];
          self.showInfoModal=true;
          this.setState(self);
      });
    }

    onCloseModal(){
      let self =this.state;
      self.showInfoModal=false;
      this.setState(self);
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
    onLogoutCLick(e){
        e.preventDefault();
        window.location='/logout';
    }
    onSubmitClick(e){
        e.preventDefault();
        let self=this.state;
        axios.post('/api/insertUsersNotes',{
          notes:stateToHTML(this.state.editorState.getCurrentContent()),
          userId:this.state.userDetails
        })
        .then(response=>{
           if(response.data.status === 'success'){
               location.reload();
           }
        });
        this.setState(self);
    
    }
    onNotesDelete(e){
        e.preventDefault();
        let dataId=e.target.getAttribute('data-delnotes-id');
        axios.post(`/api/deleteNotesById/${dataId}`)
        .then(response=>{
            if(response.data.status === "success"){
                location.reload();
            }
        });
    }

    render(){	
        return(
        <div style={{marginTop:15}}>
        <div className="row">
        <div className="col-sm-12">
        <a style={{float:'right',cursor:'pointer',paddingRight:60}} onClick={this.onLogoutCLick}>Logout</a>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-5" >
			<h3>Add Notes</h3>
			<div className="editorContainer" style={{border:'1px solid green',padding:16,margin:16}}>
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
			<button className="btn btn-primary" onClick={this.onHeadingOneClick}><b>Code</b></button>
			</div>
			</div>
			
			<div className="editors" style={{border:'1px solid #adadad',padding:16,margin:16}}>
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
					
					/>
					
				</div>
				<button className="btn btn-primary" onClick={this.onSubmitClick}>Submit</button>
			</div>
			</div>
        </div>
        <div className="row" style={{marginTop:20}}>
        {
            this.state.userNotes.map((item,i)=>(
                <div className="col-sm-3 text-center"  key={i} >
                <div style={{boxShadow:'0px 0px 0px 1Px #ddd',padding:'20px 0'}}>
                <div className="col-sm-12" >
                <a style={{cursor:'pointer'}}  >{Parser(`${item.notes}`)}</a>
                </div>
                <div style={{borderBottom:'1px solid #adadad'}}></div>
                <div className="row" style={{marginTop:10}}>
                <div className="col-sm-6">
                <button className="btn btn-primary" onClick={this.onEditNotes} data-notes-id={item.id}>Edit</button>
                </div>
                <div className="col-sm-6">
                <button className="btn btn-danger" onClick={this.onNotesDelete} data-delnotes-id={item.id}>Delete</button>
                </div>
                </div>
                </div>
                </div>
            ))
        }
        </div>
        <Modal dialogClassName="my-modal" show={this.state.showInfoModal} onHide={this.onCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <NotesModal individualUser={this.state.individualNotes} notesId={this.state.notesId}/>
                    </Modal.Body>
                </Modal>
        </div>
        );
    }
}

ReactDOM.render(<NotesPageApp/>,document.getElementById('root'));