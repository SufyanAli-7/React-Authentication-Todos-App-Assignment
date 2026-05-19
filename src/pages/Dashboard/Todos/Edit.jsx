import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
const { Title } = Typography

const visibilityOptions = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' }
]

const statusOptions = [
  { value: 'incompleted', label: 'Incompleted' },
  { value: 'completed', label: 'Completed' }
]

const initialState = {
  title: "",
  location: "",
  description: "",
  dueDate: null,
  visibility: "",
  status: ""
}

const Edit = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const params = useParams()
  const [form] = Form.useForm()


  const [state, setState] = useState(initialState)
  const [isAppLoading, setIsAppLoading] = useState(false)
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  useEffect(() => {
    const { id } = params
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    const todo = todos.find(t => t.id === id)
    if (!todo) {
      navigate("/dashboard/todos")
      return
    }
    setState(todo)
    form.setFieldsValue({
      ...todo,
      dueDate: todo.dueDate ? dayjs(todo.dueDate) : null
    })
  }, [form, navigate, params])

  const handleUpdate = () => {
    let { id, title, location, description, dueDate, visibility, status } = state
    title = title.trim()
    location = location.trim()
    description = description.trim()
    if (!title || !location || !description || !dueDate || !visibility || !status) { return window.toastify("Please fill all the fields", "error") }
    const todo = { id, title, location, description, dueDate, visibility, status }
    todo.updatedAt = Date.now()

    console.log("state", state)
    console.log("todo", todo)

    setIsAppLoading(true)

    const todos = JSON.parse(localStorage.getItem("todos")) || []
    const updatedTodos = todos.map(Item => {
      if (Item.id === id)
        return { ...Item, ...todo }
      return Item
    })

    localStorage.setItem("todos", JSON.stringify(updatedTodos))

    setTimeout(() => {
      setIsAppLoading(false)
      window.toastify("Todo updated successfully", "success")
      navigate("/dashboard/todos")
    }, 1000);
  }


  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="p-4 rounded-lg shadow-lg bg-white w-full max-w-lg py-5">

        <div className='flex justify-between items-center mb-9'>
          <Title level={2} style={{ marginBottom: '0' }} >Update Todo</Title>
          <Button type="primary" size="small" onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
        </div>

        <Form form={form} layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }, { min: 5, message: "Title must be at least 5 characters" }]}>
                <Input
                  name="title"
                  placeholder="Title"
                  size="large"
                  type="text"
                  value={state.title}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Location" name="location" rules={[{ required: true, message: "Please enter a location" }, { min: 3, message: "Location must be at least 3 characters" }]}>
                <Input
                  name="location"
                  placeholder="Location"
                  size="large"
                  type="text"
                  value={state.location}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description" }, { min: 10, message: "Description must be at least 10 characters" }]}>
                <Input.TextArea
                  name="description"
                  placeholder="Description"
                  size="large"
                  style={{ height: 100, resize: "none" }}
                  value={state.description}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Due Date" name="dueDate" rules={[{ required: true, message: "Please select a due date" }]}>
                <DatePicker size="large" className="w-full" placeholder="Select Due Date" value={state.dueDate ? dayjs(state.dueDate) : null} onChange={(obj, date) => setState(s => ({ ...s, dueDate: date }))} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Visibility" name="visibility" rules={[{ required: true, message: "Please select a visibility option" }]}>
                <Select
                  size="large"
                  placeholder="Select Visibility"
                  options={visibilityOptions}
                  value={state.visibility}
                  onChange={(value) => setState(s => ({ ...s, visibility: value }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status option" }]}>
                <Select
                  size="large"
                  placeholder="Select Status"
                  options={statusOptions}
                  value={state.status}
                  onChange={(value) => setState(s => ({ ...s, status: value }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" loading={isAppLoading} htmlType="submit" block size="large" onClick={handleUpdate}>
                Update Todo
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Edit