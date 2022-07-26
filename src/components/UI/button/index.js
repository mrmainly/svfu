import React from "react";

import { Button } from "antd";

const MyButton = ({ children, ...props }) => (
    <Button {...props} variant="contained" type="submit">
        {children}
    </Button>
);

export default MyButton;
