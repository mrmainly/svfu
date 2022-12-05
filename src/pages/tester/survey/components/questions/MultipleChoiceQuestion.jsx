import PropTypes from 'prop-types'
import { Form, Checkbox } from 'antd'


const MultipleChoiceQuestion = ({questionVariants, answerIndex}) => {
    return (
        <div>
            {questionVariants.map((item, index) => (
                <Form.Item name={[answerIndex, 'multiple_choices', index, 'a_id']} style={{marginBottom: 0}} key={index}>
                    <Checkbox value={item.id} style={{marginLeft: 1}}>
                        {item.name}
                    </Checkbox>
                </Form.Item>
            ))}
        </div>
    )
}

MultipleChoiceQuestion.propTypes = {
    questionVariants: PropTypes.array,
    answerIndex: PropTypes.number,
}
export default MultipleChoiceQuestion