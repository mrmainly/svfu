import { Form, Typography, Input } from 'antd'
import PropTypes from 'prop-types'

const { Text } = Typography
const { TextArea } = Input

const DetailedResponse = ({ item }) => {
    return (
        <Form.Item
            name={item.question.id}
            htmlFor={item.id}
            labelCol={{ span: 24 }}
            label={<Text style={{ fontSize: 16 }}>Напишите развернутый ответ</Text>}
            style={{ marginTop: 20 }}
        >
            <TextArea style={{ height: 134 }} />
        </Form.Item>
    )
}

DetailedResponse.propTypes = {
    item: PropTypes.any,
}

export default DetailedResponse
