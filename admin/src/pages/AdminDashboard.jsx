import React, { useState } from "react";
import "./style.css";

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="admin-panel">
      <div id="mySidenav" className="sidenav" style={{ width: isCollapsed ? "70px" : "300px" }}>
        <p className="logo">
          <span>M</span>-SoftTech
        </p>
        <a href="#" className="icon-a">
          <i className="fa fa-dashboard icons"></i>&nbsp;&nbsp;Dashboard
        </a>
        <a href="#" className="icon-a">
          <i className="fa fa-users icons"></i>&nbsp;&nbsp;Customers
        </a>
        <a href="#" className="icon-a">
          <i className="fa fa-list icons"></i>&nbsp;&nbsp;Projects
        </a>
        <a href="#" className="icon-a">
          <i className="fa fa-shopping-bag icons"></i>&nbsp;&nbsp;Orders
        </a>
        <a href="#" className="icon-a">
          <i className="fa fa-tasks icons"></i>&nbsp;&nbsp;Inventory
        </a>
        <a href="#" className="icon-a">
          <i className="fa fa-user icons"></i>&nbsp;&nbsp;Accounts
        </a>
        <a href="#" className="icon-a">
          <i className="fa fa-list-alt icons"></i>&nbsp;&nbsp;Tasks
        </a>
      </div>

      <div id="main" style={{ marginLeft: isCollapsed ? "70px" : "300px" }}>
        <div className="head">
          <div className="col-div-6">
            <span
              style={{ fontSize: "30px", cursor: "pointer", color: "white" }}
              onClick={handleToggle}
            >
              &#9776; Dashboard
            </span>
          </div>
          <div className="col-div-6">
            <div className="profile">
              <img src="images/user.png" className="pro-img" alt="User" />
              <p>Manoj Adhikari <span>UI / UX DESIGNER</span></p>
            </div>
          </div>
        </div>

        <div className="col-div-3">
          <div className="box">
            <p>67<br /><span>Customers</span></p>
            <i className="fa fa-users box-icon"></i>
          </div>
        </div>
        <div className="col-div-3">
          <div className="box">
            <p>88<br /><span>Projects</span></p>
            <i className="fa fa-list box-icon"></i>
          </div>
        </div>
        <div className="col-div-3">
          <div className="box">
            <p>99<br /><span>Orders</span></p>
            <i className="fa fa-shopping-bag box-icon"></i>
          </div>
        </div>
        <div className="col-div-3">
          <div className="box">
            <p>78<br /><span>Tasks</span></p>
            <i className="fa fa-tasks box-icon"></i>
          </div>
        </div>

        <div className="col-div-8">
          <div className="box-8">
            <div className="content-box">
              <p>Top Selling Projects <span>Sell All</span></p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                  </tr>
                  <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-div-4">
          <div className="box-4">
            <div className="content-box">
              <p>Total Sale <span>Sell All</span></p>
              <div className="circle-wrap">
                <div className="circle">
                  <div className="mask full">
                    <div className="fill"></div>
                  </div>
                  <div className="mask half">
                    <div className="fill"></div>
                  </div>
                  <div className="inside-circle">70%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
