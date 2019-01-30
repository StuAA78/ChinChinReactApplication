import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AuthService from './AuthService';

class DrinksCabinetList extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      allIngredients: [],
      cabinetIngredients: [],
      spirits: [{"name":"Gin"},{"name":"Vodka"},{"name":"Triple Sec"},{"name":"White Rum"},{"name":"Dark Rum"},{"name":"Cognac"},{"name":"Vermouth"},{"name":"Whiskey"},{"name":"Tequila"},{"name":"Champagne"}],
      mixers: [{"name":"Orange Juice"},{"name":"Pineapple Juice"},{"name":"Cranberry Juice"},{"name":"Lemon Juice"},{"name":"Lime Juice"},{"name":"Cream"}],
      liqueurs: [{"name":"Coffee Liqueur"},{"name":"Créme Liqueur"},{"name":"Maraschino Cherry Liqueur"},{"name":"Galliano"}],
      others: [{"name":"Absinthe"},{"name":"Aperol"},{"name":"Apricot Brandy"},{"name":"Blackberry Liqueur"},{"name":"Cachaca"},{"name":"Calvados"},{"name":"Campari"},{"name":"Cherry Liqueur"},{"name":"Coconut Milk"},{"name":"Cola"},{"name":"Cream Liqueur"},{"name":"DiSaronno"},{"name":"DOM Bénédictine"},{"name":"Drambuie"},{"name":"Dry White Wine"},{"name":"Egg Yolk"},{"name":"Ginger Ale"},{"name":"Ginger Beer"},{"name":"Grapefruit Juice"},{"name":"Hot Coffee"},{"name":"Kirsch"},{"name":"Lillet Blonde"},{"name":"Olive Juice"},{"name":"Orange Bitters"},{"name":"Peach Puree"},{"name":"Peach Schnapps"},{"name":"Pisco"},{"name":"Prosecco"},{"name":"Raspberry Liqueur"},{"name":"Red Port"},{"name":"Soda Water"},{"name":"Tomato Juice"},{"name":"Agave Nectar"},{"name":"Angostura Bitters"},{"name":"Bourbon Whiskey"},{"name":"Brown Créme de Cacao"},{"name":"Brown Sugar"},{"name":"Celery Salt"},{"name":"Citron Vodka"},{"name":"Clear Honey"},{"name":"Créme de Cassis"},{"name":"Dry Vermouth"},{"name":"Egg White"},{"name":"Fresh Lime"},{"name":"Fresh Red Hot Chili Peppers"},{"name":"Gold Rum"},{"name":"Gomme Syrup"},{"name":"Green Créme de Menthe"},{"name":"Grenadine Syrup"},{"name":"Irish Cream Liqueur"},{"name":"Irish Whiskey"},{"name":"Mint"},{"name":"Mint leaves"},{"name":"Onion Finely Chopped"},{"name":"Orange Curaçao"},{"name":"Orange Flower Water"},{"name":"Orgeat Syrup"},{"name":"Peach Bitters"},{"name":"Pepper"},{"name":"Peychaud's Bitters"},{"name":"Powdered Sugar"},{"name":"Raspberry Syrup"},{"name":"Red Vermouth"},{"name":"Rye Whiskey"},{"name":"Salt"},{"name":"Scotch Whisky"},{"name":"Short Strong Espresso"},{"name":"Silver Tequila"},{"name":"Strawberry Syrup"},{"name":"Sugar"},{"name":"Sugar Syrup"},{"name":"Sweet Red Vermouth"},{"name":"Tabasco"},{"name":"Vanilla Extract"},{"name":"Water"},{"name":"White Créme de Cacao"},{"name":"Worcestershire Sauce"},{"name":"White Créme de Menthe"}]
    }
    this.addToCabinet = this.addToCabinet.bind(this);
    this.deleteFromCabinet = this.deleteFromCabinet.bind(this);
    this.constructList = this.constructList.bind(this);
  }

  constructList(ingredients){
      let temp = ingredients.sort((a,b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      })

      return temp.map((ingredient) => {
        let divContent;
        if (this.state.cabinetIngredients.includes(ingredient.name)) {
          divContent = <button onClick={this.deleteFromCabinet.bind(this, ingredient.name)} className='star-button'><i className="fas fa-star" /></button>
        } else {
          divContent = <button onClick={this.addToCabinet.bind(this, ingredient.name)} className='star-button'><i className="far fa-star" /></button>
        }
        return (
          <div className='drinks-cabinet-list-item'>
            {divContent} {ingredient.name}
          </div>
        )
    })
  }

  componentWillMount(){
    fetch('https://chinchinapi.herokuapp.com/ingredients/all')
    .then(res => res.json())
    .then(result => {
        this.setState({
          allIngredients: result.sort((a,b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          })
        });
      }
    )

    if (this.Auth.loggedIn()) {
      console.log('user is logged in')
    } else {
      console.log('user is not logged in')
    }

    this.Auth.fetch('https://chinchinapi.herokuapp.com/user/cabinet/view')
    .then(result => {
      this.setState({
        cabinetIngredients: result.cabinetIngredients
      })
    })
  }

  addToCabinet(ingredientName) {
    this.Auth.fetch('https://chinchinapi.herokuapp.com/user/cabinet/add', {
      method: 'POST',
      body: '{"ingredientsList": ["' + ingredientName + '"]}'
    })
    .then(result => {
      this.setState({
        cabinetIngredients: result.cabinetIngredients
      })
    })
  }

  deleteFromCabinet(ingredientName) {
    this.Auth.fetch('https://chinchinapi.herokuapp.com/user/cabinet/delete', {
      method: 'POST',
      body: '{"ingredientsList": ["' + ingredientName + '"]}'
    })
    .then(result => {
      this.setState({
        cabinetIngredients: result.cabinetIngredients
      })
    })
  }

  render() {
    return (
        <div className='drinks-cabinet-list card'>
        <div className='section'><div className='section-header'>Popular Spirits</div>
          {this.constructList(this.state.spirits)}</div>
        <div className='section'><div className='section-header'>Popular Mixers</div>
          {this.constructList(this.state.mixers)}</div>
        <div className='section'><div className='section-header'>Popular Liqueurs</div>
          {this.constructList(this.state.liqueurs)}</div>
        <div className='section'><div className='section-header'>Others</div>
          {this.constructList(this.state.others)}</div>
        </div>
    )
  }
}

export default withRouter(DrinksCabinetList);
