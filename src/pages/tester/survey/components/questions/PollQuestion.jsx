import PropTypes from 'prop-types'
import { Form, Select } from 'antd'


const PollQuestion = ({questionPoll, answerIndex}) => {
    return (
        <div>
            {questionPoll?.strings.map((stringsItem, index) => (
                <div key={index}>
                    <Form.Item name={[answerIndex, 'matrix_answers', index, 'answers', 'a_id']} label={stringsItem.name}>
                        <Select>
                            {questionPoll.columns.map((columnsItem, index) => (
                                <Select.Option value={columnsItem.id_column} key={index}>
                                    {columnsItem.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={[answerIndex, 'matrix_answers', index, 'q_id']}
                        initialValue={stringsItem.id_string}
                        style={{ display: 'none' }}
                    ></Form.Item>
                </div>

            ))}
        </div>
    )
}

PollQuestion.propTypes = {
    questionPoll: PropTypes.array,
    answerIndex: PropTypes.number,
}
export default PollQuestion