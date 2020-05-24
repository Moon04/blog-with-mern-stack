import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from "joi-browser";
import axios from "axios";

import { setInStorage } from '../utilities/storage';

import InputPlaceholder from './inputPlaceholder';

class Signin extends Component {
  
      state = {
          author: {
            email: "",
            password: ""
          },
          errors: {}
        };

      schema = {
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
        //Sub Schema
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
        
      //handle form submission
      login = ({email, password}) =>{
          axios.post('http://localhost:3000/authenticate', {
            email,
            password
          }).then(res=>{
            setInStorage('user_token', res.data.data.token);
            this.props.history.replace("/home");
          }).catch(err=>{
              console.log(err);
          });
      };

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

        //call backend
        const {email: {value: email}, password: {value: password}} = e.target;
        this.login({email, password});
      };


    render() { 
        return ( 
            <React.Fragment>
                <div className="container">
                    <div className="mt-5 pt-5">
                        <div className="d-flex justify-content-center my-3">
                            <img src="../images/login-logo.png" alt="logo"/>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                            <h4>
                                Sign in to Blog or <Link to="/signup" className="color-org">Create an account</Link>
                            </h4>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                {/* sign in form */}
                                <form onSubmit={this.handleSubmit}>
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
                                      SIGN IN
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
 
export default Signin;