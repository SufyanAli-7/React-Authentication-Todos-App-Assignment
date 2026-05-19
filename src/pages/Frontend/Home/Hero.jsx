import { Typography, Button, Table } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const { Title,Text } = Typography


const Hero = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    const filteredTodos = todos.filter(todo => todo.visibility === "public")
    setTodos(filteredTodos.map(todo => ({ ...todo, key: todo.id })))
  },[])

  // const handleDelete = (record) => {
  //   const filteredTodosDeleted = todos.filter(todo => todo.id !== record.id)
  //   setTodos(filteredTodosDeleted)
  //   localStorage.setItem("todos", JSON.stringify(filteredTodosDeleted))
  //    window.toastify("Todo deleted successfully", "success")
  // }

  const columns = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
    },
    {
      key: 'location',
      title: 'Location',
      dataIndex: 'location',
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      dataIndex: 'dueDate',
      render: dueDate => <Text>{dayjs(dueDate).format("ddd DD-MMM-YYYY")}</Text>
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: status => {
        let color = "red"
        if (status === "completed") {
          color = "green"
        }
        return <span className="text-capitalize" style={{ color }}>{status}</span>
      }
    },
    {
      key: 'createdAt',
      title: 'Created At',
      dataIndex: 'createdAt',
      render: createdAt => <Text>{dayjs(createdAt).format("ddd DD-MMM-YYYY")}</Text>
    },
    {
      key: 'visibility',
      title: 'Visibility',
      dataIndex: 'visibility',
      render: visibility => {
        let color = "blue"
        if (visibility === "private") {
          color = "green"
        }
        return <span className="text-capitalize" style={{ color }}>{visibility}</span>
      }
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Dropdown menu={{
    //       items:[
    //         {
    //           label:"Edit",
    //           key:"edit",
    //           icon:<EditOutlined style={{color:"blue"}} onClick={() => { navigate(`/dashboard/todos/edit/${record.id}`) }} />
    //         },
    //         {
    //           label:"Delete",
    //           key:"delete",
    //           icon:<DeleteOutlined style={{color:"red"}} onClick={() => {handleDelete(record)}} />
    //         }
    //       ]
    //     }} trigger={'click'}>
    //       <Button className="border-0" icon={<MoreOutlined />} />
    //     </Dropdown>
    //   ),
    // },
  ];

  return (
    <main className="py-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center justify-between mb-5">
        <Title level={2} style={{ marginBottom: '0'}}>Todos</Title>
        <Button type="primary" size="small" onClick={() => { navigate("/dashboard/todos/add") }}>Add Todo</Button>
      </div>
      <Table rowKey="id" pagination={{ pageSize: 5, showSizeChanger: false }} columns={columns} dataSource={todos} scroll={{ x: 'max-content' }} />
    </main>
  )
}

export default Hero