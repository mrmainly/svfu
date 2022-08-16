import React from "react";

import { Button } from "antd";

const MyButton = ({ children, ...props }) => (
  <Button
    style={{
      background: "#0D6EFD",
      width: "100%",
      borderRadius: 4,
      width: "max-content",
    }}
    type="primary"
    size="large"
    {...props}
  >
    {children}
  </Button>
);

export default MyButton;
