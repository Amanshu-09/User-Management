import { Button, Modal, Spin, Table } from "antd";
import React, { useState, Suspense } from "react";
import { EditTwoTone, DeleteTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import app from "../../Firebase/firebase";
import { getDatabase, ref, remove } from "firebase/database";
import './index.scss';
import ACL from "../../Components/ACL";
import { setUserData } from "../../Redux/slice";
const RegistrationForm = React.lazy(() => import('../Registration'));

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
        {(currentUserData.role === "Admin" && ["Owner", "Admin"].includes(record.role) || record.role === "Owner") ? <EditOutlined style={{ cursor: "not-allowed" }} />
          : <EditTwoTone onClick={() => {
            setSelectedData(record);
            setAddModalOpen(true);
            setUserType(record.role);
          }} />}
        {(currentUserData.role === "Admin" && ["Owner", "Admin"].includes(record.role) || record.role === "Owner") ? <DeleteOutlined style={{ cursor: "not-allowed" }} />
          : <DeleteTwoTone twoToneColor="#eb0505" onClick={async () => {
            const db = getDatabase(app);
            const UserRef = ref(db, "users/" + record.id);
            await remove(UserRef);
            dispatch(setUserData(userData.filter(user => user.id !== record.id)))
          }} />}
      </div>
    },
  ]

  const { userData, currentUserData } = useSelector(state => state);
  const dispatch = useDispatch();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [userType, setUserType] = useState("");

  const onCloseRegistrationFormModal = () => {
    setAddModalOpen(false)
    setSelectedData({});
    setUserType('');
  }

  if (!["Owner", "Admin"].includes(currentUserData.role)) {
    columns = columns.filter(col => col.key !== "action");
  }

  return (<React.Fragment>
    <div className="home-heading" >
      <h1>
        Role-Based Access Control (RBAC)
      </h1>
      <ACL roles={["Owner", "Admin"]}>
        <Button type="primary" onClick={() => {
          setAddModalOpen(true);
          setUserType("View")
        }} >Add User</Button>
      </ACL>
      <ACL roles={["Owner"]}>
        <Button type="primary" onClick={() => {
          setAddModalOpen(true);
          setUserType("Admin")
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
    <Modal open={addModalOpen} onCancel={onCloseRegistrationFormModal} footer={null} destroyOnClose={true} >
      <Suspense fallback={<Spin />}>
        <RegistrationForm req_type={Object.keys(selectedData)?.length ? "edit_user" : userType} onCloseRegistrationFormModal={onCloseRegistrationFormModal}
          selectedRecord={selectedData} />
      </Suspense>
    </Modal>
  </React.Fragment>);
}

export default Home;