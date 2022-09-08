import { Modal } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'

const LprExamModal = ({ open, setOpen, data }) => {
    const dataList = [
        {
            name: '№',
            label: data?.id ? data?.id : '-',
        },
        {
            name: 'Статус:',
            label:
                data?.exam_status === 'WAITING'
                    ? 'Ожидает'
                    : data?.exam_status === 'IN_PROGRESS'
                    ? 'Идет тест'
                    : data?.exam_status === 'COMPLETED'
                    ? 'Завершен'
                    : data?.exam_status === 'CANCELLED'
                    ? 'Отменен'
                    : '-',
        },
        {
            name: 'Квалификация:',
            label: data?.direction ? data?.direction : '-',
        },
        {
            name: 'Тестирование:',
            label: data?.name ? data?.name : '-',
        },
        {
            name: 'Группа аттестуемых:',
            label: data?.test_group_id ? data?.test_group_id : '-',
        },
        {
            name: 'Количество аттестуемых:',
            label: data?.testers_count_from_group ? data?.testers_count_from_group : '-',
        },
        {
            name: 'Дата начала',
            label: data?.date_start ? moment(data?.date_start).format('DD.MM.YYYY, hh:mm') : '-',
        },
        {
            name: 'Дата окончания',
            label: data?.date_finish ? moment(data?.date_finish).format('DD.MM.YYYY, hh:mm') : '-',
        },
    ]
    return (
        <div>
            <Modal
                title="Экзамен"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="back" type="primary" onClick={() => setOpen(false)}>
                        ОК
                    </MyButton>,
                ]}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {dataList.map((item, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px' }}>
                            <div
                                style={{
                                    width: '200px',
                                    fontFamily: 'Roboto',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    letterSpacing: '0.005em',
                                    color: '#343434',
                                }}
                            >
                                {item.name}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'Roboto',
                                    fontWeight: 300,
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    letterSpacing: '0.005em',
                                    color: '#343434',
                                }}
                            >
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

LprExamModal.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default LprExamModal
