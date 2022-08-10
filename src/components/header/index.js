import React from "react";
import ROUTES from "../../routes";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "52px",
          background: "url(./img/header_up.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
        }}
      >
        <div
          style={{
            paddingLeft: 18,
          }}
        >
          <img src="/img/image11.svg" style={{ height: "52px" }} />
        </div>
        <Link to="/profile">Иванов Иван</Link>
      </div>
      <div
        style={{
          backgroundColor: "#09304A",
          height: "16px",
          background: "url(./img/header_down.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
        }}
      ></div>
    </div>
  );
};

export default Header;
