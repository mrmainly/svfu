import { Modal, message, Input, Select, Form } from 'antd'
import Item from 'antd/lib/list/Item'
import moment from 'moment'

import { MyButton } from '../../../../../components'

const QualificationModal = ({ open, setOpen, data }) => {
    const dataList = [
        {
            name: 'Выданный документ',
            label: data?.name,
        },
        {
            name: 'Номер документа',
            label: data?.id,
        },
        {
            name: 'Название курса',
            label: data?.direction,
        },
        {
            name: 'Дата выдачи документа',
            label: moment(data?.date_of_issue).format('hh.mm.yyyy'),
        },
        {
            name: 'Начало срока',
            label: moment(data?.date_start).format('hh.mm.yyyy'),
        },
        {
            name: 'Окончание срока',
            label: moment(data?.date_finish).format('hh.mm.yyyy'),
        },
        {
            name: 'Документ',
            // label: data?.file,
        },
    ]
    return (
        <div>
            <Modal
                title="Название квалификации"
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

export default QualificationModal
