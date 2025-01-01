import React from "react";

const RequiredComponent = ({ isRequired = true, label }) => (
  <div>
    <span>
      {label}
      {isRequired && <span className="text-red-500">*</span>}
    </span>
  </div>
);

export default RequiredComponent;
