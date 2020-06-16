import React from "react";

const Error = ({ invalidHackers = [] }) => {
  return (
    <React.Fragment>
      {invalidHackers.map((hacker) => (
        <div
          className="col-xs-12 col-sm-12 col-md-12 col-lg-12 error"
          key={hacker}
        >
          <div id="list">
            <div className="error-msg">
              <i className="fa fa-times-circle"></i>
              <p>
                {hacker
                  ? `Error! No menu generated for ${hacker}`
                  : "Hacker HostelGet Meals Schedule"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Error;
