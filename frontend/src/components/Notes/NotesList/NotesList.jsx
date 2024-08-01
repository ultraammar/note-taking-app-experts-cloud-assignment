import React, { useEffect, useState } from 'react'
import "./NotesList.scss"
import { Button, Flex, Layout, message, Space, Table, theme } from 'antd'
import { Link } from 'react-router-dom'
import { PlusSquareTwoTone } from '@ant-design/icons'
import axios from 'axios'
import GenericModal from '../../common/Modal/GenericModal'
import { useDispatch, useSelector } from 'react-redux'

const NotesList = () => {
  //loading indicator message popup
const [loadingApi, loadingContextHolder] = message.useMessage();
const showLoading = (message) => {
  loadingApi.open({
    type: 'loading',
    content: `${message}`,  
    duration: 0,
  });
};

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // modal options
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//store deleteMethod into a state
  const [deleteMethod, setDeleteMethod] = useState(null);
  
  

  //handleDelete method stores a deleteMethod in the state and sets the isDeleteModalOpen to true
  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteMethod(() => () => {
      axios.delete(`/notes/${id}`).then(() => {
        fetchData();
      });
    });
  };

  const [data, setData] = useState([]);
const fetchData = async () => {     
    try {
      showLoading("Fetching notes...");
      const response = await axios.post("/notes/getList", {user_id: session.user_id});
      setData(response.data);
    } catch (error) {
      console.log(error);     
    }finally {
      // Dismiss manually and asynchronously
        setTimeout(() => loadingApi.destroy(), 0);
      }
  }

  useEffect(() => {
    fetchData(); // Ensure data is fetched first
  }, []);


  //table columns
  const columns = [
    { title: "id", dataIndex: "id", key: "id", width: 70 },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description", 
      dataIndex: "description",
      key: "description",
    },  
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/notes/update/${record.id}`}>Edit</Link>
          <Link onClick={() => handleDelete(record.id)}>Delete</Link>
        </Space>
      ),
    },
  ];
  return (
    <Layout
      style={{
        margin: "20px 16px",
        borderRadius: borderRadiusLG,
        // padding: 30,
        background: "linear-gradient(180deg, #000f2e 0%, #001f4b 100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loadingContextHolder}
      <Flex gap="small" wrap justify="right">
        <Link to={`/notes/new`}>
          <Button
            type="primary"
            shape="round"
            icon={<PlusSquareTwoTone />}
            size={"large"}
          >
            Add Note
          </Button>
        </Link>
      </Flex>
      <Layout
        style={{
          margin: "20px 0",
          borderRadius: borderRadiusLG,
          padding: 30,
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          scroll={{ x: 1000 }}
        />
        <GenericModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          title="Confirmation"
          okMethod={() => deleteMethod()}
        >Are you sure you want to delete this note?</GenericModal>
      </Layout>
    </Layout>
  )
}

export default NotesList