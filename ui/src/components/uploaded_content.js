import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './layout/Spinner';

export default class Profile extends Component {

  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state={
      lessons: [],
      loading: true,
    }
  }
  componentDidMount() {
    const settings = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

     fetch('http://localhost:3000/learning/allLessons', settings)
      .then(response => response.json())
      .then(json => {
        console.log("res", json)
        this.setState({
          lessons: json.lessons,
          loading:false
        });
      
      })
      .catch(e => {
        return e
      });
  
  }
  //  Delete lesson
  deleteLesson= (lesson_id)=>{
    const settings = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch('http://localhost:3000/learning/specificLesson/'+lesson_id, settings)
      .then(response => response.json())
      .then(json => {
        if(json.message === "Deleted"){
          alert("Lesson deleted!")
          let updatedData=this.state.lessons.filter(function(i){return i._id !== lesson_id})
          this.setState({lessons: updatedData})
        }
        let requiredData = JSON.stringify({
          "username": localStorage.getItem("_un"),
          "eventtype": 'Delete Lesson',
          "component": 'View All Lesson',
          "description":"User deleted specific lesson"
        });
        const setting = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: requiredData
        };
    
         fetch('http://localhost:3000/user/adduseractivity', setting)
          .then(response => response.json())
          .then(json => {
            console.log("res", json)
           
          })
          .catch(e => {  return e   });
      })
      .catch(e => {
        return e
      });
  }

  render() {
    const result =this.state.lessons.length > 0 ? this.state.lessons.map((lesson)=>{
      return( 
       <form key={lesson._id}>
        <h4>{lesson.title}</h4>
      <div className="form-group">
        <label><b>Duration</b></label> : 1hour 30 minutes
      </div>
      <div className="form-group">
        <label> <b>Content Summary</b></label>
         <p>{lesson.contentsummary}</p>
      </div>
      <br/>
      <div className="form-group" style={{ display: 'flex',marginBottom:'10px' }}>
        <Link to={{pathname:`/description/${lesson._id}` ,  query:""}}
          className="btn btn-primary btn-block"
          style={{ width: '10%', float: 'left', marginRight: '10px' }}
        >
          Preview
        </Link>
        {/* <Link to={{pathname:`/description/${lesson._id}` ,  query:""}}
         */}
        <button onClick={()=>{this.deleteLesson(lesson._id)}}
          className="btn btn-primary btn-block"
          style={{
            width: '10%',
            float: 'left',
            marginRight: '10px',
            marginTop: '0px',
          }} 
        >
          Delete
        </button>
      </div>
     
    </form>
    )
 
    }) :  'No lessons uploaded yet';
    
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12"
        style={{ paddingLeft: '30px', paddingTop: '10px' }}
      >
       {
      this.state.loading && <Spinner  />
       } 

        <h4>Learning</h4>
        <hr />
       { this.state.lessons &&
       <>
        <div>
          {result}
        </div>

        <hr />
      <Link
        to={'/upload-content'}
        className="btn btn-primary btn-block"
        style={{ width: '16%',  float:'right' }}
      >
        Upload Content
      </Link>
      </>
  }
      </div>
    )
  }
}
