import React from "react";

const Header = () => {
  return (
    <>
      <header className="pc-header">
        <div className="header-wrapper">
          <div className="me-auto pc-mob-drp">
            <ul className="list-unstyled">
              {/* <!-- ======= Menu collapse Icon ===== --> */}
              {/* <li className="pc-h-item pc-sidebar-collapse">
                <a href="#" className="pc-head-link ms-0" id="sidebar-hide">
                  <i className="ti ti-menu-2"></i>
                </a>
              </li>
              <li className="pc-h-item pc-sidebar-popup">
                <a href="#" className="pc-head-link ms-0" id="mobile-collapse">
                  <i className="ti ti-menu-2"></i>
                </a>
              </li> */}
              {/* <li className="dropdown pc-h-item">
                <a
                  className="pc-head-link dropdown-toggle arrow-none m-0 trig-drp-search"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-search-normal-1"></use>
                  </svg>
                </a>
                <div className="dropdown-menu pc-h-dropdown drp-search">
                  <form className="px-3 py-2">
                    <input
                      type="search"
                      className="form-control border-0 shadow-none"
                      placeholder="Search here. . ."
                    />
                  </form>
                </div>
              </li> */}
            </ul>
          </div>
          {/* <!-- [Mobile Media Block end] --> */}
          <div className="ms-auto">
            <ul className="list-unstyled">
              {/* <li className="dropdown pc-h-item">
                <a
                  className="pc-head-link dropdown-toggle arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-sun-1"></use>
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
                  <a
                    href="#!"
                    className="dropdown-item"
                    //   onclick='layout_change("dark")'
                  >
                    <svg className="pc-icon">
                      <use xlinkHref="#custom-moon"></use>
                    </svg>
                    <span>Dark</span>
                  </a>
                  <a
                    href="#!"
                    className="dropdown-item"
                    //   onclick='layout_change("light")'
                  >
                    <svg className="pc-icon">
                      <use xlinkHref="#custom-sun-1"></use>
                    </svg>
                    <span>Light</span>
                  </a>
                  <a
                    href="#!"
                    className="dropdown-item"
                    //   onclick="layout_change_default"
                  >
                    <svg className="pc-icon">
                      <use xlinkHref="#custom-setting-2"></use>
                    </svg>
                    <span>Default</span>
                  </a>
                </div>
              </li> */}
              {/* <li className="dropdown pc-h-item">
                <a
                  className="pc-head-link dropdown-toggle arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-setting-2"></use>
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
                  <a href="#!" className="dropdown-item">
                    <i className="ti ti-user"></i>
                    <span>My Account</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ti ti-settings"></i>
                    <span>Settings</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ti ti-headset"></i>
                    <span>Support</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ti ti-lock"></i>
                    <span>Lock Screen</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ti ti-power"></i>
                    <span>Logout</span>
                  </a>
                </div>
              </li> */}
              {/* <li className="pc-h-item">
                <a
                  href="#"
                  className="pc-head-link me-0"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#announcement"
                  aria-controls="announcement"
                >
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-flash"></use>
                  </svg>
                </a>
              </li> */}
              {/* <li className="dropdown pc-h-item">
                <a
                  className="pc-head-link dropdown-toggle arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-notification"></use>
                  </svg>
                  <span className="badge bg-success pc-h-badge">3</span>
                </a>
                <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Notifications</h5>
                    <a href="#!" className="btn btn-link btn-sm">
                      Mark all read
                    </a>
                  </div>
                  <div
                    className="dropdown-body text-wrap header-notification-scroll position-relative"
                    style={{ maxHeight: "calc(100vh - 215px)" }}
                  >
                    <p className="text-span">Today</p>
                    <div className="card mb-2">
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <svg className="pc-icon text-primary">
                              <use xlinkHref="#custom-layer"></use>
                            </svg>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <span className="float-end text-sm text-muted">
                              2 min ago
                            </span>
                            <h5 className="text-body mb-2">UI/UX Design</h5>
                            <p className="mb-0">
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-2">
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <svg className="pc-icon text-primary">
                              <use xlinkHref="#custom-sms"></use>
                            </svg>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <span className="float-end text-sm text-muted">
                              1 hour ago
                            </span>
                            <h5 className="text-body mb-2">Message</h5>
                            <p className="mb-0">
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-span">Yesterday</p>
                    <div className="card mb-2">
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <svg className="pc-icon text-primary">
                              <use xlinkHref="#custom-document-text"></use>
                            </svg>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <span className="float-end text-sm text-muted">
                              2 hour ago
                            </span>
                            <h5 className="text-body mb-2">Forms</h5>
                            <p className="mb-0">
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-2">
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <svg className="pc-icon text-primary">
                              <use xlinkHref="#custom-user-bold"></use>
                            </svg>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <span className="float-end text-sm text-muted">
                              12 hour ago
                            </span>
                            <h5 className="text-body mb-2">
                              Challenge invitation
                            </h5>
                            <p className="mb-2">
                              <span className="text-dark">Jonny aber</span>{" "}
                              invites to join the challenge
                            </p>
                            <button className="btn btn-sm btn-outline-secondary me-2">
                              Decline
                            </button>
                            <button className="btn btn-sm btn-primary">
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-2">
                      <div className="card-body">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <svg className="pc-icon text-primary">
                              <use xlinkHref="#custom-security-safe"></use>
                            </svg>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <span className="float-end text-sm text-muted">
                              5 hour ago
                            </span>
                            <h5 className="text-body mb-2">Security</h5>
                            <p className="mb-0">
                              Lorem Ipsum has been the industry's standard dummy
                              text ever since the 1500s, when an unknown printer
                              took a galley of type and scrambled it to make a
                              type
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-2">
                    <a href="#!" className="link-danger">
                      Clear all Notifications
                    </a>
                  </div>
                </div>
              </li> */}
              <li className="dropdown pc-h-item header-user-profile">
                <a
                  className="pc-head-link dropdown-toggle arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/user/avatar-2.jpg"
                    alt="user-image"
                    className="user-avtar"
                  />
                </a>
                <div
                  style={{
                    backgroundColor: "rgba(1,150,69,0.4)",
                    borderRadius: "10px",
                  }}
                  className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown"
                >
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Profil</h5>
                  </div>
                  <div className="dropdown-body">
                    <div
                      className="profile-notification-scroll position-relative"
                      style={{ maxHeight: "calc(100vh - 225px)" }}
                    >
                      <div className="d-flex mb-1">
                        <div className="flex-shrink-0">
                          <img
                            src="../assets/images/user/avatar-2.jpg"
                            alt="user-image"
                            className="user-avtar wid-35"
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">Carson Darrin 🖖</h6>
                          <span>carson.darrin@company.io</span>
                        </div>
                      </div>
                      <hr className="border-secondary border-opacity-50" />

                      <hr className="border-secondary border-opacity-50" />
                      <div className="d-grid mb-3">
                        <button
                          style={{
                            background: "#019645",
                          }}
                          className="btn btn-primary"
                        >
                          <svg className="pc-icon me-2">
                            <use xlinkHref="#custom-logout-1-outline"></use>
                          </svg>
                          Ausloggen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div
        className="offcanvas pc-announcement-offcanvas offcanvas-end"
        tabIndex="-1"
        id="announcement"
        aria-labelledby="announcementLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="announcementLabel">
            What's new announcement?
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p className="text-span">Today</p>
          <div className="card mb-3">
            <div className="card-body">
              <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
                <div className="badge bg-light-success f-12">Big News</div>
                <p className="mb-0 text-muted">2 min ago</p>
                <span className="badge dot bg-warning"></span>
              </div>
              <h5 className="mb-3">Able Pro is Redesigned</h5>
              <p className="text-muted">
                Able Pro is completely renowed with high aesthetics User
                Interface.
              </p>
              <img
                src="../assets/images/layout/img-announcement-1.png"
                alt="img"
                className="img-fluid mb-3"
              />
              <div className="row">
                <div className="col-12">
                  <div className="d-grid">
                    <a
                      className="btn btn-outline-secondary"
                      href="https://1.envato.market/c/1289604/275988/4415?subId1=phoenixcoded&amp;u=https%3A%2F%2Fthemeforest.net%2Fitem%2Fable-pro-responsive-bootstrap-4-admin-template%2F19300403"
                      target="_blank"
                    >
                      Check Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
                <div className="badge bg-light-warning f-12">Offer</div>
                <p className="mb-0 text-muted">2 hour ago</p>
                <span className="badge dot bg-warning"></span>
              </div>
              <h5 className="mb-3">Able Pro is in best offer price</h5>
              <p className="text-muted">
                Download Able Pro exclusive on themeforest with best price.{" "}
              </p>
              <a
                href="https://1.envato.market/c/1289604/275988/4415?subId1=phoenixcoded&amp;u=https%3A%2F%2Fthemeforest.net%2Fitem%2Fable-pro-responsive-bootstrap-4-admin-template%2F19300403"
                target="_blank"
              >
                <img
                  src="../assets/images/layout/img-announcement-2.png"
                  alt="img"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>

          <p className="text-span mt-4">Yesterday</p>
          <div className="card mb-3">
            <div className="card-body">
              <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
                <div className="badge bg-light-primary f-12">Blog</div>
                <p className="mb-0 text-muted">12 hour ago</p>
                <span className="badge dot bg-warning"></span>
              </div>
              <h5 className="mb-3">Featured Dashboard Template</h5>
              <p className="text-muted">
                Do you know Able Pro is one of the featured dashboard template
                selected by Themeforest team.?
              </p>
              <img
                src="../assets/images/layout/img-announcement-3.png"
                alt="img"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="align-items-center d-flex flex-wrap gap-2 mb-3">
                <div className="badge bg-light-primary f-12">Announcement</div>
                <p className="mb-0 text-muted">12 hour ago</p>
                <span className="badge dot bg-warning"></span>
              </div>
              <h5 className="mb-3">Buy Once - Get Free Updated lifetime</h5>
              <p className="text-muted">
                Get the lifetime free updates once you purchase the Able Pro.
              </p>
              <img
                src="../assets/images/layout/img-announcement-4.png"
                alt="img"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
