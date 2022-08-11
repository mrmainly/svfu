import React from "react";
import ROUTES from "../../routes";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../services/ProfileService";
const HeaderUser = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProfileQuery("");
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
            {data?.last_name} {data?.first_name}
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
  );
};

export default HeaderUser;
