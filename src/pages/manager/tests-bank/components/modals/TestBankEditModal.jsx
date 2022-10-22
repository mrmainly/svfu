import { Modal } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import EditHardTest from '../tabs/hard/EditHardTest'
import EditSoftTest from '../tabs/soft/EditSoftTest'

const TBEditModal = ({ open, setOpen, dataList }) => {
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Редактирование тестирования"
                visible={open}
                onCancel={() => setOpen(false)}
                style={{ top: 10 }}
                footer={[
                    <MyButton
                        key="submit"
                        htmlType="submit"
                        form={dataList[0]?.unit_type === 'SOFT' ? 'soft-edit-form' : 'tbedit-form'}
                    >
                        Сохранить
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
                {dataList[0]?.unit_type === 'SOFT' ? (
                    <EditSoftTest getData={dataList[0]} />
                ) : (
                    <EditHardTest dataList={dataList} />
                )}
            </Modal>
        </div>
    )
}

TBEditModal.propTypes = {
    dataList: PropTypes.array,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default TBEditModal
