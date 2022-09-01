import React, { useState } from 'react'
import { Button, Modal, Form, Input, Checkbox, message, Select, Typography, Divider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendSubscribeExpertMutation } from '../../../../../services/ExpertService'

const { TextArea } = Input

const AnswerTheoreticalPartModeratorModal = ({ id, surveyquest }) => {
    const [subscribe, setSubscribe] = useState(false)

    const [sendSubscribeExpert] = useSendSubscribeExpertMutation()

    const { expertTheoreticalPartModalOpen } = useSelector((state) => state.survey_slice)
    const { openExpertTheoreticalPartOpen, openSubscribeModalModerator, setTextAnswerModerator } =
        SurveysSlice.actions

    const dispatch = useDispatch()

    const onFinishSubmit = (data) => {
        dispatch(setTextAnswerModerator([data.estimate, data.conclusion]))
        sendSubscribeExpert({ id: id }).then((res) => {
            if (res.data) {
                dispatch(openExpertTheoreticalPartOpen(false))
                dispatch(openSubscribeModalModerator(true))
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
                title="Вы уверены??"
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
                        form="form-moderator-theoretical-part"
                        type="primary"
                        disabled={!subscribe ? true : false}
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
                <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                    Заключение председателя экспертов по теоретической части
                </Typography>
                <div
                    style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '8px' }}
                >
                    <Typography>Рекомендация:</Typography>
                    <Typography>{surveyquest.main_expert_review_first_part}</Typography>
                </div>
                <Divider />
                <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                    Заключение председателя экспертов по практической части
                </Typography>
                <div
                    style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '8px' }}
                >
                    <Typography>Рекомендация:</Typography>
                    <Typography>{surveyquest.main_expert_review_second_part}</Typography>
                </div>
                {surveyquest.main_moderator && (
                    <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                        Заключения модераторов
                    </Typography>
                )}

                <Divider />
                <Form id="form-moderator-theoretical-part" onFinish={onFinishSubmit}>
                    <Form.Item required label="Аттестация" labelCol={{ span: 24 }} name="estimate">
                        <Select>
                            <Select.Option value="WAITING">Ожидание</Select.Option>
                            <Select.Option value="CERTIFIED">Aттестован</Select.Option>
                            <Select.Option value="CERTIFIED_WITH_ENCOURAGEMENT">
                                Аттестован с поощрением
                            </Select.Option>
                            <Select.Option value="CERTIFIED_UNDER_CERTAIN_CONDITIONS">
                                Аттестован при определенных условиях
                            </Select.Option>
                            <Select.Option value="NOT_CERTIFIED ">Не аттестован</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        required
                        label="Рекомендация"
                        labelCol={{ span: 24 }}
                        name="conclusion"
                    >
                        <TextArea placeholder="Рекомендация" style={{ height: 200 }} />
                    </Form.Item>
                </Form>
                <Checkbox onChange={onChange}>Подписать протокол</Checkbox>
            </Modal>
        </>
    )
}

export default AnswerTheoreticalPartModeratorModal
