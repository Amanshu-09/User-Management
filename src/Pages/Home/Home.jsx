import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

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
    }
  ]

  const { userData } = useSelector(state => state);

  return (<React.Fragment>
    <h1>
      Role-Based Access Control (RBAC)
    </h1>
    <Table columns={columns}
      dataSource={userData}
      rowKey="id"
      pagination={false}
    />
  </React.Fragment>);
}

export default Home;