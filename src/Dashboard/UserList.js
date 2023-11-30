import React, { useEffect, useState } from "react";
import { Table, Image, Typography, Space, Button, Tag, Input } from "antd";
import axios from "axios";
import deleteIcon from "../Images/trash-01.svg"
import editICon from "../Images/Button.svg"

const UserList = () => {
  const [userList, setUserList] = useState([]);
  
  const getUserlist = async () => {
    try {
      const resp = await axios.get(
        "https://dev.sitara.cc/api/smb/org-acls/users/list",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfdG9rZW4iOiI2NGRjYTVmMjBhN2ZhZTlkMjI4MmQ3NTkiLCJ1aWQiOiI2NTExM2U0ZDA5MDNlNWU5YWM3MGFjMGIiLCJlbWFpbCI6InNhaGlueWF0ZXN0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2FoaW55YXRlc3RAZ21haWwuY29tIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwMTMxODcxNiwiZXhwIjoxNzAxNTM0NzE2fQ.QEJ1wcxvx9FqiWqBir1Fee-vf955zY-0E-NFivvQkM1NXTsQ_rEjmuSiEcIzwJauwpmIf6Fktgt7AP-R2mQDa-D1dciDCXD1wLzPDw--dnY-pGSGLdt6CL7Y6byLVlqF53R___fvlVvKu5MMMvMUI31XfTbm0-WKLQ5xJbx-JZBTiVdslIfqHyZeVUBeJ2LiVaQBs42ETUQTZYxQ2M2KhpR7q7Y2cSQQhKFmltD6xSVvAUIOmpdckT4FBaePkC2mdRpS3-tIqvUAJVK7Qszg_vDjP9_ykbS4ev4r7fQDWx8obE-gtNFW69DXAGr7PNpQOqlJK1xv1FmKbH7h3W1aJg`,
            organization: 34,
          },
        }
      );
      setUserList(resp?.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = (userId) => {
    setUserList((prevUserList) => prevUserList.filter((user) => user.user_id !== userId));
  };

 

  useEffect(() => {
    getUserlist();
  }, []);

  const columns = [
    {
      title: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Name</Typography>
          <Input.Search
            style={{ width: "40%" }}
            placeholder="Search by Name/Email"
          />
        </div>
      ),
      dataIndex: "first_name",
      render: (_, record) => (
        <div>
          <Space>
            <Typography>{record?.first_name}</Typography>
            <Typography>{record?.last_name}</Typography>
          </Space>
          <Typography>{record?.email}</Typography>
        </div>
      ),
    },
    {
      title: <Typography>Status</Typography>,
      dataIndex: "is_active",
      render: (tag, _) => (
        <div>
          <Tag style={{ borderRadius: "5px" }}>
            {tag ? "Active" : "Inactive"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Org",
      dataIndex: "role",
      render: (_, record) => (
        <Button style={{ borderRadius: "8px" }}>{record?.role}</Button>
      ),
    },
    {
      title: "Apps access",
      dataIndex: "user_apps",
      render: (apps) => {
        return (
          <>
            {apps?.length > 0
              ? apps?.slice(0, 3).map((app) => {
                  return <Tag>{app?.app_code}</Tag>;
                })
              : "-"}
            {apps?.length > 3 && <Tag>+{apps.length - 3}</Tag>}
          </>
        );
      },
    },
    {
        render: (_, record) => (
            <Space style={{ gap: "10px" }}>
              <Image
                src={deleteIcon}
                alt="deleteIcon"
                style={{ width: "auto", height: "20px", cursor: "pointer" }}
                preview={false}
                onClick={() => handleDelete(record.user_id)}
              />
              <Image
                src={editICon}
                alt="EditIcon"
                style={{ width: "auto", height: "30px" }}
                preview={false}
                
              />
            </Space>
    
      ),
    },
  ];

  return <Table dataSource={userList} columns={columns} pagination={false} />;
};

export default UserList;
