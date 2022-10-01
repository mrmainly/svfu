import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import ROUTES from '../../../../../routes'

const FailedModal = ({ open, handleClose }) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(ROUTES.AVAILABLE_TESTS)
    }

    return (
        <>
            <Modal
                title="Вы провалили тестирование!"
                visible={open}
                onOk={handleClose}
                footer={[
                    <MyButton size="medium" onClick={handleNavigate} key="end">
                        Перейти к остальным тестам
                    </MyButton>,
                ]}
            >
                <p>Вы провалили тестирование</p>
            </Modal>
        </>
    )
}

FailedModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default FailedModal
