import React from "react";

const Offcanvas = () => {
  return (
    <>
      <div
        className="offcanvas border-0 pct-offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvas_pc_layout"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Settings</h5>
          <button
            type="button"
            className="btn btn-icon btn-link-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="ti ti-x"></i>
          </button>
        </div>
        <div className="pct-body customizer-body">
          <div className="offcanvas-body py-0">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="pc-dark">
                  <h6 className="mb-1">Theme Mode</h6>
                  <p className="text-muted text-sm">
                    Choose light or dark mode or Auto
                  </p>
                  <div className="row theme-color theme-layout">
                    <div className="col-4">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn active"
                          data-value="true"
                          // onclick='layout_change("light")'
                          data-bs-toggle="tooltip"
                          title="Light"
                        >
                          <svg className="pc-icon text-warning">
                            <use xlinkHref="#custom-sun-1"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn"
                          data-value="false"
                          // onclick='layout_change("dark")'
                          data-bs-toggle="tooltip"
                          title="Dark"
                        >
                          <svg className="pc-icon">
                            <use xlinkHref="#custom-moon"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn"
                          data-value="default"
                          // onclick="layout_change_default()"
                          data-bs-toggle="tooltip"
                          title="Automatically sets the theme based on user's operating system's color scheme."
                        >
                          <span className="pc-lay-icon d-flex align-items-center justify-content-center">
                            <i className="ph-duotone ph-cpu"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">Theme Contrast</h6>
                <p className="text-muted text-sm">Choose theme contrast</p>
                <div className="row theme-contrast">
                  <div className="col-6">
                    <div className="d-grid">
                      <button
                        className="preset-btn btn"
                        data-value="true"
                        //   onclick='layout_theme_contrast_change("true")'
                        data-bs-toggle="tooltip"
                        title="True"
                      >
                        <svg className="pc-icon">
                          <use xlinkHref="#custom-mask"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-grid">
                      <button
                        className="preset-btn btn active"
                        data-value="false"
                        //   onclick='layout_theme_contrast_change("false")'
                        data-bs-toggle="tooltip"
                        title="False"
                      >
                        <svg className="pc-icon">
                          <use xlinkHref="#custom-mask-1-outline"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">Custom Theme</h6>
                <p className="text-muted text-sm">
                  Choose your primary theme color
                </p>
                <div className="theme-color preset-color">
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Blue"
                    className="active"
                    data-value="preset-1"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Indigo"
                    data-value="preset-2"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Purple"
                    data-value="preset-3"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Pink"
                    data-value="preset-4"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Red"
                    data-value="preset-5"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Orange"
                    data-value="preset-6"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Yellow"
                    data-value="preset-7"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Green"
                    data-value="preset-8"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Teal"
                    data-value="preset-9"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                  <a
                    href="#!"
                    data-bs-toggle="tooltip"
                    title="Cyan"
                    data-value="preset-10"
                  >
                    <i className="ti ti-checks"></i>
                  </a>
                </div>
              </li>
              <li className="list-group-item">
                <h6 className="mb-1">Sidebar Caption</h6>
                <p className="text-muted text-sm">Sidebar Caption Hide/Show</p>
                <div className="row theme-color theme-nav-caption">
                  <div className="col-6">
                    <div className="d-grid">
                      <button
                        className="preset-btn btn-img btn active"
                        data-value="true"
                        //   onclick='layout_caption_change("true")'
                        data-bs-toggle="tooltip"
                        title="Caption Show"
                      >
                        <img
                          src="https://ableproadmin.com/assets/images/customizer/caption-on.svg"
                          alt="img"
                          className="img-fluid"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-grid">
                      <button
                        className="preset-btn btn-img btn"
                        data-value="false"
                        //   onclick='layout_caption_change("false")'
                        data-bs-toggle="tooltip"
                        title="Caption Hide"
                      >
                        <img
                          src="https://ableproadmin.com/assets/images/customizer/caption-off.svg"
                          alt="img"
                          className="img-fluid"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="pc-rtl">
                  <h6 className="mb-1">Theme Layout</h6>
                  <p className="text-muted text-sm">LTR/RTL</p>
                  <div className="row theme-color theme-direction">
                    <div className="col-6">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn-img btn active"
                          data-value="false"
                          // onclick='layout_rtl_change("false")'
                          data-bs-toggle="tooltip"
                          title="LTR"
                        >
                          <img
                            src="https://ableproadmin.com/assets/images/customizer/ltr.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn-img btn"
                          data-value="true"
                          // onclick='layout_rtl_change("true")'
                          data-bs-toggle="tooltip"
                          title="RTL"
                        >
                          <img
                            src="https://ableproadmin.com/assets/images/customizer/rtl.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item pc-box-width">
                <div className="pc-container-width">
                  <h6 className="mb-1">Layout Width</h6>
                  <p className="text-muted text-sm">
                    Choose Full or Container Layout
                  </p>
                  <div className="row theme-color theme-container">
                    <div className="col-6">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn-img btn active"
                          data-value="false"
                          // onclick='change_box_container("false")'
                          data-bs-toggle="tooltip"
                          title="Full Width"
                        >
                          <img
                            src="https://ableproadmin.com/assets/images/customizer/full.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-grid">
                        <button
                          className="preset-btn btn-img btn"
                          data-value="true"
                          // onclick='change_box_container("true")'
                          data-bs-toggle="tooltip"
                          title="Fixed Width"
                        >
                          <img
                            src="https://ableproadmin.com/assets/images/customizer/fixed.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-grid">
                  <button className="btn btn-light-danger" id="layoutreset">
                    Reset Layout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
