import { Modal, Select } from 'antd'

import { MyButton } from '../../../../components'

const ViewSurveyModal = ({ open, setOpen }) => {
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание тестирования"
                visible={open}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            ></Modal>
        </div>
    )
}

export default ViewSurveyModal
