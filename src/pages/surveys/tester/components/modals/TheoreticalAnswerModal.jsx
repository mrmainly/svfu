import { Button, Modal, message } from 'antd'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { usePostResultPartOneMutation } from '../../../../../services/SurveysService'
import { SurveysSlice } from '../../../../../reducers/SurveysSlice'

const TheoreticalAnswerModal = ({ open, setOpen, id, postData, handleOpenFailedModal }) => {
    const [postResultPartOne] = usePostResultPartOneMutation()
    const { changePartTester } = SurveysSlice.actions

    const dispatch = useDispatch()

    const onFinishSubmit = () => {
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
                <p>Закончив тестовую часть, вы не сможете изменить свои ответы на вопросы</p>
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
}

export default TheoreticalAnswerModal
