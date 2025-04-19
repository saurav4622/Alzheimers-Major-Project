import React from 'react';
import brainImage5 from '../../assets/brain-5.png';
import './userSignUp.css';
const UserSignUp = () => {
  return (
    <div>
      <button className="back-btn">Back</button>

      <div className="container">
        <div className="image-side">
          <img src= {brainImage5} />
        </div>
        <div className="form-side">
          <form>
            <table>
              <tbody>
                <tr>
                  <td>First Name :</td>
                  <td><input type="text" placeholder="Enter your first name" /></td>
                  <td>Last Name :</td>
                  <td><input type="text" placeholder="Enter your last name" /></td>
                </tr>
                <tr>
                  <td>Email Id :</td>
                  <td><input type="email" placeholder="Enter your email id" /></td>
                  <td>Mobile No. :</td>
                  <td><input type="number" placeholder="Enter your ph. no." /></td>
                </tr>
                <tr>
                  <td>Password :</td>
                  <td><input type="password" placeholder="Enter your password" /></td>
                  <td>Confirm Password :</td>
                  <td><input type="password" placeholder="Confirm your password" /></td>
                </tr>
                <tr>
                  <td>Age :</td>
                  <td><input type="number" placeholder="Enter your age" /></td>
                  <td>Blood Group :</td>
                  <td><input type="text" placeholder="Enter your blood group" /></td>
                </tr>
              </tbody>
            </table>
            <div className="signup-btn">
              <button type="submit">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
