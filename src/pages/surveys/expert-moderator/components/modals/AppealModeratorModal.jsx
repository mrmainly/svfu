import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, message, Typography, Divider } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import {
    usePutAppealRejectIdMutation,
    usePutAppealAcceptIdMutation,
} from '../../../../../services/ModeratorService'
import ROUTES from '../../../../../routes'

const { Title } = Typography

const AppealModeratorModal = ({ id, surveyquest }) => {
    const [subscribe, setSubscribe] = useState(false)

    const [AppealReject] = usePutAppealRejectIdMutation()
    const [AppealAccept] = usePutAppealAcceptIdMutation()

    const { expertTheoreticalPartModalOpen } = useSelector((state) => state.survey_slice)
    const { openExpertTheoreticalPartOpen, openSubscribeModal, setTextAnswerExpert } =
        SurveysSlice.actions

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinishSubmit = () => {
        AppealAccept({ id: id }).then((res) => {
            if (res.data) {
                Modal.success({
                    title: 'Принято',
                    content: 'Апелляция принята!',
                })
                dispatch(openExpertTheoreticalPartOpen(false))
                navigate(ROUTES.ATTESTED_APPEAL)
            } else {
                message.error('Вы не оставили рекомендацию')
            }
        })
    }

    const handleClose = () => {
        AppealReject({ id: id }).then((res) => {
            if (res.data) {
                Modal.info({
                    title: 'Отклонено',
                    content: 'Апелляция отклонена!',
                })
                dispatch(openExpertTheoreticalPartOpen(false))
                navigate(ROUTES.ATTESTED_APPEAL)
            } else {
                message.error('Вы не оставили рекомендацию')
            }
        })
    }

    return (
        <>
            <Modal
                title="Заключение"
                visible={expertTheoreticalPartModalOpen}
                onOk={handleClose}
                onCancel={() => dispatch(openExpertTheoreticalPartOpen(false))}
                footer={[
                    <Button size="medium" type="primary" onClick={onFinishSubmit}>
                        Принять апелляцию
                    </Button>,
                    <Button size="medium" danger onClick={handleClose}>
                        Отклонить
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>Аттестуемый {surveyquest?.user}</Title>
                </div>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>
                        Тест был начат:
                        <span style={{ marginLeft: 10 }}>
                            {' '}
                            {moment(surveyquest?.exam_date_start).format('DD-MM-YYYY HH:mm:ss')}
                        </span>
                    </Title>
                </div>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title
                        level={5}
                        style={{
                            color:
                                surveyquest?.tester_percent_score <
                                surveyquest?.passing_percent_score
                                    ? 'red'
                                    : '#219653',
                        }}
                    >
                        Итоговые баллы: {surveyquest?.first_part_score}/{surveyquest?.max_score}
                        <span style={{ marginLeft: 10 }}>{surveyquest?.tester_percent_score}%</span>
                    </Title>
                </div>
                <Divider />
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
            </Modal>
        </>
    )
}

export default AppealModeratorModal
