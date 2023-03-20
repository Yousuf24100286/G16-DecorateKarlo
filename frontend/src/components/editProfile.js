import React, {useState} from "react";
import './editProfile.css';
import Axios from 'axios';


const editProfile = () =>
{
    const [f_name, setFName] = useState("");
    const [l_name, setLName] = useState("");
    const [ph_no, setPhNo] = useState("");
    const [old_pass, setOldPass] = useState("");
    const [new_pass, setNewPass] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [p_code, setPCode] = useState("");

    const reg = (data) =>
    {
        const response = Axios.post('http://localhost:5000/editProfile',
        {
            first_name: f_name,
            last_name: l_name,
            phone_number: ph_no,
            old_password: old_pass,
            new_password: new_pass,
            new_address: address,
            new_city: city,
            postal_code: p_code,
        }).then((response) =>
        {
            if (response.data.status === "success")
            {
                window.location.href = "/profilePage";
            }
            else
            {
                console.log(response.data.status);
                alert(response.data.error);
            }
        });
    };

    return (
        <div className="App">
          <div className="container p-1 my-3 bg-light w-60">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 my-5">
              <div className="editProfile">
                <h2>Edit Profile</h2>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setFName(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Edit First Name"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Edit Last Name"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setPhNo(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Edit Phone Number"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    onChange={(e) => {
                      setOldPass(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Enter Current Password"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Enter New Password"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Edit Address"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Edit City"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    onChange={(e) => {
                      setPCode(e.target.value);
                    }}
                    className="form-control form-control-lg"
                    placeholder="Edit Postal Code"
                  />
                </div>

              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button className="btn btn-primary btn-lg" onClick={reg}>
                  Confirm Edit
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};
    
export default editProfile;
