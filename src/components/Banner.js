import React,{Component} from 'react'
import Thumbnail from "../images/vertical.svg"

export class Banner extends Component{
    render(){
        return(
            <img id="banner" src={Thumbnail} alt="Powered by HIVE" width="195px" height="180px"></img>
        )
    }
}