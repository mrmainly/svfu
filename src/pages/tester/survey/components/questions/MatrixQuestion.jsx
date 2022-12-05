import PropTypes from 'prop-types'
import { Form, Select } from 'antd'


const MatrixQuestion = ({questionMatrix, answerIndex}) => {
    return (
        <div>
            {questionMatrix?.map((questionMatrixItem, index) => (
                <div key={index}>
                    <Form.Item name={[answerIndex, 'matrix_answers', index, 'answers', 'a_id']} label={questionMatrixItem.name} labelCol={{ span: 24 }}>
                        <Select mode="multiple">
                            {questionMatrixItem.answers.map((answersItem, index) => (
                                <Select.Option value={answersItem.a_id} key={index}>
                                    {answersItem.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={[answerIndex, 'matrix_answers', index, 'q_id']}
                        initialValue={questionMatrix.id}
                        style={{ display: 'none' }}
                    ></Form.Item>
                </div>

            ))}
        </div>
    )
}

MatrixQuestion.propTypes = {
    questionMatrix: PropTypes.array,
    answerIndex: PropTypes.number,
}
export default MatrixQuestion