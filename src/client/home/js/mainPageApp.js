import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Popover, OverlayTrigger, Button, Modal } from 'react-bootstrap';
import { Editor, EditorState, RichUtils ,convertFromHTML,ContentState,convertFromRaw,convertToRaw} from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
class MainHomePageApp extends React.Component{
    constructor(){
        super();
        this.onTextChange = this.onTextChange.bind(this);
        this.onsubmitClick = this.onsubmitClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onEditCommentChange = this.onEditCommentChange.bind(this);
        this.onSubmitEditComment = this.onSubmitEditComment.bind(this);
        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.onUnderlineClick =  this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onHeadingOneClick = this.onHeadingOneClick.bind(this);
        this.state={
          editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML('<p>My initial content.</p>')
            )
          ),
         comment:'',
         userDetails:document.getElementById('userDetails').value,
         commentsArr:[],
         showInfoModal:false,
         editComment:'',
         commentId:'',
         newComment:''
        };
    }

    componentWillMount(){
      let self=this.state;
      axios.get(`/api/getUsersComments/${this.state.userDetails}`)
      .then(response=>{
        self.commentsArr=response.data;
        this.setState(self);
      });
    }

    onTextChange(e){
    let  self=this.state;
    self.comment=e.target.value;
    this.setState(self);
    }
    onsubmitClick(e){
      e.preventDefault();
      if(this.state.comment.length<1){
        alert('comments required');
      }
      else{
        axios.post('/api/insertUsersComments',{
          comments:this.state.comment,
          userId:this.state.userDetails
        })
        .then(response=>{
          if(response.data.status==='success'){
            location.reload();
          }
        });
      }
    }
    onEditClick(e){
      e.preventDefault();
      let self =this.state;
     self.commentId=e.target.getAttribute('data-comment-id');
      axios.get(`/api/getUsersCommentById/${self.commentId}`)
      .then(response=>{
        self.editComment=response.data[0].comment;
        self.showInfoModal=true;
        this.setState(self);
      });
     
    }
    onCloseModal(){
      let self =this.state;
      self.showInfoModal=false;
      this.setState(self);
    }

    onEditCommentChange(e){
      e.preventDefault();
    let self=this.state;
    self.newComment=e.target.value;
    this.setState(self);
    }
    onSubmitEditComment(e){
      e.preventDefault();
      axios.post(`/api/editCommentsById/${this.state.commentId}`,{
        value:this.state.newComment
      })
      .then(response=>{
        if(response.data.status === "success"){
          window.location.reload();
        }
      });
    }
    onDeleteComment(e){
      e.preventDefault();
      let dataId=e.target.getAttribute('data-delcomment-id');
      axios.post(`/api/deleteCommentsById/${dataId}`)
      .then(response=>{
        if(response.data.status === "success"){
          window.location.reload();
        }
      });

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
    render(){	
        return(
        <div style={{marginTop:15}}>
         <h1>To Do List</h1>
        
         <form className="form-horizontal" style={{marginTop:10}}>
         
         <div className="col-sm-5">
         <div className="editors" style={{marginTop:15,border:'1px solid black'}}>
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
					
					/>
					
				</div>
         </div>
  
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="email">comments:</label>
    <div className="col-sm-5">
      <textarea type="text" onChange={this.onTextChange} className="form-control" name="comments" id="comments"></textarea>
    </div>
  </div>
  
  
  <div className="form-group"> 
    <div className="col-sm-offset-2 col-sm-10">
      <button className="btn btn-default" onClick={this.onsubmitClick}>Submit</button>
    </div>
  </div>
</form>
{
  this.state.commentsArr.length<1?
  (
    <div className="text-center">
    <h3>No comments Yet</h3>
    </div>
  )
  :(
    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Comment</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {
      this.state.commentsArr.map((item,i)=>(
        <tr key={i}>
      <th scope="row">{i+1}</th>
      <td>{item.comment}</td>
      <td>
        <div className="row">
        <div className="col-sm-4">
        <button className="btn btn-primary" onClick={this.onEditClick} data-comment-id={item.id}>Edit</button>
        </div>
        <div className="col-sm-4">
        <button className="btn btn-danger" onClick={this.onDeleteComment} data-delcomment-id={item.id}>Delete</button>
        </div>
        </div>
        
      </td>
    </tr>
      ))
    }
   
  </tbody>
</table>
  )
}
 <Modal show={this.state.showInfoModal} onHide={this.onCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comment Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form className="form-horizontal" style={{marginTop:10}}>
  
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="comments">comments:</label>
    <div className="col-sm-5">
      <textarea type="text" defaultValue={this.state.editComment} onChange={this.onEditCommentChange} className="form-control" name="editComments" id="editComments"></textarea>
    </div>
  </div>
  <div className="form-group"> 
    <div className="col-sm-offset-2 col-sm-10">
      <button className="btn btn-primary" onClick={this.onSubmitEditComment}>Save</button>
    </div>
  </div>
</form>
                    </Modal.Body>
                </Modal> 
        </div>
        );
    }
}
ReactDOM.render(<MainHomePageApp/>,document.getElementById('root'));