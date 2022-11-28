import { Card, Divider, Drawer, List } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import './drawer.css'

const MyDrawer = ({ open, onClose, setQuestion }) => {
    const { questionType } = useSelector((state) => state.constructor_question_slice)

    const data = [
        { label: 'Одиночный выбор', type: 'any' },
        { label: 'Множественный выбор', type: 'any' },
        { label: 'Ответ в свободной форме', type: 'SOFT' },
        { label: 'Установление соответствий', type: 'SOFT' },
        { label: 'Table quest', type: 'SOFT' },
        { label: 'Ответ в свободной форме(практическая часть)', type: 'HARD' },
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
                    if (item.type === questionType || item.type === 'any') {
                        return (
                            <List.Item>
                                <div
                                    onClick={() => handleQuestions(item.label)}
                                    className="list-item"
                                >
                                    {item.label}
                                </div>
                            </List.Item>
                        )
                    }
                }}
            />

            <Divider orientation={'left'}>Блок комиссии</Divider>
            <Card size={'small'} hoverable>
                Ключ
            </Card>
            <Card size={'small'} hoverable>
                Подсказка
            </Card>
            <Card size={'small'} hoverable>
                Выставление баллов
            </Card>
            <Card size={'small'} hoverable>
                Загрузить файла
            </Card>
        </Drawer>
    )
}
MyDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    setQuestion: PropTypes.func,
}
export default MyDrawer
