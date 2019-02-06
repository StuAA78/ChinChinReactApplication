import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AuthService from './AuthService';

class Banner extends Component {

  constructor() {
    super();
    this.state = {isVisible: false};

    this.toggleMenuIcon = this.toggleMenuIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.Auth = new AuthService();
  }

  handleClick() {
    if (!this.state.isVisible) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.toggleMenuIcon();
  }

  handleOutsideClick(e) {
    this.handleClick();
  }

  toggleMenuIcon() {
    this.setState(state => ({
      isVisible: !state.isVisible
    }))
  }

  render() {

    let loggedIn = this.Auth.loggedIn();

    const homeAdd = '/';
    const cocktailsAdd = '/cocktails/all';
    const signInAdd = '/sign-in';
    const signUpAdd = '/sign-up';
    const signOutAdd = '/sign-out';
    const drinksCabinetAdd = '/drinks-cabinet';

    return (
      <div>
        <div id='darken-page' className={this.state.isVisible ? 'darken-on' : 'darken-off'} />
        <div id='banner'>
          <div id='hamburger' onClick={this.handleClick}><i className={this.state.isVisible ? 'fas fa-times' : 'fas fa-bars'} /></div>
          <Link to={homeAdd}>
            <img id='logo' src='/negroni.ico' alt='Chin Chin logo'></img>
            <div id='chin-chin'>Chin Chin</div>
          </Link>
          <div id='menu' className={this.state.isVisible ? 'menu-visible' : 'menu-hidden'}>
            <Link to={homeAdd}><div className='menu-item'><span className='menu-icon'><i className='fas fa-home' /></span>Home</div></Link>
            <Link to={cocktailsAdd}><div className='menu-item'><span className='menu-icon'><i className='fas fa-cocktail' /></span>Cocktails</div></Link>
            {!loggedIn && <Link to={signInAdd}><div className='menu-item'><span className='menu-icon'><i className='fas fa-sign-in-alt' /></span>Sign In</div></Link>}
            {!loggedIn && <Link to={signUpAdd}><div className='menu-item'><span className='menu-icon'><i className='fas fa-user-plus' /></span>Sign Up</div></Link>}
            {loggedIn && <Link to={drinksCabinetAdd}><div className='menu-item'><span className='menu-icon'><i className='fas fa-wine-bottle' /></span>My Drinks Cabinet</div></Link>}
            {loggedIn && <Link to={signOutAdd}><div className='menu-item'><span className='menu-icon'><i className='fas fa-sign-out-alt' /></span>Sign Out</div></Link>}
            <div className='menu-seperator' />
            <div className='menu-item smaller'><span className='menu-icon'></span>Developed by:</div>
            <a href='https://github.com/StuAA78'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-github' /></span>Stuart Adair</div></a>
            <a href='https://github.com/joecoker'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-github' /></span>Joe Coker</div></a>
            <a href='https://github.com/Vaent'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-github' /></span>Al Eccles</div></a>
            <a href='https://github.com/alittlecross'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-github' /></span>Paul Fazackerley</div></a>
            <a href='https://github.com/DGajewska'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-github' /></span>Dana Gajewska</div></a>
            <div className='menu-seperator' />
            <div className='menu-item smaller'><span className='menu-icon'></span>Developed using:</div>
            <a href='https://nodejs.org/'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-node-js' /></span>Node.js</div></a>
            <a href='https://reactjs.org/'><div className='menu-item smaller'><span className='menu-icon'><i className='fab fa-react' /></span>React</div></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Banner;
