import React from "react";
import ROUTES from "../../routes";
import { Divider } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const params = useLocation();

  return (
    <>
      {params.pathname == "/" ||
      params.pathname == "/registration" ||
      params.pathname == "/forgot-password" ? (
        <div
          style={{
            height: "16px",
            backgroundColor: "#E8DCC6",
            backgroundImage: "url(./img/header_login_1.svg)",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ) : (
        // <div
        //   style={{
        //     backgroundColor: "#09304A",
        //     height: "16px",
        //     background: "url(./img/header_login.svg)",
        //     backgroundRepeat: "no-repeat",
        //     background: "auto",
        //   }}
        // ></div>
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
              padding: "0 32px",
            }}
          >
            <img src="/img/image11.svg" style={{ height: "52px" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(ROUTES.PROFILE)}
              >
                Иванов Иван
              </div>
              <Divider style={{ height: "16px" }} type="vertical" />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("jwttoken");
                  navigate(ROUTES.LOGIN);
                }}
              >
                Выйти
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#09304A",
              height: "16px",
              backgroundImage: "url(./img/header_down.svg)",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Header;
