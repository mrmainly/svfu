import { Divider, Drawer, List } from 'antd'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { ConstructorQuestionSlice } from '../../../../../reducers/ConstructorQuestionSlice'
import './drawer.css'

const MyDrawer = ({ open, onClose }) => {
    const { questionType } = useSelector((state) => state.constructor_question_slice)
    const { handleTechnique } = ConstructorQuestionSlice.actions

    const dispatch = useDispatch()

    const data = [
        { label: 'Одиночный выбор', type: 'ANY', technique: 'ONE_CHOICE' },
        { label: 'Множественный выбор', type: 'ANY', technique: 'MULTIPLE_CHOICE' },
        { label: 'Ответ в свободной форме', type: 'SOFT', technique: 'DESCRIBE' },
        { label: 'Установление соответствий', type: 'ANY', technique: 'MATCHING' },
        { label: 'Table quest', type: 'SOFT' },
        {
            label: 'Текстовое поле',
            type: 'ANY',
            technique: 'INPUT_TEXT',
        },
        {
            label: 'Числовое поле',
            type: 'ANY',
            technique: 'INPUT_INT',
        },
        {
            label: 'Ответ в свободной форме(практическая часть)',
            type: 'HARD',
            technique: 'DESCRIBE',
        },
    ]

    // const commission = [
    //     { label: 'Ключ' },
    //     { label: 'Подсказка' },
    //     { label: 'Выставление баллов' },
    //     { label: 'Загрузить файла' },
    // ]

    const handleQuestions = (item) => {
        dispatch(handleTechnique(item))
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
                                onClick={() => handleQuestions(item.technique)}
                                className="list-item"
                            >
                                {item.label}
                            </List.Item>
                        )
                    }
                }}
            />
            {/* {questionType === 'SOFT' && (
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
            )} */}
        </Drawer>
    )
}
MyDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}
export default MyDrawer
