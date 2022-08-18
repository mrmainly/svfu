import React from "react";

const Line = ({ ...props }) => {
    return (
        <div
            {...props}
            style={{
                background: "grey",
                height: 1,
                marginLeft: "-24px",
                marginRight: "-24px",
                marginTop: 16,
                marginBottom: 16,
            }}
        />
    );
};

export default Line;
