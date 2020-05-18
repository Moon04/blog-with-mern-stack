import React, { Component } from 'react';
import InputPlaceholder from './inputPlaceholder';

class Signup extends Component {
    state = {
        author: {
            fName: "",
            lName: "",
            username: "",
            email: "",
            password: "",
            avatar: ""
        },
        errors: {}
      };


    render() { 
        return ( 
            <React.Fragment>
                <div className="container">
                    <div className="pt-5">
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
                            <form>

                                <InputPlaceholder
                                    name="fName"
                                    placeholder="First Name"
                                    type="text"
                                    value={this.state.author.fName}
                                    error={this.error.name}
                                    onChange={this.handleChange}
                                />

                                
                                <InputPlaceholder
                                    name="lName"
                                    placeholder="Last Name"
                                    type="text"
                                    value={this.state.author.lName}
                                    error={this.error.name}
                                    onChange={this.handleChange}
                                />

                                <InputPlaceholder
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    value={this.state.author.username}
                                    error={this.error.name}
                                    onChange={this.handleChange}
                                />

                                <InputPlaceholder
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={this.state.author.email}
                                    error={this.error.name}
                                    onChange={this.handleChange}
                                />
                            
                                <InputPlaceholder
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={this.state.author.password}
                                        error={this.error.name}
                                        onChange={this.handleChange}
                                    />
                                {/* avatar input */}
                                <button type="submit" className="btn btn-orange btn-block font-weight-bold" data-target="#signup-img">SIGN UP</button>
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