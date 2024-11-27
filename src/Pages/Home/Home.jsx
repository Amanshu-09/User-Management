import { Button, Table } from "antd";
import React from "react";
import { EditTwoTone, DeleteTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from "react-redux";
import './index.scss';
import ACL from "../../Components/ACL";

function Home() {
  let columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => <div className="user-table-actions">
        {record.role === "Owner" ? <EditOutlined style={{ cursor: "not-allowed" }} /> : <EditTwoTone />}
        <ACL roles={record.role === "Admin" ? ["Owner"] : ["Owner", "Admin"]}>
          {record.role === "Owner" ? <DeleteOutlined style={{ cursor: "not-allowed" }} /> : <DeleteTwoTone twoToneColor="#eb0505" />}
        </ACL>
      </div>
    },
  ]

  const { userData, currentUserData } = useSelector(state => state);

  if (!["Owner", "Admin"].includes(currentUserData.role)) {
    columns = columns.filter(col => col.key !== "action");
  }

  return (<React.Fragment>
    <div className="home-heading" >
      <h1>
        Role-Based Access Control (RBAC)
      </h1>
      <ACL roles={["Owner"]}>
        <Button type="primary" onClick={() => {
        }} >Add Admin</Button>
      </ACL>
    </div>
    <ACL roles={["Owner", "Admin", "View"]}>
      <Table columns={columns}
        dataSource={userData}
        rowKey="id"
        pagination={false}
      />
    </ACL>
  </React.Fragment>);
}

export default Home;