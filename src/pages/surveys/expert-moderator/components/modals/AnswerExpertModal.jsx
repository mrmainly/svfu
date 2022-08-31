import React, { useState } from 'react'
import { Button, Modal, Form, Input, Checkbox, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendSubscribeExpertMutation } from '../../../../../services/ExpertService'

const { TextArea } = Input

const AnswerTheoreticalPartExpertModal = ({ id }) => {
    const [subscribe, setSubscribe] = useState(false)

    const [sendSubscribeExpert] = useSendSubscribeExpertMutation()

    const { expertTheoreticalPartModalOpen } = useSelector((state) => state.survey_slice)
    const { openExpertTheoreticalPartOpen, openSubscribeModal, setTextAnswerExpert } =
        SurveysSlice.actions

    const dispatch = useDispatch()

    const onFinishSubmit = (data) => {
        dispatch(setTextAnswerExpert([data.conclusion_first_part, data.conclusion_second_part]))
        sendSubscribeExpert({ id: id }).then((res) => {
            if (res.data) {
                dispatch(openExpertTheoreticalPartOpen(false))
                dispatch(openSubscribeModal(true))
            } else {
                message.error('Вы не оставили рекомендацию')
            }
        })
        console.log(data)
    }

    const handleClose = () => {
        dispatch(openExpertTheoreticalPartOpen(false))
    }

    const onChange = (e) => {
        setSubscribe(e.target.checked)
    }

    return (
        <>
            <Modal
                title="Вы уверены?"
                visible={expertTheoreticalPartModalOpen}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <Button
                        size="medium"
                        style={{
                            borderRadius: 4,
                        }}
                        key="save"
                        form="form-expert-theoretical-part"
                        type="primary"
                        disabled={subscribe === false ? true : false}
                        htmlType="submit"
                    >
                        Отправить
                    </Button>,
                    <Button
                        size="medium"
                        style={{
                            background: '#6C757D',
                            color: 'white',
                            borderRadius: 4,
                        }}
                        onClick={handleClose}
                        key="back"
                    >
                        Отмена
                    </Button>,
                ]}
            >
                <Form id="form-expert-theoretical-part" onFinish={onFinishSubmit}>
                    <Form.Item
                        required
                        label="Заключение по теоретической части"
                        labelCol={{ span: 24 }}
                        name="conclusion_first_part"
                    >
                        <TextArea
                            placeholder="Напишите заключение по теоретической части"
                            style={{ height: 200 }}
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        label="Заключение по практической части"
                        labelCol={{ span: 24 }}
                        name="conclusion_second_part"
                    >
                        <TextArea
                            placeholder="Напишите заключение по теоретической части"
                            style={{ height: 200 }}
                        />
                    </Form.Item>
                </Form>
                <Checkbox onChange={onChange}>Подписать протокол</Checkbox>
            </Modal>
        </>
    )
}

export default AnswerTheoreticalPartExpertModal
