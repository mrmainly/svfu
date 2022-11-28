import { Divider, Drawer, List } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import './drawer.css'

const MyDrawer = ({ open, onClose, setQuestion }) => {
    const { questionType } = useSelector((state) => state.constructor_question_slice)

    console.log(questionType)

    const data = [
        { label: 'Одиночный выбор', type: 'ANY' },
        { label: 'Множественный выбор', type: 'ANY' },
        { label: 'Ответ в свободной форме', type: 'SOFT' },
        { label: 'Установление соответствий', type: 'SOFT' },
        { label: 'Table quest', type: 'SOFT' },
        { label: 'Ответ в свободной форме(практическая часть)', type: 'HARD' },
    ]

    const commission = [
        { label: 'Ключ' },
        { label: 'Подсказка' },
        { label: 'Выставление баллов' },
        { label: 'Загрузить файла' },
    ]

    const handleQuestions = (item) => {
        setQuestion(item)
        onClose()
    }

    return (
        <Drawer title={'Вопросы'} placement={'right'} visible={open} onClose={onClose}>
            <Divider orientation={'left'}>Блок аттестуемого</Divider>
            <List
                size={'small'}
                bordered
                dataSource={data}
                renderItem={(item) => {
                    if (item.type === questionType || item.type === 'ANY') {
                        return (
                            <List.Item
                                onClick={() => handleQuestions(item.label)}
                                className="list-item"
                            >
                                {item.label}
                            </List.Item>
                        )
                    }
                }}
            />
            {questionType === 'SOFT' && (
                <>
                    <Divider orientation={'left'}>Блок комиссии</Divider>
                    <List
                        size={'small'}
                        bordered
                        dataSource={commission}
                        renderItem={(item) => {
                            return (
                                <List.Item
                                    onClick={() => handleQuestions(item.label)}
                                    className="list-item"
                                >
                                    {item.label}
                                </List.Item>
                            )
                        }}
                    />
                </>
            )}
        </Drawer>
    )
}
MyDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    setQuestion: PropTypes.func,
}
export default MyDrawer
