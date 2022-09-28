import { Modal, message, Input, Select, Form } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import {
    usePostAttestationsQualificationMutation,
    useGetAttestationsTagListQuery,
} from '../../../../../services/manager/AttestationQualification'

const { TextArea } = Input
const { Option } = Select

const AQAddModal = ({ open, setOpen }) => {
    const [postAttestationsQualification] = usePostAttestationsQualificationMutation()
    const { data } = useGetAttestationsTagListQuery()
    const onSubmit = (data) => {
        postAttestationsQualification(data).then((res) => {
            if (res.data) {
                message.success('Квалификация создана')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание квалификации"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="aq-form">
                        Сохранить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{
                            background: '#FFF',
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form layout="vertical" onFinish={onSubmit} id="aq-form">
                    <Form.Item
                        label="Название квалификации"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Введите название квалификации',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Описание" name="description">
                        <TextArea />
                    </Form.Item>
                    <Form.Item label="Тег квалификации" name="tag_direction">
                        <Select placeholder="Выберите тег">
                            {data?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

AQAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default AQAddModal
