import React from 'react'
import { Modal, message } from 'antd'
import PropTypes from 'prop-types'

import { useAppealPutMutation } from '../../../../services/SurveysService'
import { MyButton } from '../../../../components'

const CancelModal = ({ open, setOpen, ID }) => {
    const [appealPut] = useAppealPutMutation()
    const onSubmit = () => {
        appealPut({ id: ID }).then((res) => {
            if (res.data) {
                Modal.success({
                    content: 'Аппеляция отменена!',
                })
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="АППЕЛЯЦИЯ"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={[
                    <MyButton key="submit" htmlType="submit" onClick={() => onSubmit()}>
                        Отправить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                Вы уверены?
            </Modal>
        </div>
    )
}

CancelModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    ID: PropTypes.number,
}

export default CancelModal
