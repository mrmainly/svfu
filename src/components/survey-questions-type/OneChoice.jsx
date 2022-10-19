import { Form, Typography, Space, Radio } from 'antd'
import PropTypes from 'prop-types'

const { Text } = Typography

const OneChoice = ({ item }) => {
    return (
        <Form.Item
            name={item.question.id}
            htmlFor={item.id}
            style={{ marginTop: 20 }}
            labelCol={{ span: 24 }}
            label={<Text style={{ fontSize: 16 }}>Выберите ответ</Text>}
        >
            <Radio.Group style={{ marginTop: '-10px' }}>
                <Space direction="vertical">
                    {item.question.variant.map((item, index) => (
                        <Radio value={item.id} key={index}>
                            {item.name}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </Form.Item>
    )
}

OneChoice.propTypes = {
    item: PropTypes.any,
}

export default OneChoice
