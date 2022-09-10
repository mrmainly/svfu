import { Modal, Typography } from 'antd'

import moment from 'moment'
import PropTypes from 'prop-types'

const { Text } = Typography

const ViewExamModal = ({ open, handleClose, data }) => {
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Просмотр тестирования"
                visible={open}
                onCancel={handleClose}
                footer={[]}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>
                        Квалификация: <span style={{ marginLeft: 5 }}>{data?.name}</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Время на тест: <span style={{ marginLeft: 5 }}>{data?.test_time}мин</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Допустимый балл теоретической части(в процентах):
                        <span style={{ marginLeft: 5 }}>{data?.pass_percent}%</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Проходной балл:
                        <span style={{ marginLeft: 5 }}>{data?.pass_score}</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Максимальный балл:
                        <span style={{ marginLeft: 5 }}>{data?.max_score}</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Создано:
                        <span style={{ marginLeft: 5 }}>
                            {moment(data?.date_start).format('DD.MM.YYYY, hh:mm')}
                        </span>
                    </Text>
                    <div
                        style={{
                            height: 1,
                            background: '#CED4DA',
                            width: '100%',
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    />
                    <Text>
                        Количество легких вопросов:
                        <span style={{ marginLeft: 5 }}>{data?.beginner_count}</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Балл за правильный ответ:
                        <span style={{ marginLeft: 5 }}>{data?.beginner_score}</span>
                    </Text>
                    <div
                        style={{
                            height: 1,
                            background: '#CED4DA',
                            width: '100%',
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    />
                    <Text>
                        Количество средних вопросов:
                        <span style={{ marginLeft: 5 }}>{data?.advanced_count}</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Балл за правильный ответ:
                        <span style={{ marginLeft: 5 }}>{data?.advanced_score}</span>
                    </Text>
                    <div
                        style={{
                            height: 1,
                            background: '#CED4DA',
                            width: '100%',
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    />
                    <Text>
                        Количество сложных вопросов:
                        <span style={{ marginLeft: 5 }}>{data?.expert_count}</span>
                    </Text>
                    <Text style={{ marginTop: 20 }}>
                        Балл за правильный ответ:
                        <span style={{ marginLeft: 5 }}>{data?.expert_score}</span>
                    </Text>
                </div>
            </Modal>
        </div>
    )
}

ViewExamModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    data: PropTypes.object,
}

export default ViewExamModal
