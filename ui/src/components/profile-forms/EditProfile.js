import React, { Fragment, useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from '../../actions/profile'

const EditProfile = ({profile:{profile, loading},createProfile, getCurrentProfile, history}) => {

    const [formData, setFormData]=useState({
        company:'',
        aspirations:'',
        location:'',
        bio:'',
        status:'',
        skills:'',
        googledrive:'',
        wikispace:'',
        quizlet:'',
        ProofHub:'',
        twiddla:''
    });

    const {
        company,
        aspirations,
        location,
        bio,
        status,
        skills,
        googledrive,
        wikispace,
        quizlet,
        ProofHub,
        twiddla
      } =formData;

    useEffect(()=>{
        getCurrentProfile();
        if(profile){
        setFormData({
            company: loading || !profile.company ? '' : profile.company, 
            aspirations: loading || !profile.aspirations ? '' : profile.aspirations, 
            location: loading || !profile.location ? '' : profile.location, 
            bio: loading || !profile.bio ? '' : profile.bio, 
            status: loading || !profile.status ? '' : profile.status, 
            skills: loading || !profile.skills ? '' : profile.skills.join(','), 
            googledrive: loading || !profile.social ? '' : profile.googledrive, 
            wikispace: loading || !profile.social ? '' : profile.wikispace, 
            quizlet: loading || !profile.social ? '' : profile.quizlet, 
            ProofHub: loading || !profile.social ? '' : profile.ProofHub, 
            twiddla: loading || !profile.social ? '' : profile.twiddla
        });
    }
// eslint-disable-next-line
    },[loading, getCurrentProfile])

    const onChange=(e)=>{setFormData({...formData, [e.target.name]: e.target.value})}

    const [displaySocialInputs, toggleSocialInputs]=useState(false);

    const onSubmit=e=>{
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Build your profile and track your progress here
            </p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e=>onChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Coach">Coach</option>
                    <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e=>onChange(e)}/>
                    <small className="form-text"
                    >This could be any School or Workforce you have attended</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Aspirations" name="aspirations" value={aspirations} onChange={e=>onChange(e)}/>
                    <small className="form-text"
                    >List any aspirations you have seperated by a comma </small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>onChange(e)}/>
                    <small className="form-text"
                    >Consider the things that you're good at, what you would like to improve on and perhaps what skills you have that you could help other members of the team with here </small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself: what are your hobbies</small>
                </div>

                <div className="my-2">
                    <button onClick={()=> toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Share your classroom collaboration links
                </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                    <i className="fab fa-quizlet fa-2x"></i>
                    <input type="text" placeholder="quizlet URL" name="quizlet" value={quizlet} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-wikispace fa-2x"></i>
                    <input type="text" placeholder="wikispace URL" name="wikispace" value={wikispace} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-googledrive fa-2x"></i>
                    <input type="text" placeholder="googledrive URL" name="googledrive" value={googledrive} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-twiddla fa-2x"></i>
                    <input type="text" placeholder="twiddla URL" name="twiddla" value={twiddla} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-ProofHub fa-2x"></i>
                    <input type="text" placeholder="ProofHub URL" name="ProofHub" value={ProofHub} onChange={e=>onChange(e)}/>
                </div>
                </Fragment>}
                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps=state=> ({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))