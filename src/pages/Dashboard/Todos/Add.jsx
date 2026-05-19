import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
const { Title } = Typography

const visibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' }
]

const initialState = {
    title: "",
    location: "",
    description: "",
    dueDate: null,
    visibility: ""
}

const Add = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [state, setState] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(false)
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleAdd = () => {
        let { title, location, description, dueDate, visibility } = state
        title = title.trim()
        location = location.trim()
        description = description.trim()
        if (!title || !location || !description || !dueDate || !visibility) { return window.toastify("Please fill all the fields", "error") }
        const todo = { title, location, description, dueDate, visibility }
        todo.id = window.getRandomId()
        todo.status = "incompleted"
        todo.createdAt = Date.now()
        todo.createdBy = user.uid

        setIsAppLoading(true)

        const todos = JSON.parse(localStorage.getItem("todos")) || []
        todos.push(todo)
        localStorage.setItem("todos", JSON.stringify(todos))

        setTimeout(() => {
            setIsAppLoading(false)
            navigate("/dashboard/todos")
            window.toastify("Todo added successfully", "success")
        }, 1000);
    }

    return (
        <div className="min-h-dvh flex items-center justify-center">
            <div className="p-4 rounded-lg shadow-lg bg-white w-full max-w-lg py-5">

                <div className='flex justify-between items-center mb-9'>
                    <Title level={2} style={{ marginBottom: '0' }} >Add Todo</Title>
                    <Button type="primary" size="small" onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
                </div>

                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }, { min: 5, message: "Title must be at least 5 characters" }]}>
                                <Input
                                    name="title"
                                    placeholder="Title"
                                    size="large"
                                    type="text"
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
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Due Date" name="dueDate" rules={[{ required: true, message: "Please select a due date" }]}>
                                <DatePicker size="large" className="w-full" placeholder="Select Due Date" onChange={(obj, date) => setState(s => ({ ...s, dueDate: date }))} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Visibility" name="visibility" rules={[{ required: true, message: "Please select a visibility option" }]}>
                                <Select
                                    size="large"
                                    placeholder="Select Visibility"
                                    options={visibilityOptions}
                                    onChange={(value) => setState(s => ({ ...s, visibility: value }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button type="primary" loading={isAppLoading} htmlType="submit" block size="large" onClick={handleAdd}>
                                Add Todo
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Add