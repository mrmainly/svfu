import { useState } from 'react'
import { Modal, Tabs } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import CreateHardTest from '../tabs/hard/CreateHardTest'
import CreateSoftTest from '../tabs/soft/CreateSoftTest'

const TBAddModal = ({ open, setOpen }) => {
    const [tab, setTab] = useState('1')

    const handleTab = (activeKey) => {
        setTab(activeKey)
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание тестирования"
                visible={open}
                onCancel={() => {
                    setOpen(false)
                }}
                style={{ top: 10 }}
                footer={[
                    <MyButton
                        key="submit"
                        htmlType="submit"
                        form={tab === '1' ? 'tbadd-form' : 'soft-create-form'}
                    >
                        Сохранить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Tabs style={{ marginTop: '-10px' }} activeKey={tab} onChange={handleTab}>
                    <Tabs.TabPane tab="Создание Hard теста" key="1">
                        <CreateHardTest setOpen={setOpen} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Создание Soft теста" key="2">
                        <CreateSoftTest setOpen={setOpen} />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </div>
    )
}

TBAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default TBAddModal
