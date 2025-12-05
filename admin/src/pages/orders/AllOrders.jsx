import React, { useState } from "react";
import "./Allorders.css";
// import adminprofuserimg from "../assets/image.png";
const tabs = [
  { id: "tab1", label: "All", orderdate: "9 sept", orderid: "dgdf-555", ordercost: "500", orderstatus: "pending" },
  { id: "tab2", label: "Cancelled", orderdate: "9 sept", orderid: "dvsv-555", ordercost: "800", orderstatus: "cancelled" },
  { id: "tab3", label: "Completed", orderdate: "9 sept", orderid: "wefewf-555", ordercost: "200", orderstatus: "completed" },
  { id: "tab4", label: "Pending", orderdate: "9 sept", orderid: "3r3r2-555", ordercost: "300", orderstatus: "rejected" },
  { id: "tab5", label: "Rejected", orderdate: "9 sept", orderid: "jty-555", ordercost: "600", orderstatus: "pending" },
];

export const AllOrders = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);

  const [activeTab, setActiveTab] = useState(tabs[0].id); // Set the default active tab to the first one

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <>
      <div className="all-adminorders">
        <div className="adminorder-head">
          <span className="adminorder-head-left">
            <h2>All Orders</h2>
          </span>
          <span className="adminorder-head-right">
            <button
              className="upload-btn"
              onClick={() => setOpenUploadProduct(true)}
            >
              + Add Orders
            </button>


          </span>
        </div>
        <div className="adminorder-body">
          <div className="adminorder-search">
            <div className="tabs-container">
              {/* Tab Navigation */}
              <div className="tabs-nav">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              {/* Tab Content */}
              <div className="admin-orders-tab-content">
                <div className="admin-orders-body-top">
                  <form action="#">
                    <i className="fa fa-search"></i>
                    <input
                      type="text"
                      placeholder="Search vendors (by name or ID)..."
                    />
                  </form>
                  <div className="strip-bar-tab-btn2">
                    <button
                      className="tab-btn2"
                      onClick={() => setIsOpenDropdown2(!isOpenDropdown2)}
                    >
                      <i className="fa-sharp fa-solid fa-bars-filter"></i>Sort
                      by: Newest
                    </button>
                    {isOpenDropdown2 !== false && (
                      <ul className="dropdownMenu">
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            Newest
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            Pending
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            Complete
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            Rejected
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="strip-bar-tab-btn1">
                    <button
                      className="adminorder-filters-tab-btn1"
                      onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                    >
                      Show: 50<i class="fa-solid fa-angle-down"></i>
                    </button>
                    {isOpenDropdown !== false && (
                      <ul className="dropdownMenu">
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            50
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            100
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            150
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            200
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdownMenu-btn"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                          >
                            All
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="admin-orders-container">
                  {tabs.map(
                    (tab) =>
                      activeTab === tab.id && (
                        <div key={tab.id} className="admin-orders-tab-pane">
                          {/* {tab.content} */}
                          <span className="admin-orders-tab-pane-data">
                            <div className="admin-orders-tab-pane-date">
                              {tab.orderdate}
                            </div>
                            <div className="admin-orders-tab-pane-date">
                              <div className="admin-order-details">
                                {tab.orderid}
                              </div>
                              <div className="admin-order-details">
                                Total of :{tab.ordercost}
                              </div>
                            </div>
                          </span>
                          <span className="admin-orders-tab-pane-date">
                            {tab.orderstatus}
                          </span>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
