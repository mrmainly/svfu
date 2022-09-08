import { Button, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import { usePostResultPartOneMutation } from '../../../../../services/SurveysService'
import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import ROUTES from '../../../../../routes'

const TheoreticalAnswerModal = ({ open, setOpen, id, postData }) => {
    const [postResultPartOne] = usePostResultPartOneMutation()
    const { changePartTester } = SurveysSlice.actions

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinishSubmit = () => {
        postResultPartOne({ body: postData, id: id }).then((res) => {
            if (res.data) {
                if (res.data.survey_status === 'ON_REVIEW') {
                    message.error('Вы не прошли тестовую часть')
                    navigate(ROUTES.AVAILABLE_TESTS)
                } else {
                    dispatch(changePartTester('p-p'))
                }
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
                    <MyButton size="medium" onClick={onFinishSubmit} key="end">
                        Закончить тестирование
                    </MyButton>,
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
}

export default TheoreticalAnswerModal
