import { Card, Form } from 'antd'
import ReactSummernote from 'react-summernote'

const Description = () => {
    return (
        <Card hoverable={false} title={`Задание и описание вопроса`} className="card">
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: 'Задание и описание вопроса является обязательным полем',
                    },
                ]}
                name="description"
                style={{ marginBottom: 0 }}
            >
                <ReactSummernote
                    // onInit={data && onInit}
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

export default Description