import { useEffect, useState } from 'react';

export const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container py-4">
            <div className="row gy-4">
                <div className="col-md-6">
                    <h6 className=" fw-bold mb-0">Name </h6>
                    <div className="fw-semibold text-primary">{user.name}</div>
                </div>
                <div className="col-md-6">
                    <h6 className=" fw-bold mb-0">Email </h6>
                    <div className="fw-semibold text-primary">{user.email}</div>
                </div>
                <div className="col-md-6">
                    <h6 className="col-4 fw-bold mb-0">Account Activated </h6>
                    <div className="fw-semibold text-primary">
                        {user.confirmed ? 'true' : 'false'}
                    </div>
                </div>
            </div>
        </div>
    );
};
