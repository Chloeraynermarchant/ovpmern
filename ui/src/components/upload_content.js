import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from "react-router-dom";

export default class Profile extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state={
      title: "",
      author: "",
      references:"",
      summary:"",
      file:""
    }
  }


  handleTitleOnChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleAuthorOnChange(event) {
    this.setState({
      author: event.target.value
    })
  }
  handleReferenceOnChange(event) {
    this.setState({
      references: event.target.value
    })
  }
  handleSummaryOnChange(event) {
    this.setState({
      summary: event.target.value
    })
  }
   getBase64(f) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
 
  handleFileOnChange(event) {

    var ext = event.target.value.split('.').pop();
    if(ext !== "mp4" ){
      document.getElementById('files').value=null
      alert("Please upload mp4 file")
      return  0;
    } 

    this.setState({
      file: event.target.value
    })
    var fs= document.querySelector('#files').files[0];
    this.getBase64(fs).then(
      data => {
        this.setState({
          file: data
        })
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault()

    let requiredData = JSON.stringify({
      "title": this.state.title,
      "author": this.state.author,
      "references": this.state.references,
      "contentsummary": this.state.summary,
      "uploadedfile": this.state.file,
    })
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requiredData
    };

    fetch('http://localhost:3000/learning/newlesson', settings)
      .then(response => response.json())
      .then(json => {
        console.log("res", json)
        alert("Successfully uploaded.")
      return <Redirect to={"/uploaded-content"} />; 
   })
      .catch(e => {
        return e
      });
  }
  render() {
    return (
      <div  className="col-lg-12 col-md-12 col-sm-12"  style={{paddingLeft:"30px"}} >
          <form className='form'  onSubmit={(e) => {e.preventDefault(); this.handleSubmit(e) }}>
            <h4>Learning</h4>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" required placeholder="Title"
              onChange={(e) => { this.handleTitleOnChange(e) }}
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text"className="form-control" required placeholder="Author"
             onChange={(e) => { this.handleAuthorOnChange(e) }}
             />
            </div>
            <div className="form-group">
              <label>References</label>
              <input type="text"className="form-control" required placeholder="References"
              onChange={(e) => { this.handleReferenceOnChange(e) }}
              />
            </div>
            <div className="form-group">
              <label>Content Summary</label>
              <input type="text"className="form-control" required placeholder="Content Summary"
             onChange={(e) => { this.handleSummaryOnChange(e) }}
             />
            </div>
           <div className="form-group">
              <label>Upload File</label>
              <input type="file" id="files" className="form-control" required placeholder="Upload File"
             onChange={(e) => { this.handleFileOnChange(e) }}
             />
            </div>
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <Link to={'/uploaded-content'} className="btn btn-primary btn-block" style={{width:'17%', float:'right', marginRight: '10px'}} >Uploaded Content</Link>
          </form>
      </div>
    )
  }
}
