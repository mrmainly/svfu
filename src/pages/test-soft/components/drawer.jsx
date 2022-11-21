import { Card, Divider, Drawer, List } from 'antd'
import PropTypes from 'prop-types'

const MyDrawer = ({open, onClose}) => {
    const data = [
        'Одиночный выбор',
        'Множественный выбор',
        'Ответ в свободной форме',
        'Установление соответствий',
        'Установление соответствий',
        'Загрузка файла',
    ]
    return(
        <Drawer
            title={"Вопросы"}
            placement={'right'}
            visible={open}
            onClose={onClose}
            mask={false}
        >
            <Divider orientation={'left'}>Блок аттестуемого</Divider>
            <List
                size={'small'}
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />

            <Divider orientation={'left'}>Блок комиссии</Divider>
            <Card size={'small'} hoverable >Ключ</Card>
            <Card size={'small'} hoverable>Подсказка</Card>
            <Card size={'small'} hoverable>Выставление баллов</Card>
            <Card size={'small'} hoverable>Загрузить файла</Card>
        </Drawer>
    )
}
MyDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}
export default MyDrawer