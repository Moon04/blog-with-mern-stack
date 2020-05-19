import React, { Component } from 'react';
import Joi from "joi-browser";
import axios from "axios";

import InputPlaceholder from './inputPlaceholder';

class Signup extends Component {

      state = {
          author: {
              id: 0,
              fName: "",
              lName: "",
              username: "",
              email: "",
              password: ""
          },
          errors: {},
          avatar: "/images/apa.jpg"
        };

      schema = {
        id: Joi.number()
            .integer()
            .min(0),
        fName: Joi.string()
            .min(3)
            .max(10)
            .required()
            .label("First Name"),
        lName: Joi.string()
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
    
      validateInput = (property, name) => {
        //Sub Schema.
        const schema = { [name]: this.schema[name] };
        //validate using Joi
        const { error } = Joi.validate(property, schema);
        if (error === null) return null;
        return error.details[0];
      };

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

      handleAvatar = signupAvatar => {
            this.setState({ avatar: signupAvatar });
      }

      handleSubmit = async e => {
        e.preventDefault();
        
        const author = {...this.state.author}
        
        //Validation :
        const errors = this.validate(); 
        
        if (errors) {
            console.log(errors);
            console.log(author);
            this.setState({ errors });
            console.log(this.state.errors);
            return;
        };
        
        //valid
        this.setState({ errors: {} });
        
        //Call backend
        delete author.id;
        author.avatar = this.state.avatar;
        author.followers = [];
        author.followings = [];
        //CallBackEnd
        const { data } = await axios.post(
            "http://localhost:3000/authors",
            author
        );
        //Update State
        this.props.onAuthorRegister(data);

        //Redirect to Home Page
        this.props.history.replace("/home");

      };

    render() { 
        return ( 
            <React.Fragment>
                <div className="container">
                    <div className="pt-3">
                        <div className="d-flex justify-content-center my-3">
                          <img src="../images/login-logo.png" alt="logo"/>
                        </div>
                        <div className="d-flex justify-content-center my-3">
                          <h4>
                              Create a new account to Blog or <a href="/signin" className="color-org">Sign In</a>
                          </h4>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <div className="col-md-4">
                              <form onSubmit={this.handleSubmit}>
                                  <div className="d-flex justify-content-around">
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

                                  <InputPlaceholder
                                      name="username"
                                      placeholder="Username"
                                      type="text"
                                      value={this.state.author.username}
                                      error={this.state.errors.username}
                                      onChange={this.handleChange}
                                  />

                                  <InputPlaceholder
                                      name="fName"
                                      placeholder="First Name"
                                      type="text"
                                      value={this.state.author.fName}
                                      error={this.state.errors.fName}
                                      onChange={this.handleChange}
                                  />

                                  <InputPlaceholder
                                      name="lName"
                                      placeholder="Last Name"
                                      type="text"
                                      value={this.state.author.lName}
                                      error={this.state.errors.lName}
                                      onChange={this.handleChange}
                                  />

                                  <InputPlaceholder
                                      name="email"
                                      placeholder="Email"
                                      type="email"
                                      value={this.state.author.email}
                                      error={this.state.errors.email}
                                      onChange={this.handleChange}
                                  />
                              
                                  <InputPlaceholder
                                          name="password"
                                          placeholder="Password"
                                          type="password"
                                          value={this.state.author.password}
                                          error={this.state.errors.password}
                                          onChange={this.handleChange}
                                      />
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