import { useState, useEffect } from 'react'
import { Modal, message, Input, Select, Form, Switch, Typography, Space } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../components'
import {
    usePatchAttestationsQualificationIdMutation,
    usePutAttestationsQualificationIdMutation,
    useGetAttestationsTagQuery,
} from '../../../../services/AttestationService'

const { TextArea } = Input
const { Option } = Select

const AQEditModal = ({ open, setOpen, dataList }) => {
    const [patchAttestationsQualificationId] = usePatchAttestationsQualificationIdMutation()
    const [putAttestationsQualificationId] = usePutAttestationsQualificationIdMutation()
    const { data } = useGetAttestationsTagQuery()
    const [active, setActive] = useState()

    const onSubmit = (data) => {
        patchAttestationsQualificationId({ id: dataList[0].id, body: data }).then((res) => {
            if (res.data) {
                message.success('Квалификация изменена')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
        if (active !== dataList[0]?.is_active) {
            putAttestationsQualificationId({ id: dataList[0].id }).then((res) => {
                if (!res.data) {
                    message.error(res.error.data.errors[0])
                }
            })
        }
    }

    useEffect(() => {
        setActive(dataList[0]?.is_active)
    }, [dataList])
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
                        ['tag_direction']: dataList[0]?.tag_direction?.id,
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
                        <Select placeholder="Выберите тег">
                            {data?.results.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Space align="baseline">
                        <Form.Item>
                            <Switch defaultChecked={active} onChange={setActive} />
                        </Form.Item>
                        <Typography>Активность квалификации</Typography>
                    </Space>
                </Form>
            </Modal>
        </div>
    )
}

AQEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    dataList: PropTypes.array,
}

export default AQEditModal
