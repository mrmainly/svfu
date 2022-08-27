import { Modal } from 'antd'
import moment from 'moment'

import { MyButton } from '../../../../../../components'

const QualificationDetailModal = ({ open, setOpen, data }) => {
    const dataList = [
        {
            name: 'Выданный документ:',
            label: data?.name ? data?.name : '-',
        },
        {
            name: 'Номер документа:',
            label: data?.id ? data?.id : '-',
        },
        {
            name: 'Название курса:',
            label: data?.direction ? data?.direction : '-',
        },
        {
            name: 'Дата выдачи документа:',
            label: data?.date_of_issue ? moment(data?.date_of_issue).format('hh.mm.yyyy') : '-',
        },
        {
            name: 'Начало срока:',
            label: data?.date_start ? moment(data?.date_start).format('hh.mm.yyyy') : '-',
        },
        {
            name: 'Окончание срока:',
            label: data?.date_finish ? moment(data?.date_finish).format('hh.mm.yyyy') : '-',
        },
        {
            name: 'Документ:',
            label: data?.file ? (
                <a href={data?.file} target="_blank">
                    {decodeURI(data?.file).split('/')[5]}
                </a>
            ) : (
                '-'
            ),
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

export default QualificationDetailModal
