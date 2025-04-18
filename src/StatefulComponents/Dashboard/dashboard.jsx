import React from 'react';
import './dashboard.css';
const Dashboard = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {/* Sidebar */}
            <td className="sidebar">
              <h2>NeuroVision</h2>
              <a className="nav-btn" href="#">Dashboard</a>
              <a className="nav-btn" href="#">Reports</a>
              <br /><br /><br />
              <button className="save-btn">Log Out</button>
            </td>

            {/* Main Content */}
            <td className="main">
              <h6>Page / Dashboard</h6>
              <p>Dashboard Overview</p>

              <div className="welcome-box">
                <h3>Hello <strong>Tassy Omah</strong>,</h3>
                <p>Have a nice day and don’t forget to take care of your health!</p>
              </div>

              <div className="upload-box">
                <p>Please upload your MRI scan image</p>
                <input type="file" />
                <br /><br />
                <button className="save-btn">Save</button>
              </div>

              <div>
                <button className="save-btn">Get Started</button>
              </div>

              <div className="reports">
                <p><strong>Reports</strong></p>
                <ul>
                  <li>Current Report</li>
                  <li>Previous Reports</li>
                </ul>
              </div>
            </td>

            {/* Right Sidebar */}
            <td className="right-sidebar">
              <div>
                <img
                  src="brain 2.jpg"
                  alt="User"
                  style={{ width: '50px', borderRadius: '50%' }}
                />
                <p>
                  Charles Robbie<br />
                  25 years old<br />
                  New York, USA
                </p>
              </div>
              <br />
              <div className="calendar">
                {/* Calendar component can go here */}
              </div>
              <br />
              <div>
                <img src="brain 3.jpg" alt="Illustration" style={{ width: '100%' }} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
