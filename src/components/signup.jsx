import React, { Component } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi-browser";
import axios from "axios";

import InputPlaceholder from './inputPlaceholder';
import { setInStorage } from '../utilities/storage';

class Signup extends Component {

  state = {
      author: {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: ""
      },
      errors: {},
      avatar: "/images/apa.jpg"
    };

  schema = {
    firstName: Joi.string()
        .min(3)
        .max(10)
        .required()
        .label("First Name"),
    lastName: Joi.string()
    .min(3)
    .max(10)
    .required()
    .label("Second Name"),
    username: Joi.string()
    .min(7)
    .max(25)
    .required()
    .label("Username"),
    email: Joi.string()
      .email()
      .min(10)
      .required()
      .label("Email"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .label("Password")
  };

  // valide form inputs to match schema
  validate = () => {
    const result = Joi.validate(this.state.author, this.schema, {
      abortEarly: false
    });
    //No Errors
    if (result.error === null) {
      return null;
    }
    //Errors
    const errors = {};
    for (const error of result.error.details) {
      errors[error.path] = error.message;
    }
    return errors;
  };

  //validate each input to match schema
  validateInput = (property, name) => {
    //Sub Schema.
    const schema = { [name]: this.schema[name] };
    //validate using Joi
    const { error } = Joi.validate(property, schema);
    if (error === null) return null;
    return error.details[0];
  };

  //handle input change
  handleChange = ({ target }) => {
    //Clone
    const author = { ...this.state.author };
    const errors = { ...this.state.errors };
    //Edit
    author[target.id] = target.value;
    //Validate
    const error = this.validateInput({ [target.id]: target.value }, target.id);
    if (error === null) {
      delete errors[target.id];
    } else {
      errors[target.id] = error.message;
    }
    //Set Satate
    this.setState({ author, errors });
  };

  //handle avatar input
  handleAvatar = signupAvatar => {
      this.setState({ avatar: signupAvatar });
      }

  //sign up backend call
  register = ({firstName, lastName, username, avatar, email, password}) =>{
      axios.post(process.env.REACT_APP_BACKEND_URL+'/register', {
        firstName,
        lastName,
        username,
        avatar,
        email,
        password
      }).then(res=>{

        setInStorage('user_token', res.data.data.token);

        //Update State
        this.props.onAuthorRegister(res.data.data);

        //Redirect to Home Page
        this.props.history.replace("/home");
      }).catch(err=>{

          if(err.response.status === 422)
          {
            toast(err.response.data, {type:"error"});

          }
          else if (err.response.status === 409) {
            this.setState({errors: {username: err.response.data}});
          }
          else toast("Connection Error", {type:"error"});
      });
  };

  //handle form submission
  handleSubmit = (e) =>{
    e.preventDefault();

    //Validation :
    const errors = this.validate(); 

    if (errors) {
      this.setState({ errors });
      return;
    };

    //valid
    this.setState({ errors: {} });

    //add avatar
    const avatar = this.state.avatar;

    //call backend
    const {
      firstName: {value: firstName},
      lastName: {value: lastName},
      username: {value: username},
      email: {value: email},
      password: {value: password}
    } = e.target;
    this.register({firstName, lastName, username, avatar, email, password});

  };

  render() { 
    return ( 

      <React.Fragment>
        <div className="container">
            <div className="pt-5">
                <div className="d-flex justify-content-center my-2">
                  <img src="../images/login-logo.png" alt="logo"/>
                </div>
                <div className="d-flex justify-content-center my-2">
                  <h4>
                      Create a new account to Blog or <a href="/signin" className="color-org">Sign In</a>
                  </h4>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-4">
                  <ToastContainer />
                    {/* sign up form */}
                      <form onSubmit={this.handleSubmit}>
                          <div className="d-flex justify-content-around">
                            {/* avatar input */}
                              <div onClick={()=>this.handleAvatar("/images/avatar.jpg")}>
                                  <img src="/images/avatar.jpg" className="img-thumbnail signup-avatar" alt="Avatar"/>
                              </div>
                              <div>
                                  <pre className="signup-p">
                                          Choose <br/>
                                          Your <br/>
                                          Own <br/>
                                          Avatar
                                  </pre>
                              </div>
                              <div onClick={()=>this.handleAvatar("/images/katara.jpg")}>
                                  <img src="/images/katara.jpg" className="img-thumbnail signup-avatar" alt="Katara"/>
                              </div>
                          </div>

                          {/* username input */}
                          <InputPlaceholder
                              name="username"
                              placeholder="Username"
                              type="text"
                              value={this.state.author.username}
                              error={this.state.errors.username}
                              onChange={this.handleChange}
                          />

                          {/* first name input */}
                          <InputPlaceholder
                              name="firstName"
                              placeholder="First Name"
                              type="text"
                              value={this.state.author.firstName}
                              error={this.state.errors.firstName}
                              onChange={this.handleChange}
                          />

                          {/* second name input */}
                          <InputPlaceholder
                              name="lastName"
                              placeholder="Last Name"
                              type="text"
                              value={this.state.author.lastName}
                              error={this.state.errors.lastName}
                              onChange={this.handleChange}
                          />

                          {/* email input */}
                          <InputPlaceholder
                              name="email"
                              placeholder="Email"
                              type="email"
                              value={this.state.author.email}
                              error={this.state.errors.email}
                              onChange={this.handleChange}
                          />
                      
                          {/* password input */}
                          <InputPlaceholder
                                  name="password"
                                  placeholder="Password"
                                  type="password"
                                  value={this.state.author.password}
                                  error={this.state.errors.password}
                                  onChange={this.handleChange}
                          />
                          {/* submit btn */}
                          <button type="submit" className="btn btn-orange btn-block font-weight-bold">
                            SIGN UP
                          </button>
                      </form>
                  </div>
                </div>
            </div>
        </div>

      </React.Fragment>
    );
  }
}
 
export default Signup;