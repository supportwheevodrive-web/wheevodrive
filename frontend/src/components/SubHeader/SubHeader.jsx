import React from "react";
import "./SubHeader.css";
import MailIcon from "@mui/icons-material/Mail";

function SubHeader() {
  return (
    <div className="sub-header">
      <p>
        Need help ? <MailIcon className="email-icon" />:
        WheevoDrive@gmail.com
      </p>
    </div>
  );
}

export default SubHeader;
