import React,{Component} from 'react'

export class Logout extends Component{

    componentDidMount() {
        this.setState({});
    }

    logout = () =>{
        document.getElementById("logout").style.visibility = "invisible"
        localStorage.setItem("postingKey","")
        localStorage.setItem("username","")
        this.props.state.authUser = ""
        this.props.state.authPass = ""
        this.props.redraw({authUser:"",authPass:""})
    }

    isRemembered(){
        let pk = localStorage.getItem("postingKey")
        let user = localStorage.getItem("username")
        return (pk != null && pk.length > 0 && user !=null && user.length > 0)
    }
    
    render(){
        this.display = this.isRemembered()?"block":"none";
        this.promptStyle = {display :this.display}
        return(
            <button style={this.promptStyle} onClick={this.logout} id="logout">Logout</button>
        )
    }
}