import PropTypes from 'prop-types'
import { Form, Radio } from 'antd'


const OneChoiceQuestion = ({variants, answerIndex}) => {
    return (
        <Form.Item name={[answerIndex, 'a_id']}>
            <Radio.Group style={{display: 'flex', flexDirection: 'column'}}>
                {variants.map((item, index) => (
                    <Radio
                        value={item.id}
                        key={index}
                        style={{marginTop: 5}}
                    >
                        {item.name}
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    )
}

OneChoiceQuestion.propTypes = {
    variants: PropTypes.array,
    answerIndex: PropTypes.number,
}
export default OneChoiceQuestion