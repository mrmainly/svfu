import { Card, Drawer } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import {ConstructorQuestionSlice} from '../../../../../../../../../reducers/ConstructorQuestionSlice'

const QuestionDrawer = ({open, onClose, chapterId}) => {
    const {addItemQuestionList} = ConstructorQuestionSlice.actions
    const {questionList} = useSelector(
        (state) => state.constructor_question_slice
    )
    const dispatch = useDispatch()

    const onClick = (item) => {
        dispatch(addItemQuestionList(item))
    }
    console.log(questionList)
    return(
        <Drawer
            title={"Вопросы"}
            placement={'right'}
            visible={open}
            onClose={onClose}
        >
            {questionList?.map((item, index) => (
                <Card
                    hoverable={true}
                    key={index}
                    title={item?.technique}
                    extra={
                         <PlusCircleTwoTone style={{fontSize: '20px'}}/>
                    }
                    style={{marginBottom: '12px'}}
                    onClick={() => onClick({...item, chapterId: chapterId})}
                >
                    {item?.description}
                </Card>
            ))}
        </Drawer>
    )
}
QuestionDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.array,
    chapterId: PropTypes.number
}
export default QuestionDrawer