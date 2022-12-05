import { Card, Form } from 'antd'
import ReactSummernote from 'react-summernote'

const DescribeQuestion = () => {
    return (
        <Card hoverable={false} title={`Ответ в свободной форме`} className="card">
            <Form.Item style={{ marginBottom: '-1px' }}>
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

export default DescribeQuestion
