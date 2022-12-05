import PropTypes from 'prop-types'
import { Form, Select } from 'antd'


const MatchingQuestion = ({firstColumn, secondColumn, answerIndex}) => {
    return (
        <div>
            {firstColumn?.map((firstItem, index) => (
                <div key={index}>
                    <Form.Item name={[answerIndex, 'matrix_answers', index, 'order_num']} label={firstItem.first_string}>
                        <Select>
                            {secondColumn.map((secondItem, index) => (
                                <Select.Option value={secondItem.second_string} key={index}>
                                    {secondItem.second_string}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={[answerIndex, 'matrix_answers', index, 'input_text']}
                        initialValue={firstItem.first_string}
                        style={{ display: 'none' }}
                    ></Form.Item>
                </div>

            ))}
        </div>
    )
}

MatchingQuestion.propTypes = {
    firstColumn: PropTypes.array,
    secondColumn: PropTypes.array,
    answerIndex: PropTypes.number,
}
export default MatchingQuestion