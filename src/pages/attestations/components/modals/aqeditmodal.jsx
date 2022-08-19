import { useState } from 'react'
import { Modal, message, Input, Select, Form, Switch, Typography, Space } from 'antd'

import { MyButton } from '../../../../components'
import {
    usePatchAttestationsQualificationIdMutation,
    usePutAttestationsQualificationIdMutation,
} from '../../../../services/AttestationService'

const { TextArea } = Input
const { Option } = Select

const AQEditModal = ({ open, setOpen, dataList }) => {
    const [patchAttestationsQualificationId] = usePatchAttestationsQualificationIdMutation()
    const [putAttestationsQualificationId] = usePutAttestationsQualificationIdMutation()

    const onSubmit = (data) => {
        console.log(active)
        patchAttestationsQualificationId({ id: dataList[0].id, body: data }).then((res) => {
            if (res.data) {
                message.success('Квалификация изменена')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
        {
            active ? (
                putAttestationsQualificationId({ id: dataList[0].id, body: data }).then((res) => {
                    if (res.data) {
                        message.success('Квалификация изменена')
                        setOpen(false)
                    } else {
                        message.error(res.error.data.errors[0])
                    }
                    console.log(res)
                })
            ) : (
                <></>
            )
        }
    }
    const onSearch = (value) => console.log(value)
    const [active, setActive] = useState(true)
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Редактирование квалификации"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="aqedit-form">
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
                <Form
                    layout="vertical"
                    initialValues={{
                        ['name']: dataList[0]?.name,
                        ['description']: dataList[0]?.description,
                    }}
                    onFinish={onSubmit}
                    id="aqedit-form"
                >
                    <Form.Item label="Название квалификации" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Описание" name="description">
                        <TextArea />
                    </Form.Item>
                    <Form.Item label="Тег квалификации" name="tag_direction">
                        <Select
                            placeholder="Выберите тег"
                            defaultValue={{
                                value: dataList[0]?.tag_direction.id,
                                label: dataList[0]?.tag_direction.name,
                            }}
                        >
                            <Option value="1">История</Option>
                            <Option value="2">ХЫЗЫ</Option>
                            <Option value="3">АХАХАХАХАХ</Option>
                        </Select>
                    </Form.Item>
                    <Space align="baseline">
                        <Form.Item>
                            <Switch onChange={setActive}></Switch>
                        </Form.Item>
                        <Typography>Активность квалификации</Typography>
                    </Space>
                </Form>
            </Modal>
        </div>
    )
}

export default AQEditModal
