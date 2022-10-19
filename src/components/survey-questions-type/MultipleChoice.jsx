import { Form, Checkbox, Typography } from 'antd'
import PropTypes from 'prop-types'

const { Text } = Typography

const MultipleChoice = ({ item }) => {
    return (
        <Form.Item
            name={item.question.id}
            htmlFor={item.id}
            labelCol={{ span: 24 }}
            label={<Text style={{ fontSize: 16 }}>Выберите несколько ответов</Text>}
            style={{ marginTop: 20 }}
        >
            <Checkbox.Group
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '-10px',
                }}
            >
                {item.question.variant.map((item, index) => (
                    <Checkbox
                        style={{
                            marginTop: 10,
                            marginLeft: 1,
                        }}
                        key={index}
                        value={item.id}
                    >
                        {item.name}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </Form.Item>
    )
}

MultipleChoice.propTypes = {
    item: PropTypes.any,
}

export default MultipleChoice
