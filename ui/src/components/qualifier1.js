import React, { Component } from 'react'
// import { Redirect } from "react-router-dom";

export default class Qualifier extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props)
    // Set initial state
    this.state = {
      school_type: 'primary',
      gcse_result: '-5 to 15% below national average',
      school_governed: 'Public',
      school_size: 'Greater or equal to 650 students',

      subjects: '',
      notes: '',
      media_addresses: '',
      ofsted_reports: '',

      contact_name: '',
      job_role: 'Headteacher',
      ph_extension: '',
      ph_no: '',
      email_type: '',
      email_address: '',

      school_name: '',
      postcode: '',
      first_line_addr: '',
      second_line_addr: '',
      county: '',
      town: '',
      website: '',
      allQualifiers:[]
    }
  }
  componentDidMount() {
    // document.body.style.background = '#eee'
    // document.getElementsByClassName('auth-inner')[0].style.width = '50%'
    // document.getElementsByClassName('auth-inner')[0].style.borderRadius = '0%'
    // document.getElementsByClassName('auth-inner')[0].style.boxShadow = 'none'
  }
  nextClicked(clk, e) {

    e.preventDefault()

    console.log("data is",this.state.school_type,this.state.gcse_result, this.state.school_governed , this.state.school_size )
    if (clk === 1) {
      if (
        this.state.school_type === 'primary' 
      ) {
       
        alert('According to selection criteria you are disqualified')

      } else if (this.state.gcse_result === 'Greater then 15% of national average' ){

        alert('According to selection criteria you are disqualified')
      }

      else if (this.state.school_governed === 'Private'){

        alert('According to selection criteria you are disqualified')
      }

      else if (this.state.school_size === 'Under 650 students'){

        alert('According to selection criteria you are disqualified')
      }
      
      else {

        document.getElementById('step1').style.display = 'none'
        document.getElementById('step2').style.display = 'block'      }
    }
    if (clk === 2) {
      document.getElementById('step2').style.display = 'none'
      document.getElementById('step3').style.display = 'block'
    }
    if (clk === 3) {
      document.getElementById('step3').style.display = 'none'
      document.getElementById('step4').style.display = 'block'
    }
    if (clk === 4) {
      document.getElementById('step4').style.display = 'none'
      document.getElementById('step5').style.display = 'block'
      this.handleSubmit()
    }
  }
  //   Step 1
  handleSchoolTypeOnChange(event) {
    this.setState({
      school_type: event.target.value,
    })
  }

  handleGCSEResultOnChange(event) {
    this.setState({
      gcse_result: event.target.value,
    })
  }
  handleSchoolGovernedOnChange(event) {
    this.setState({
      school_governed: event.target.value,
    })
  }
  handleSchoolSizeChange(event) {
    this.setState({
      school_size: event.target.value,
    })
  }

  // step 2
  handleSubjectOnChange(event) {
    this.setState({
      subjects: event.target.value,
    })
  }

  handleNotesOnChange(event) {
    this.setState({
      notes: event.target.value,
    })
  }
  handleMediaAddressOnChange(event) {
    this.setState({
      media_addresses: event.target.value,
    })
  }
  handleOfstedReportChange(event) {
    var ext = event.target.value.split('.').pop();
    if(ext==="pdf" || ext ==="docx" || ext ==="doc"){
      this.setState({
        ofsted_reports: event.target.value,
      })
    }else{
      document.getElementById('file').value=null
      alert("Please upload word or pdf file")
    }
    
  }

  // step 3
  handleContactNameOnChange(event) {
    this.setState({
      contact_name: event.target.value,
    })
  }

  handleJobRoleOnChange(event) {
    this.setState({
      job_role: event.target.value,
    })
  }
  handlePhExtensionOnChange(event) {
    this.setState({
      ph_extension: event.target.value,
    })
  }
  handlePhNoChange(event) {
    this.setState({
      ph_no: event.target.value,
    })
  }
  handleEmailTypeOnChange(event) {
    this.setState({
      email_type: event.target.value,
    })
  }
  handleEmailAddressChange(event) {
    this.setState({
      email_address: event.target.value,
    })
  }

  // step 4
  handleSchoolNameOnChange(event) {
    this.setState({
      school_name: event.target.value,
    })
  }

  handlePostCodeOnChange(event) {
    this.setState({
      postcode: event.target.value,
    })
  }
  handleFirstLineAddrOnChange(event) {
    this.setState({
      first_line_addr: event.target.value,
    })
  }
  handleSecondLineAddrChange(event) {
    this.setState({
      second_line_addr: event.target.value,
    })
  }
  handleCountyOnChange(event) {
    this.setState({
      county: event.target.value,
    })
  }
  handleTownChange(event) {
    this.setState({
      town: event.target.value,
    })
  }
  handleWebsiteChange(event) {
    this.setState({
      website: event.target.value,
    })
  }

  //   submit qualifier data
  handleSubmit() {
    let requiredData = JSON.stringify({
      typeschool: this.state.school_type,
      gcseresult: this.state.gcse_result,
      schoolgoverned: this.state.school_governed,
      schoolsize: this.state.school_size,

      coresubjectstatistics: this.state.subjects,
      notesaditionalinfo: this.state.notes,
      publishedmediaaddresses: this.state.media_addresses,
      ofstedreport: this.state.ofsted_reports,
      
      contactname: this.state.contact_name,
      jobrole: this.state.job_role,
      phoneextension: this.state.ph_extension,
      phonenumber: this.state.ph_no,
      emailtype: this.state.email_type,
      email: this.state.email_address,

      schoolname: this.state.school_name,
      schooladdress: this.state.postcode  + this.state.first_line_addr + this.state.second_line_addr,
      country: this.state.county,
      townorcity: this.state.town,
      schoolwebsite: this.state.website,
      user: localStorage.getItem("_un")
    })
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requiredData,
    }
    fetch('/qualifier/newqualifier', settings)
        .then(response => response.json())
        .then(json => {
          console.log("qualifiers", json)
  // get all qualifiers
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
      if(localStorage.getItem('role')=== "student" || localStorage.getItem('role')=== "Student"){
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

          let requiredData1 = JSON.stringify({
            "username":  localStorage.getItem("_un"),
            "eventtype": 'Submit Qualifier',
            "component": 'Work Toolkit',
            "description":"User submitted qualifier forms"
          })
  

          const settings2 = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: requiredData1
          };
      
           fetch('/user/adduseractivity', settings2)
            .then(response => response.json())
            .then(json => {
              console.log("res", json)
             
         })
            .catch(e => {
              return e
            });


           
     })
        .catch(e => {
          return e
        });
  }
   refresh(){
    document.getElementById("step2").style.display="none"
    document.getElementById("step3").style.display="none"
    document.getElementById("step4").style.display="none"

     document.getElementById("step1").style.display="block"
   }
  render() {
    // if (localStorage.getItem("loggedin") !== "true"){
    //   return <Redirect to={"/"} />;
    // }
    let qualifiersData=  this.state.allQualifiers.length > 0 ? this.state.allQualifiers.map((data => {
      return(
          <div className="form-group"  key={data._id}>
        <table className="qualifierTable">
          <tbody>
          <tr>
          <th>School Type</th> <td>{data.typeschool}</td>
          <th>GCSE Result</th><td>{data.gcseresult}</td>
          </tr>
          <tr>
          <th>Governed</th> <td>{data.schoolgoverned}</td>
          <th>School Size</th> <td>{data.schoolsize}</td>
        </tr>
        <tr>
          <th>Core Subjects Stat</th> <td>{data.coresubjectstatistics}</td>
          <th>Additional Notes</th> <td>{data.notesaditionalinfo}</td>
        </tr>
        <tr>
          <th>Media Address</th> <td>{data.publishedmediaaddresses}</td>
          <th>ofsted Report</th> <td>{data.ofstedreport}</td>
        </tr>
        <tr>
          <th>Contact Name</th> <td>{data.contactname}</td>
          <th>Job Role</th> <td>{data.jobrole}</td>
        </tr>
        <tr>
          <th>Ph Extension</th> <td>{data.phoneextension}</td>
          <th>Ph #</th> <td>{data.phonenumber}</td>
        </tr>
        <tr>
          <th>Email Type</th> <td>{data.emailtype}</td>
          <th>Email</th> <td>{data.email}</td>
        </tr>
        <tr>
          <th>School Name</th> <td>{data.schoolname}</td>
          <th>School Address</th> <td>{data.schooladdress}</td>
        </tr>
        <tr>
          <th>County</th> <td>{data.country}</td>
          <th>Town/City</th> <td>{data.townorcity}</td>
        </tr>
        <tr>
          <th>School Website</th> <td>{data.schoolwebsite}</td>
          <th>Caller</th> <td>{localStorage.getItem("_un")}</td>
        </tr>
          </tbody>
        </table>
        <hr/>
        </div>
   
      )
    })):null;
    return (
      <>
        <div
          className="col-lg-12 col-md-12 col-sm-12"
          style={{ paddingLeft: '30px' }}
        >
          <h2 className="my-2">Prospect Qualifier</h2>
          <hr />
          <form
            id="step1"
            className="form"
            onSubmit={(e) => {
              this.nextClicked(1, e)
            }}
          >
            <div className="form-group qualifiersLbl">
              <label>Type of School</label>
              <select
                required
                onChange={(e) => {
                  this.handleSchoolTypeOnChange(e)
                }}
              >
                <option>primary</option>
                <option>secondary</option>
              </select>
            </div>
            <div className="form-group qualifiersLbl">
              <label>GCSE Results</label>
              <select
                required
                onChange={(e) => {
                  this.handleGCSEResultOnChange(e)
                }}
              >
                <option>-5 to 15% below national average</option>
                <option>Greater then 15% of national average</option>
              </select>
            </div>
            <div className="form-group qualifiersLbl">
              <label>How is the school governed?</label>
              <select
                required
                onChange={(e) => {
                  this.handleSchoolGovernedOnChange(e)
                }}
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
            <div className="form-group qualifiersLbl">
              <label>How big is the school? </label>
              <select
                required
                onChange={(e) => {
                  this.handleSchoolSizeChange(e)
                }}
              >
                <option>Greater or equal to 650 students</option>
                <option>Under 650 students</option>
              </select>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 btns">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <button type="submit" className="btn btn-primary btn-block nxt">
                  Next
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              <button type="reset" onClick={()=>{this.refresh()}} className="btn btn-primary btn-block"> Exit </button> 
              </div>
            </div>
          </form>
          <form
            id="step2"
            className="form"
            onSubmit={(e) => {
              this.nextClicked(2, e)
            }}
            style={{ display: 'none' }}
          >
            <label>ADDITIONAL NOTES ON SCHOOL PERFORMANCE</label>

            <div className="form-group ">
              <label>Core subject statistics *</label>
              <textarea
                className="form-control"
                required
                placeholder="Core subject statistics"
                onChange={(e) => {
                  this.handleSubjectOnChange(e)
                }}
              ></textarea>
            </div>

            <div className="form-group ">
              <label>Additional notes about performance information *</label>
              <textarea
                className="form-control"
                required
                placeholder="Additional notes about performance information"
                onChange={(e) => {
                  this.handleNotesOnChange(e)
                }}
              ></textarea>
            </div>
            <div className="form-group ">
              <label>Relevant pubished local/national media addresses *</label>
              <textarea
                className="form-control"
                required
                onChange={(e) => {
                  this.handleMediaAddressOnChange(e)
                }}
                placeholder="Relevant pubished local/national media addresses"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload ofsted reports</label>
              <input
                type="file"
                id="file"
                required
                // className="form-control"
                onChange={(e) => {
                  this.handleOfstedReportChange(e)
                }}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 btns">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <button type="submit" className="btn btn-primary btn-block nxt">
                  Next
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              <button type="reset" onClick={()=>{this.refresh()}} className="btn btn-primary btn-block"> Exit </button> 

              </div>
            </div>
          </form>
          <form
            id="step3"
            className="form"
            onSubmit={(e) => {
              this.nextClicked(3, e)
            }}
            style={{ display: 'none' }}
          >
            <label>Contact Details Collection</label>
            <div className="form-group qualifiersLbl1">
              <label>Contact Name *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Contact Name"
                onChange={(e) => {
                  this.handleContactNameOnChange(e)
                }}
              />
            </div>
            <div className="form-group qualifiersLbl1">
              <label>Job Role *</label>
              <select
                required
                onChange={(e) => {
                  this.handleJobRoleOnChange(e)
                }}
              >
                <option>Headteacher</option>
                <option>Principal</option>
                <option>Deputy Head</option>
                <option>Assistant Head</option>
                <option>Head of Year</option>
                <option>Head of Department</option>
                <option>None of the above</option>
              </select>
            </div>
            <div className="form-group qualifiersLbl1">
              <input
                type="text"
                required
                className="form-control"
                style={{ width: '200px' }}
                placeholder="Extension"
                onChange={(e) => {
                  this.handlePhExtensionOnChange(e)
                }}
              />{' '}
              &nbsp;
              <input
                required
                type="number"
                min="0"
                className="form-control"
                placeholder="Contact Phone Number"
                onChange={(e) => {
                  this.handlePhNoChange(e)
                }}
              />
            </div>
            <div className="form-group qualifiersLbl1">
              <input
                type="text"
                className="form-control"
                required
                style={{ width: '200px' }}
                placeholder="Email Type"
                onChange={(e) => {
                  this.handleEmailTypeOnChange(e)
                }}
              />{' '}
              &nbsp;
              <input
                type="email"
                required
                className="form-control"
                placeholder="Contact Email Address"
                onChange={(e) => {
                  this.handleEmailAddressChange(e)
                }}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 btns">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <button type="submit" className="btn btn-primary btn-block nxt">
                  Next
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              <button type="reset" onClick={()=>{this.refresh()}} className="btn btn-primary btn-block"> Exit </button> 

              </div>
            </div>
          </form>
          <form
            id="step4"
            className="form"
            onSubmit={(e) => {
              this.nextClicked(4, e)
            }}
            style={{ display: 'none' }}
          >
            <label>School Details</label>
            <div className="form-group qualifiersLbl1">
              <label>School Name </label>
              <input
                type="text"
                className="form-control"
                placeholder="Shoool Name"
                onChange={(e) => {
                  this.handleSchoolNameOnChange(e)
                }}
              />
            </div>
            <div className="form-group qualifiersLbl1">
              <label>School Address </label>
              <input
                type="text"
                className="form-control"
                placeholder="Postcode"
                onChange={(e) => {
                  this.handlePostCodeOnChange(e)
                }}
              />
            </div>
            <div className="form-group qualifiersLbl1">
              <input
                type="text"
                className="form-control"
                placeholder="First Line of Address"
                onChange={(e) => {
                  this.handleFirstLineAddrOnChange(e)
                }}
              />
            </div>
            <div className="form-group qualifiersLbl1">
              <input
                type="text"
                className="form-control"
                placeholder="Second Line of Address"
                onChange={(e) => {
                  this.handleSecondLineAddrChange(e)
                }}
              />
            </div>
            <div className="form-group qualifiersLbl1">
              <input
                type="text"
                className="form-control"
                style={{ width: '50%' }}
                placeholder="County"
                onChange={(e) => {
                  this.handleCountyOnChange(e)
                }}
              />{' '}
              &nbsp;
              <input
                type="text"
                className="form-control"
                placeholder="Town/City (Optional)"
                onChange={(e) => {
                  this.handleTownChange(e)
                }}
              />
            </div>
            <div className="form-group">
              <label>School Website </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  this.handleWebsiteChange(e)
                }}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 btns">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <button type="submit" className="btn btn-primary btn-block nxt">
                  Next
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              <button type="reset" onClick={()=>{this.refresh()}} className="btn btn-primary btn-block"> Exit </button> 
 
              </div>
            </div>
          </form>

          <div id="step5" style={{ display: 'none', textAlign: 'center' }}>
            <p
              style={{
                marginLeft: '10%',
                marginRight: '10%',
                border: '1px solid #167bff',
              }}
            >
              Prospect has been successfully submitted to the database and can
              be viewed below
            </p>
            <br/>
            <b style={{float:"left"}}>Table of Qualified Prospects</b>
            <br/>
            <hr/>
            <div className="form-group" >

        {qualifiersData}
        </div>
          </div>
        </div>
      </>
    )
  }
}
