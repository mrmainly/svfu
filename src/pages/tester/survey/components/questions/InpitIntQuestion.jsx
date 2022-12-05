import { Form, InputNumber } from 'antd'
import PropTypes from 'prop-types'

const InputIntQuestion = ({countInput, answerIndex}) => {
    return (
        <div>
            {Array(countInput).fill(0).map((item, index) => (
                <div key={index}>
                    <Form.Item label={index+1} name={[answerIndex, 'input_answers', index, 'input_int']}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        name={[answerIndex, 'input_answers', index, 'a_id']}
                        initialValue={index+1}
                        style={{ display: 'none' }}
                    ></Form.Item>
                </div>
            ))}
        </div>

    )
}
InputIntQuestion.propTypes = {
    countInput: PropTypes.number,
    answerIndex: PropTypes.number,
}

export default InputIntQuestion