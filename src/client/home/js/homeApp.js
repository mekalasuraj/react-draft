import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
class HomeApp extends React.Component{
    constructor(){
        super();
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onSignupCLick = this.onSignupCLick.bind(this);
        this.onLoginSubmitClick = this.onLoginSubmitClick.bind(this);
        this.onLoginEmailChange = this.onLoginEmailChange.bind(this);
        this.onLoginPasswordChange = this.onLoginPasswordChange.bind(this);
        this.state={
          userName:'',
          firstName:'',
          lastName:'',
          password:'',
          isLogin:true,
          isSignUp:false,
          loginEmail:'',
          loginPassword:''
        };
    }
    componentWillMount(){
      let self=this.state;
        axios.get('/api/getUserDetails')
        .then(response=>{
          self.dataArr=response.data;
           this.setState(self);
        });
    }	
    onUserNameChange(e){
      let self=this.state;
      self.userName=e.target.value;
      this.setState(self);
    }

    onFirstNameChange(e){
      let self=this.state;
      self.firstName=e.target.value;
      this.setState(self);
    }

    onLastNameChange(e){
      
      let self=this.state;
      self.lastName=e.target.value;
      this.setState(self);
    }
    onPasswordChange(e){
      let self=this.state;
      self.password=e.target.value;
      this.setState(self);
    }
    onSubmitClick(e){
      e.preventDefault();
      axios.post('/api/insertUsers',{
        userName:this.state.userName,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        password:this.state.password
      })
      .then(response=>{
       window.location='/';
      });
    }
    onLoginClick(e){
      let self=this.state;
      self.isLogin=true;
      self.isSignUp=false;
      this.setState(self);
    }
    onSignupCLick(e){
      let self=this.state;
      self.isLogin=false;
      self.isSignUp=true;
      this.setState(self);
    }
    onLoginEmailChange(e){
      let self=this.state;
      self.loginEmail=e.target.value;
      this.setState(self);
    }
    onLoginPasswordChange(e){
      let self=this.state;
      self.loginPassword=e.target.value;
      this.setState(self);
    }
    onLoginSubmitClick(e){
      e.preventDefault();
      axios.post('/login',{
        email:this.state.loginEmail,
        password:this.state.loginPassword
      })
      .then(response=>{
        // console.log(response);
        if(response.data.status === 'success'){
          window.location="/notesPage";
        }
      });
    }

    render(){
		
        return(
        <div style={{marginTop:15}}>
          <div className="row text-center">
          <div className="col-sm-10" >
          <a href="#" onClick={this.onLoginClick}>Login</a>/<a href="#" onClick={this.onSignupCLick}>signUp</a>
          </div> 
          </div>
          {
            this.state.isLogin ?
            (
              <form className="form-horizontal" style={{marginTop:10}}>
  
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
    <div className="col-sm-5">
      <input type="text" className="form-control" onChange={this.onLoginEmailChange}  name="userName" id="userName" placeholder="Enter Email"/>
    </div>
  </div>
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
    <div className="col-sm-5"> 
      <input type="password" className="form-control" onChange={this.onLoginPasswordChange}  name="password" id="pwd" placeholder="Enter password"/>
    </div>
  </div>
  
  <div className="form-group"> 
    <div className="col-sm-offset-2 col-sm-10">
      <button className="btn btn-success" onClick={this.onLoginSubmitClick} >Login</button>
    </div>
  </div>
</form>
            )
            :(
              <form className="form-horizontal" style={{marginTop:10}}>
  
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="email">firstName:</label>
    <div className="col-sm-5">
      <input type="text" className="form-control" onChange={this.onFirstNameChange} name="firstName" id="firstName" placeholder="Enter firstName"/>
    </div>
  </div>
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="email">lastName:</label>
    <div className="col-sm-5">
      <input type="text" className="form-control" onChange={this.onLastNameChange} name="lastName" id="lastName" placeholder="Enter lastName"/>
    </div>
  </div>
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
    <div className="col-sm-5">
      <input type="text" className="form-control" onChange={this.onUserNameChange} name="userName" id="userName" placeholder="Enter Email"/>
    </div>
  </div>
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
    <div className="col-sm-5"> 
      <input type="password" className="form-control" onChange={this.onPasswordChange} name="password" id="pwd" placeholder="Enter password"/>
    </div>
  </div>
  
  <div className="form-group"> 
    <div className="col-sm-offset-2 col-sm-10">
      <button className="btn btn-success" onClick={this.onSubmitClick}>Submit</button>
    </div>
  </div>
</form>
            )
          }
        </div>
        );
    }
}
ReactDOM.render(<HomeApp/>,document.getElementById('root'));