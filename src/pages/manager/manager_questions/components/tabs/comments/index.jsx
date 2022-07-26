import { Card, Form } from 'antd'
import ReactSummernote from 'react-summernote'

const TestSoftComments = () => {
    const onChange = (content) => {
        console.log('onChange', content)
    }

    return (
        <div>
            <Card title={`Подсказка для комиссии`} style={{ marginBottom: '12px' }}>
                <Form.Item name="comment">
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
                        onChange={(content) => onChange(content)}
                    />
                </Form.Item>
            </Card>

            {/* <Card hoverable={true} title={`Документ для комиссии`} style={{ marginBottom: '12px' }}>
                <Upload>
                    <Button icon={<UploadOutlined />}>Загрузить документ</Button>
                </Upload>
            </Card> */}
        </div>
    )
}

export default TestSoftComments
