import { Col , Row, Typography } from 'antd'
import React from 'react'

const { Paragraph } = Typography

const Copyright = () => {
    const year = new Date().getFullYear()
  return (
    <footer>
        <Row>
            <Col span={24}>
                <Paragraph className=" text-center py-3 bg-linear-to-r from-indigo-700 to-violet-500 transition-all" style={{ marginBottom: '0', color: 'white' }}>
                    &copy; {year} Muhammad Sufyan Ali . All rights reserved.
                </Paragraph>
            </Col>
        </Row>
    </footer>
  )
}

export default Copyright