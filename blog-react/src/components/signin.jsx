import React, { Component } from 'react';

class Signin extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className="container">
                    <div className="mt-5 pt-5">
                        <div className="d-flex justify-content-center my-3">
                            <img src="../images/login-logo.png" />
                        </div>
                        <div className="d-flex justify-content-center my-3">
                            <h4>
                                Sign in to Blog or <a href="/signup" className="color-org">Create an account</a>
                            </h4>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-orange btn-block font-weight-bold">SIGN IN</button>
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