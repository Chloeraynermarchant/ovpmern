    import React, { Fragment } from 'react';
    import { Link } from 'react-router-dom';
    import { connect } from 'react-redux';
    import PropTypes from 'prop-types';
    import { logout } from '../../actions/auth';

    const Navbar = ({ auth: { isAuthenticated }, logout }) => {
      const authLinks = (
        <ul>

          <div class="dropdown">
            <button class="dropbtn">General</button>
            <div class="dropdown-content">
            <a href="/dashboard">Dashboard</a>
            <a href="/profiles">Team</a>
                <a href="/posts">Forum</a>
                
            </div>
          </div>

          
          <div class="dropdown">
            <button class="dropbtn">Toolbox</button>
            <div class="dropdown-content">
            <a href="/qualifier">Qualifier</a>

            <a href="/qualifiedprospects">Qualified Prospects</a>
            </div>

          </div>

          <div class="dropdown">
            <button class="dropbtn">Coaching Lessons</button>
            <div class="dropdown-content">
            <a href="/upload-content">Upload Content</a>
            <a href="/uploaded-content">Uploaded Content</a>
            </div>
          </div>




          <li>
            <a onClick={logout} href="#!">
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </a>
          </li>
        </ul>
      );

      const guestLinks = (
        <ul>
          <li>
            <Link to="/profiles">Team</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );

      return (
        <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-tree" /> OVP Coaching Teams
            </Link>
          </h1>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </nav>
      );
    };

    Navbar.propTypes = {
      logout: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired
    };

    const mapStateToProps = (state) => ({
      auth: state.auth
    });

    export default connect(mapStateToProps, { logout })(Navbar);
