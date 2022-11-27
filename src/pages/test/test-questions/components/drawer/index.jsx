import { Card, Divider, Drawer, List } from 'antd'
import PropTypes from 'prop-types'

const MyDrawer = ({ open, onClose, setQuestion }) => {
    const data = [
        'Одиночный выбор',
        'Множественный выбор',
        'Ответ в свободной форме',
        'Установление соответствий',
        'Установление соответствий',
        'Загрузка файла',
    ]

    const handleQuestions = (item) => {
        setQuestion(item)
        onClose()
    }

    return (
        <Drawer title={'Вопросы'} placement={'right'} visible={open} onClose={onClose} mask={false}>
            <Divider orientation={'left'}>Блок аттестуемого</Divider>
            <List
                size={'small'}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <div onClick={() => handleQuestions(item)} style={{ cursor: 'pointer' }}>
                            {item}
                        </div>
                    </List.Item>
                )}
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
