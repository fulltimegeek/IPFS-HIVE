import React,{Component} from 'react'
import {Client, PrivateKey} from '@hiveio/dhive'
import { UploadForm } from './UploadForm'
import { Logout } from './Logout'

export class LoginForm extends Component{

    componentDidMount() {
        this.setState({});
    }
    
    isLoggedIn = (state) =>{
        return (state.authUser != null && state.authUser.length >0  && state.authPass != null && state.authPass.length > 0)
    }

    login = (e)=>{
        if(!this.props.state.client)this.props.state.client = new Client(["https://api.hive.blog", "https://api.hivekings.com", "https://anyx.io", "https://api.openhive.network"]);
        document.getElementById("statusBox").innerHTML = ""
        e.preventDefault()
        let username = document.getElementById("inputAccount").value
        let password = document.getElementById("inputPassword").value
        if(username.length >= 3 && password.length > 0){
            this.props.state.client.database.getAccounts([username]).then(result =>{
                if(result.length > 0){
                    let pubWif = result[0].posting.key_auths[0][0];
                    try{
                        let key = PrivateKey.fromString(password).createPublic();
                        if(key.toString() === pubWif.toString()){
                            document.getElementById("inputPassword").value = ""
                            document.getElementById("inputAccount").value = ""
                            this.props.state.authUser = username
                            this.props.state.authPass = password
                            if(document.getElementById("rememberMeCB").checked){
                                localStorage.setItem("username",username) 
                                localStorage.setItem("postingKey",password)
                            }
                            this.setState({authUser:username,authPass:password})
                        }else{
                            document.getElementById("statusBox").innerHTML = "Authenticatin Failed"
                        }
                    }catch(e){
                        console.log(e)
                        document.getElementById("statusBox").innerHTML = "Invalid password"
                    }
                }else{
                    document.getElementById("statusBox").innerHTML = "Invalid username"
                }
                
            })
            
        }else{
            document.getElementById("statusBox").innerHTML = "Invalid username or password"
        }
    }

    redraw = (state) =>{
        this.setState(state)
    }
    
    render(){
        this.display = this.isLoggedIn(this.props.state)?"none":"block";
        this.promptStyle = {display :this.display}
        return (
        <div className="form-signin">
          <form onSubmit={this.login} style={this.promptStyle}>
              <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
              <h1 className="h3 mb-3 font-weight-normal">Login to HIVE</h1>
              <label htmlFor="inputText" className="sr-only">Account</label>
              <input type="text" id="inputAccount" className="form-control" placeholder="Account" required autoFocus/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Posting Key" required/>
              <div className="checkbox mb-3">
                  <label> 
                  <input type="checkbox" value="remember-me" id="rememberMeCB"/>
                  Remember me
                  </label>
              </div>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
          <UploadForm state={this.props.state}/>
          <Logout state={this.props.state} redraw={this.redraw}/>
        </div>
        )
    }
}