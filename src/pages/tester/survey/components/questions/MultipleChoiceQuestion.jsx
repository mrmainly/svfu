import PropTypes from 'prop-types'
import { Form, Checkbox } from 'antd'


const MultipleChoiceQuestion = ({questionVariants, answerIndex}) => {
    return (
        <div>
            <Form.Item name={[answerIndex, 'multiple_choices', 'a_id']}>
                <Checkbox.Group
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '-10px',
                    }}
                >
                    {questionVariants.map((item, index) => (
                        <Checkbox value={item.id} key={index} style={{marginTop: 10, marginLeft: 1}}>
                            {item.name}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Form.Item>
        </div>
    )
}

MultipleChoiceQuestion.propTypes = {
    questionVariants: PropTypes.array,
    answerIndex: PropTypes.number,
}
export default MultipleChoiceQuestion