import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AuthService from './AuthService';

class Banner extends Component {

  constructor() {
    super();
    this.state = {
      open: 0,
      menuWidth: 500
    };

    this.toggleMenuIcon = this.toggleMenuIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.Auth = new AuthService();
  }

  componentDidMount() {
    document.getElementById('hamburger').addEventListener('click', this.handleClick, false);
    this.setState({menuWidth: document.getElementById('menu').clientWidth});
    document.getElementById('darken-page').style.pointerEvents = 'none';
  }

  handleClick(e) {
    let darkenPageId = document.getElementById('darken-page');
    if (this.state.open === 0) {
      document.addEventListener('click', this.handleOutsideClick, {capture: true});
      document.addEventListener('touchend', this.handleOutsideClick, {capture: true});
      darkenPageId.style.pointerEvents = 'auto'
    } else {
      document.removeEventListener('click', this.handleOutsideClick, {capture: true});
      document.removeEventListener('touchend', this.handleOutsideClick, {capture: true});
      // delay required to stop events below triggering straight away in Chrome
      // ie. if the menu is opening, clicking outside of it will not send the
      // click through to whatever was clicked on
      setTimeout(() => {
        darkenPageId.style.pointerEvents = 'none'
      }, 10);
    }

    this.toggleMenuIcon();

    // remove the hamburger event if the menu is open
    // otherwise both handleClick and handleOutsideClick will fire when pressing it
    // however there needs to be a delay otherwise it fires anyway
    setTimeout(() => {
      let hamburgerElement = document.getElementById('hamburger')
      if (this.state.open === 0) {
        hamburgerElement.addEventListener('click', this.handleClick, false);
      } else {
        hamburgerElement.removeEventListener('click', this.handleClick, false);
      }
    }, 100);

  }

  handleOutsideClick(e) {
    this.handleClick();
  }

  toggleMenuIcon() {
    this.setState({
      open: (this.state.open === 0 ? 1 : 0)
    })
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
        <div id='darken-page' style={{
          opacity: 0.5*this.state.open
        }} />
        <div id='banner'>
          <div id='hamburger'><i className={this.state.open ? 'fas fa-times' : 'fas fa-bars'} /></div>
          <Link to={homeAdd}>
            <img id='logo' src='/negroni.ico' alt='Chin Chin logo'></img>
            <div id='chin-chin'>Chin Chin</div>
          </Link>
          <div id='menu' style={{
              left: -this.state.menuWidth+(this.state.menuWidth*this.state.open),
              boxShadow: this.state.open ? '4px 4px 4px 0 #00000080' : 'none'
            }}>
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
