import { Button, Modal, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
    usePostResultPartOneMutation,
    usePostResultSoftMutation,
} from '../../../../../services/tester/Surveys'
import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import ROUTES from '../../../../../routes'

const TheoreticalAnswerModal = ({
    open,
    setOpen,
    id,
    postData,
    handleOpenFailedModal,
    unit_type,
}) => {
    const [postResultPartOne] = usePostResultPartOneMutation()
    const [postResultSoft] = usePostResultSoftMutation()
    const { changePartTester } = SurveysSlice.actions

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinishSubmit = () => {
        if (unit_type === 'HARD') {
            postResultPartOne({ body: postData, id: id }).then((res) => {
                if (res.data) {
                    if (res.data.survey_status === 'ON_REVIEW') {
                        handleOpenFailedModal()
                    } else {
                        dispatch(changePartTester('p-p'))
                    }
                } else {
                    message.error('что то пошло не так :)')
                }
            })
        } else {
            postResultSoft({ body: postData, id: id }).then((res) => {
                if (res.data) {
                    message.success('Тест пройдет, ожидайте результаты')
                    navigate(ROUTES.AVAILABLE_TESTS)
                } else {
                    message.error('что то пошло не так :)')
                }
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Modal
                title="Вы уверены?"
                visible={open}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <Button size="medium" onClick={onFinishSubmit} key="end" type="primary">
                        Закончить тестирование
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
                {unit_type === 'HARD' ? (
                    <p>Закончив тестовую часть, вы не сможете изменить свои ответы на вопросы</p>
                ) : (
                    <p>Закончив тест, вы не сможете изменить свои ответы на вопросы</p>
                )}
            </Modal>
        </>
    )
}

TheoreticalAnswerModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    id: PropTypes.number,
    postData: PropTypes.any,
    handleOpenFailedModal: PropTypes.func,
    unit_type: PropTypes.string,
}

export default TheoreticalAnswerModal
