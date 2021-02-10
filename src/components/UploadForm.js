import React,{Component} from 'react'
import {Client, PrivateKey} from '@hiveio/dhive'
import IpfsCore from 'ipfs-core'
export class UploadForm extends Component{
    
    
    displayContents = (str)=>{
        document.getElementById("statusBox").innerHTML = str
        
    }

    hiveStuff = async(json)=>{
        if(!this.props.state.client)this.props.state.client = new Client(["https://api.hive.blog", "https://api.hivekings.com", "https://anyx.io", "https://api.openhive.network"]);
        var key = PrivateKey.fromString(this.props.state.authPass);
        this.props.state.client.broadcast
          .json(
            {
              id: "dope",
              json: JSON.stringify(json),
              required_auths: [],
              required_posting_auths: [this.props.state.authUser]
            },
            key
          )
          .then(
            function(result) {
              console.log("Included in block: " + result.block_num);
            },
            function(error) {
              console.error(error);
            }
          );
    }

    ipfsStuff = async (json) => {
      if(!this.props.state.ipfs)this.props.state.ipfs = await IpfsCore.create()
      const { cid } = await this.props.state.ipfs.add(json.contents,{/*onlyHash:true*/})
      json.cid = ""+cid
      delete json["contents"]
      this.hiveStuff(json)
      console.log("All done!")
      setTimeout(()=>{
        document.getElementById("file").style.display = "block"
        this.displayContents("<a href='https://gateway.ipfs.io/ipfs/"+json.cid+"?"+json.mime+"' target='_blank'>https://gateway.ipfs.io/ipfs/"+json.cid+"?"+json.mime+"</a>")
      },6000)
  }

    readSingleFile = (file)=> {
      if (!file) {
        return;
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        var contents = e.target.result
        let json = {}
        json.type = "ipfs"
        json.name = file.name
        json.mime = file.type
        json.size = file.size
        json.contents = contents
        this.ipfsStuff(json)
      }
      reader.readAsArrayBuffer(file)
    }

    fileInfo= () =>{
      let files = document.getElementById('file').files
      if(files.length > 0){
        document.getElementById("file").style.display = "none"
        this.displayContents("File is uploading. Please wait ...")
      }
      for(var i= 0;i < files.length;i++){
        var fileName = files[i].name;
        var fileSize = files[i].size;
        var fileType = files[i].type;
        var fileModifiedDate = files[i].path;
        var file_info = fileName+"\n"+fileSize+"\n"+fileType+"\n"+fileModifiedDate;
        console.log(file_info);
        this.readSingleFile(document.getElementById('file').files[0])
        
      }
    }

    isLoggedIn = (state) =>{
      return (state.authUser != null && state.authUser.length >0  && state.authPass != null && state.authPass.length > 0)
    }
    
    render(){
        this.display = this.isLoggedIn(this.props.state)?"block":"none";
        this.promptStyle = {display :this.display}
        return(
            <input type="file" id="file" onChange={this.fileInfo} className="uploadForm" style={this.promptStyle}/>
        )
    }
}