import React from "react";
import brainImage from "../../assets/brain.png";
import "./login.css";

const UserLogin = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="left">
              <img src={brainImage} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <button>Back</button>
            </td>
            <td className="right">
              <div className="section">
                <h2>Hello Patient Name,</h2>
                <p>
                  Your MRI scan analysis indicates Alzheimer's Disease (AD).
                  This means that there are significant changes in brain
                  structure that are associated with memory loss, cognitive
                  decline, and difficulty with daily activities.
                </p>
              </div>

              <div className="section">
                <h3>What This Means:</h3>
                <p>
                  Alzheimer's is a progressive condition, but early intervention
                  can help manage symptoms and improve quality of life. We
                  recommend consulting with a neurologist for personalized care.
                </p>
              </div>

              <div className="section">
                <h3>Next Steps:</h3>
                <ul className="steps">
                  <li>Consult a specialist for a detailed evaluation</li>
                  <li>Explore treatment options and lifestyle changes</li>
                  <li>Stay engaged in cognitive activities</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserLogin;
