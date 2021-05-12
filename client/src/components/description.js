import React, { Component } from 'react'
export default class Profile extends Component {
  componentDidMount() {
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
     fetch('http://localhost:3000/learning/specificLesson/'+this.props.match.params.id, settings)
      .then(response => response.json())
      .then(json => {
        var video = document.getElementById("video");
        
       video.src =  "data:video/mp4;base64," + json.lesson[0].uploadedfile;
       document.getElementById('content').innerHTML=json.lesson[0].contentsummary
        this.setState({
          lessons: json.lesson
        })

     
      })
      .catch(e => {
        return e
      });

    
  }
  render() {
   
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12"
        style={{ paddingLeft: '30px', paddingTop: '10px' }}
      >
        <h4>Learning</h4>
        <hr />
        <h4>Lesson1</h4>
        <form className="form">
          <div className="form-group">
          <video width="100%" height="345" autoPlay={true} controls   id="video"></video>
  </div>
          <div className="form-group" >
          <label>Written Content</label><br/>
        <p id="content">

        </p>
          </div>
        </form>
      </div>
    )
  }
}
