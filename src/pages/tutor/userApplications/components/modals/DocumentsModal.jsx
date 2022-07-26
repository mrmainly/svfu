import { Modal } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'

const DocumentsModal = ({ open, setOpen, data }) => {
    const dataList = [
        {
            name: 'Тип документа:',
            label:
                data?.document_type === 'DIPLOMA'
                    ? 'Диплом'
                    : data?.document_type === 'TITLESDEGREES'
                    ? 'Образование, ученая степень'
                    : data?.document_type === 'PASSPORT'
                    ? 'Паспорт'
                    : '-',
        },
        {
            name: 'Описание:',
            label: data?.name ? data?.name : '-',
        },
        {
            name: 'Документ:',
            label: data?.file ? (
                <a href={data?.file} target="_blank" rel="noopener noreferrer">
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
                title="Документ"
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

DocumentsModal.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default DocumentsModal
