//please provide a table reviewing the following
//admin - view all prospects
//student - view all of their generated prospects

import React, { Component } from 'react'
export default class QualifiedProspects extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props)
    // Set initial state
    this.state = {
    
      allQualifiers:[]
    }
  }
  componentDidMount() {
    console.log("this.props", this.props)
    // get  qualifiers by role
  const settings3 = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
   fetch('/qualifier/allqualifier', settings3)
    .then(response => response.json())
    .then(json => {
      // this.setState({
      //   allQualifiers: json.qualifiers
      // })
      if(localStorage.getItem('role')=== "user" || localStorage.getItem('role')=== "User"){
        var filtered=  json.qualifiers.filter(function(e){ return e.user === localStorage.getItem('_un') })
          this.setState({
              allQualifiers: filtered
          })
        }else{
        this.setState({
          allQualifiers: json.qualifiers
        })
        }
     }).catch(e => {  return e   });
  }
  render() {
   // if (localStorage.getItem("loggedin") !== "true"){
     // return <Redirect to={"/"} />;
    //}
    let qualifiersData=  this.state.allQualifiers.length > 0 ? this.state.allQualifiers.map((data => {
      return(
        <div className="form-group" key={data._id}>
        <table className="qualifierTable">
        <tr>
            <th>Prospect</th>
            <th>Result</th>
            <th>Prospect</th>
            <th>Result</th>
           </tr>
          <tr>
          <td className="th">School Type</td> <td>{data.typeschool}</td>
          <td className="th">GCSE Result</td><td>{data.gcseresult}</td>
          </tr>
          <tr>
          <td className="th">Governed</td> <td>{data.schoolgoverned}</td>
          <td className="th">School Size</td> <td>{data.schoolsize}</td>
        </tr>
        <tr>
          <td className="th">Core Subjects Stat</td> <td>{data.coresubjectstatistics}</td>
          <td className="th">Additional Notes</td> <td>{data.notesaditionalinfo}</td>
        </tr>
        <tr>
          <td className="th">Media Address</td> <td>{data.publishedmediaaddresses}</td>
          <td className="th">ofsted Report</td> <td>{data.ofstedreport}</td>
        </tr>
        <tr>
          <td className="th">Contact Name</td> <td>{data.contactname}</td>
          <td className="th">Job Role</td> <td>{data.jobrole}</td>
        </tr>
        <tr>
          <td className="th">Ph Extension</td> <td>{data.phoneextension}</td>
          <td className="th">Ph #</td> <td>{data.phonenumber}</td>
        </tr>
        <tr>
          <td className="th">Email Type</td> <td>{data.emailtype}</td>
          <td className="th">Email</td> <td>{data.email}</td>
        </tr>
        <tr>
          <td className="th">School Name</td> <td>{data.schoolname}</td>
          <td className="th">School Address</td> <td>{data.schooladdress}</td>
        </tr>
        <tr>
          <td className="th">County</td> <td>{data.country}</td>
          <td className="th">Town/City</td> <td>{data.townorcity}</td>
        </tr>
        <tr>
          <td className="th">School Website</td> <td>{data.schoolwebsite}</td>
          <th>Caller</th> <td>{data.user}</td>
        </tr>
        </table>
        <hr/>

        </div>
      )
    })):'No qualifier found!';
    return (
      <>
        <div
          className="col-lg-12 col-md-12 col-sm-12"
          style={{ paddingLeft: '30px' }}>
             <h2 className="my-2">Table of Qualified Prospects</h2>
          <hr/>
  
          <div  style={{  textAlign: 'center' }}>
        <div className="form-group" >
        {qualifiersData}
        </div>
          </div>
        </div>
      </>
    )
  }
}
