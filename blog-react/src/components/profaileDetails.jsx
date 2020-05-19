import React from 'react';

const ProfileDetails = props => {

    return ( 
        <React.Fragment>
            <div className={props.openDetailsModal? "modal":"modal fade"} 
                style={{display: props.openDetailsModal? "block":"none"}}
                id="profile-details-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Profile Details
                            </h5>
                            {/* close profile details modal btn */}
                            <button type="button" className="close" onClick={props.closeDetailsModal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body justify-content-center">
                            <div className="profile-details-modal">
                                {/* author data */}
                                <div className="d-flex">
                                    <label className="pr-3">
                                        Username: 
                                    </label>
                                    <p className="font-weight-bold">
                                        {props.author.username}
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <label className="pr-3">
                                        Full Name: 
                                    </label>
                                    <p className="font-weight-bold">
                                        {props.author.fName} {props.author.lName}
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <label className="pr-3">
                                        Email: 
                                    </label>
                                    <p className="font-weight-bold">
                                        {props.author.email}
                                    </p>
                                </div>  
                            </div>         
                        </div>
                        <div className="modal-footer">
                            {/* close profile details modal btn */}
                            <button type="button" className="btn btn-secondary" onClick={props.closeDetailsModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
 
export default ProfileDetails;