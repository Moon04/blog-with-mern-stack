import React, { Component } from 'react';

class Signup extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <div className="container">
                    <div className="pt-5">
                        <div className="d-flex justify-content-center my-3">
                        <img src="../images/login-logo.png" />
                        </div>
                        <div className="d-flex justify-content-center my-3">
                        <h4>
                            Create a new account to Blog or <a href="signin.html" className="color-org">Sign In</a>
                        </h4>
                        </div>
                        <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="inputFname" placeholder="Fisrt Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="inputLname" placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="inputUsername" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                            </div>
                            <button type="button" className="btn btn-orange btn-block font-weight-bold" data-toggle="modal" data-target="#signup-img">SIGN UP</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    {/* Button trigger modal */}
                    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#signup-img">
                        Launch demo modal
                    </button>
                    */}
                    {/* Modal */}
                    <div className="modal fade" id="signup-img" tabIndex={-1} role="dialog" aria-labelledby="signup-imgLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Choose Your Avatar</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div className="modal-body d-flex justify-content-around">
                            <div>
                                <img src="../images/avatar.jpg" className="img-thumbnail info-img" />
                            </div>
                            <div>
                                <img src="../images/katara.jpg" className="img-thumbnail info-img" />
                            </div>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-orange">Save</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
         );
    }
}
 
export default Signup;