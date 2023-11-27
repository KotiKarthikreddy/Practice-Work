import { Card, Empty, Typography, theme } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [organizationIds, setOrganizationIds] = useState([]);
  const AccessToken = localStorage.getItem("accesstoken");

  const userMetaData = async () => {
    try {
      const res = await axios.get(
        "https://dev.sitara.cc/api/smb/user/details",
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );
      const data = res?.data?.data;
      setUserData(data);

      const orgIds = data?.user_organizations?.map(
        (org) => org.organization_name
      );
      setOrganizationIds(orgIds);
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    userMetaData();
  }, []);

  return (
    <Card
      style={{
        width: "20%",
        height: "auto",
        margin: "auto",
        marginTop: "15%",
        backgroundColor: "skyblue",
      }}
    >
      {userData ? (
        <div>
          <Typography>Name: {userData.first_name}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>ID: {userData.user_id}</Typography>
          <Typography>Org Name: {organizationIds.join()}</Typography>
        </div>
      ) : (
        <Empty>
          <Typography>Not found</Typography>
        </Empty>
      )}
    </Card>
  );
};

export default Dashboard;
