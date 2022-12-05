import PropTypes from 'prop-types'
import { Form } from 'antd'
import ReactSummernote from 'react-summernote'


const DescribeQuestion = ({answerIndex}) => {
    return (
        <Form.Item name={[answerIndex, 'describe']}>
            <ReactSummernote
                value="Default value"
                options={{
                    lang: 'ru-RU',
                    height: 250,
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture']],
                        ['view', ['codeview']],
                    ],
                }}
            />
        </Form.Item>
    )
}

DescribeQuestion.propTypes = {
    answerIndex: PropTypes.number,
}
export default DescribeQuestion