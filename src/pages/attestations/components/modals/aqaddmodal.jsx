import { useState } from 'react'
import { Modal, message, Input, Select, Form } from 'antd'

import { MyButton } from '../../../../components'
import { usePostAttestationsQualificationMutation } from '../../../../services/AttestationService'

const { TextArea } = Input
const { Option } = Select

const AQAddModal = ({ open, setOpen }) => {
    const [postAttestationsQualification] = usePostAttestationsQualificationMutation()
    const onSubmit = (data) => {
        console.log(data)

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
    const onSearch = (value) => console.log(value)
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
                    <Form.Item label="Название квалификации" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Описание" name="description">
                        <TextArea />
                    </Form.Item>
                    <Form.Item label="Тег квалификации" name="tag_direction">
                        <Select placeholder="Выберите тег">
                            <Option value="1">История</Option>
                            <Option value="2">ХЫЗЫ</Option>
                            <Option value="3">АХАХАХАХАХ</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AQAddModal
