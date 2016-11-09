import React from 'react';
import _ from 'lodash';
import './pet-app.css'; //load CSS for this module

var SAMPLE_DOGS = [
  {name:'Fido', sex:'Male', breed:'Mix', img:'img/069b8257-f9db-4034-908f-12b8cea76693.jpg'},
  {name:'Spot', sex:'Female', breed:'Terrier', img:'img/78e41dd3-4216-47f1-9598-ea8220de354b.jpg'},
  {name:'Rover', sex:'Male', breed:'Mix', img:'img/e2e7ab9d-5a66-446d-8055-c9cc7cedc443.jpg'},
  {name:'Sparky', sex:'Female', breed:'Husky', img:'img/3c86b971-63b3-4b6e-859d-8e11084cca91.jpg'},
  {name:'Koi', sex:'Male', breed:'Hound', img:'img/234ed62e-c7fc-4f53-aa7d-c9e0ad76b9bb.jpg'},
];

class PetApp extends React.Component {
  constructor(props){
    super(props);

    //this ideally would be set up from a Controller
    this.state = {pets: SAMPLE_DOGS};
    this.adopt = this.adopt.bind(this);
  }

  adopt(dog) {
    var currDogs = this.state.pets;
    var adoptee = _.find(currDogs, {name: dog.name});
    adoptee.adopted = true;
    this.setState({pets: currDogs});
  }

  render() {    

    //extract the breeds (thanks lodash!)
    var breeds = Object.keys(_.groupBy(this.state.pets, 'breed'));

    return (
      <div>
        <header className="well">
          <div className="container">
            <h1>Adopt a Pet</h1>
          </div>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-xs-3">
              <BreedLinks breeds={breeds} />
              <AboutLinks />
            </div>
            <div className="col-xs-9">
              <DogList dogs={this.state.pets} adoptCallback={this.adopt} />
            </div>
          </div>
        </main>
        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class BreedLinks extends React.Component {
  render() {
    
    var links = this.props.breeds.map(function(breed){
      return <li key={breed}><a>{breed}</a></li>;
    })

    return (
      <nav>
        <h2>Breeds</h2>
        <ul className="list-unstyled">
          {links}
        </ul>
      </nav>
    );
  }
}

class AboutLinks extends React.Component {
  render() {
    return (
      <nav>
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a>How to Adopt</a></li>
          <li><a>Volunteering</a></li>
          <li><a>Events</a></li>
          <li><a>Donate</a></li>
          <li><a>About Us</a></li>
        </ul>
      </nav>      
    );
  }
}

class DogList extends React.Component {
  render() {

    var adoptCallback = this.props.adoptCallback;

    var dogCards = this.props.dogs.map(function(dog){
      return <Dog mutt={dog} key={dog.name} adoptCallback={adoptCallback} />;
    })

    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="cards-container">
          {dogCards}
        </div>
      </div>
    );
  }
}

class Dog extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log("You clicked on", this.props.mutt.name);
    this.props.adoptCallback(this.props.mutt);
  }

  render() {
    var mutt = this.props.mutt; //shortcut
    return (
      <div className="card" onClick={this.handleClick}>
        <div className="content">
          <img src={mutt.img} alt={mutt.name} />
          <h3>{mutt.name} {mutt.adopted ? '(Adopted)' : ''}</h3>
          <p>{mutt.sex} {mutt.breed}</p>
        </div>
      </div>
    );
  }
}

export default PetApp;
