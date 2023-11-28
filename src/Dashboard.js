import { Card, Empty, Typography, theme } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Apps.css";
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [organizationIds, setOrganizationIds] = useState([]);
  const accessToken = localStorage.getItem("accesstoken");

  const userMetaData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PUBLIC_API_BASE_URL}smb/user/details`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
    <Card className="card">
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
