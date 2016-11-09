// An object representing a Dog
var fido = {
  name: "Fido",
  bark: function() {
    console.log(this.name, "woofs")
  }
}

// An object representing another Dog
var spot = {
  name: "Spot",
  bark: function() { 
    console.log(this.name, "yips")
  } 
}

//Call methods on the objects:
console.log('***This is Fido barking:***');
fido.bark( /*this = fido*/ ); //=> "Fido woofs"

console.log('***This is Spot barking***');
spot.bark( /*this = spot*/ ); //=> "Spot yips"

console.log("***This is Fido using Spot's bark***");
fido.bark = spot.bark; //assign the function
fido.bark( /*this = fido*/) //=> "fido yips"

console.log("***This is Fido using Spot's BOUND bark***");
fido.bark = spot.bark.bind(spot); //assign the function, but bind "spot" to the this
fido.bark( /*this = fido*/) //=> "Spot yips"
//It's a ventriloquist dog!

/* Define an class for dog objects */
class Dog {
  constructor(name) { //"this" represents the object instantiated
    this.name = name; //assign value to the object

    //create a "bound" version of the function, and 
    //REASSIGN in place of the old version
    this.bark = this.bark.bind(this);
  }

  bark() {
    console.log(this.name, "barks");
  }
}

var rover = new Dog("Rover"); //this = a new {}
var sparky = new Dog("Sparky"); //this = a new {}

rover.bark( /*this=rover */ );
sparky.bark( /*this=sparky */ );

rover.bark = sparky.bark; //assign sparky's bark to rover
rover.bark(); //=> "Sparky barks" (because function always runs on Sparky!)