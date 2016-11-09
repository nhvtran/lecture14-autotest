import React from 'react';
import _ from 'lodash';
import './signup.css';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle':undefined,
      'avatar':''
    }; 

    //function binding
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signUp button
  signUp(event) {
    event.preventDefault(); //don't submit'
    this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, this.state.avatar);
  }

  //handle signIn button
  signIn(event) {
    event.preventDefault(); //don't submit'
    this.props.signUpCallback(this.state.email, this.state.password);
  }

  //helper function, returns object with errors
  validate(value, validations) {
    var errors = {}

    //check validations
    if(value !== undefined){
      //handle required
      if(validations.required && value === ''){
        errors.required = true;
      }

      //handle minLength
      if(validations.minLength && value.length < validations.minLength){
        errors.minLength = validations.minLength;
      }
    }

    //display details
    if(!_.isEmpty(errors)){ //if found errors
      errors.isValid = false;
      errors.style = 'has-error';
    }
    else{
      if(value !== undefined){ //and had input
        errors.isValid = true;
        errors.style = 'has-success'
      }
      else { //didn't have input'
        errors.isValid = false;
        errors.style = '';
      }
    }

    return errors;
  }

  render() {
    //field validation
    var emailErrors = this.validate(this.state.email, {required:true});
    var passwordErrors = this.validate(this.state.password, {required:true, minLength:6});
    var handleErrors = this.validate(this.state.handle, {required:true, minLength:3});

    //button validation
    var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && handleErrors.isValid);
    var signInEnabled = (emailErrors.isValid && passwordErrors.isValid);

    return (
      <form role="form">

        <div className={"form-group "+emailErrors.style}>
          <label htmlFor="email" className="control-label">Email:</label>
          <input id="email" type="email" name="email" className="form-control" onChange={this.handleChange} />
          <ValidationErrors errors={emailErrors} />
        </div>

        <div className={"form-group "+passwordErrors.style}>
          <label htmlFor="pw" className="control-label">Password:</label>
          <input id="pw" type="password" name="password" className="form-control" onChange={this.handleChange} />
          <ValidationErrors errors={passwordErrors} />
        </div>

        <div className={"form-group "+handleErrors.style}>
          <label htmlFor="handle" className="control-label">Handle:</label>
          <input id="handle" type="text" name="handle" className="form-control" onChange={this.handleChange} />
          <ValidationErrors errors={handleErrors} />
        </div>

        <div className="form-group">
          <img className="avatar" src={this.state.avatar} alt="avatar preview" />
          <label htmlFor="avatar" className="control-label">Avatar Image URL:</label>
          <input id="avatar" name="avatar" className="form-control" placeholder="http://www.example.com/my-picture.jpg" onChange={this.handleChange}/> 
       </div>

        <div className="form-group sign-up-buttons">
          <button className="btn btn-primary" disabled={!signUpEnabled} onClick={this.signUp}>Sign-up</button>
          <button className="btn btn-primary" disabled={!signInEnabled} onClick={this.signIn}>Sign-in</button>
        </div>
      </form>
    );
  }
}

//a component to represent and display validation errors
class ValidationErrors extends React.Component {
  render() {
    return (
      <div>
        {this.props.errors.required &&
          <p className="help-block">Required!</p>
        }
        {this.props.errors.minLength &&
          <p className="help-block">Must be at least {this.props.errors.minLength} characters.</p>        
        }
      </div>
    );
  }
}


//simple wrapper for displaying the form
class SignUpApp extends React.Component {

  //basic callbacks to prove things work!
  signUp(email, password, handle, avatar) {
    window.alert("Signing up:", email, 'with handle', handle);
  }

  signIn(email, password) {
    window.alert("Signing in:", email);
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Sign Up!</h1>
        </header>
        <SignUpForm signUpCallback={this.signUp} signInCallback={this.signIn} />
      </div>
    );
  }
}

export default SignUpApp;
export { SignUpForm };
