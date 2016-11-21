import React from 'react';
import _ from 'lodash';
import { Carousel } from 'react-bootstrap';
import DOG_DATA from './dog-data'; //load the dog data to use

class AdoptPage extends React.Component {
  constructor(props){
    super(props);

    //identify dog here, save in state for later (so can update!)
    var dogName = props.params.dogName;
    var dogObj =  _.find(DOG_DATA, {name: dogName}); //find dog in data (hack)

    this.state = {dog:dogObj};
  }

  //for clicking adopt
  adoptDog(){
    var dogObj = this.state.dog; //access object (refers to controller)
    dogObj.adopted = true; //update object
    this.setState({dog:dogObj}); //update own state
  }

  render() {
    //make a bootstrap carousel (cause fun)
    var carouselItems = this.state.dog.images.map((img) => {
      return (
        <Carousel.Item key={img}>
          <img src={img} alt={this.state.dog.name} />
        </Carousel.Item>
      );     
    })

    var adoptButton = <button className="btn btn-lg btn-primary" onClick={()=>this.adoptDog()}>Adopt me now!</button>;
    if(this.state.dog.adopted){
      adoptButton = <button className="btn btn-lg" disabled>Already adopted!</button>
    }

    return (
      <div>
        <h2>Adopt {this.state.dog.name}</h2>
        <p className="lead">{this.state.dog.sex} {this.state.dog.breed}</p>
        <Carousel className="adopt-carousel">
          {carouselItems}
        </Carousel>
        {adoptButton}
      </div>
    );
  }
}

export default AdoptPage;