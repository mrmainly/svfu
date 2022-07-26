import { useState } from 'react'
import { Button, Modal, Radio, Space} from 'antd'
import PropTypes from 'prop-types'

import ROUTES from '../../../../../routes'
import { useNavigate } from 'react-router-dom'

const TBAddModal = ({ open, setOpen }) => {
    const [value, setValue] = useState(1)
    const navigate = useNavigate()
    const handleOk = () => {
        setOpen(false)
        navigate(ROUTES.TEST_CREATE, {
            state: {
                type: value,
            },
        })
    }
    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                visible={open}
                title={'Добавление нового теста'}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Добавить
                    </Button>,
                ]}
            >
                <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>
                            <div>
                                <div style={{ fontWeight: 700 }}>Психологический тест</div>
                                <div style={{ fontStyle: 'italic' }}>
                                    Суммируем баллы за ответы (или определяем преобладающий вариант
                                    ответа) и выводим текстовую расшифровку.
                                </div>
                            </div>
                        </Radio>
                        <Radio value={2}>
                            <div>
                                <div style={{ fontWeight: 700 }}>Хард тест</div>
                                <div style={{ fontStyle: 'italic' }}>
                                    Тестовая и практическая части
                                </div>
                            </div>
                        </Radio>
                        <Radio value={3}>
                            <div>
                                <div style={{ fontWeight: 700 }}>Личностный тест</div>
                                <div style={{ fontStyle: 'italic' }}>
                                    Сопоставляем каждый вариант ответа с определенным результатом и
                                    выбираем преобладающий.
                                </div>
                            </div>
                        </Radio>
                        <Radio value={4}>
                            <div>
                                <div style={{ fontWeight: 700 }}>Образовательный тест</div>
                                <div style={{ fontStyle: 'italic' }}>
                                    Суммируем количество баллов за правильные ответы, определяем
                                    процент от максимального количества баллов и выставляем оценку.
                                </div>
                            </div>
                        </Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        </div>
    )
}

TBAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default TBAddModal
