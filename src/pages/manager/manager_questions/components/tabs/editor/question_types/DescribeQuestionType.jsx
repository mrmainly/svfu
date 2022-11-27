import { Card, Form } from 'antd'
import ReactSummernote from 'react-summernote'

const DescribeQuestionType = () => {
    return (
        <Card hoverable={false} title={`Ответ в свободной форме`} style={{ marginBottom: '12px' }}>
            <Form.Item>
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
        </Card>
    )
}

export default DescribeQuestionType
