import { Card, Drawer } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'

import {ConstructorQuestionSlice} from '../../../../../../../../reducers/ConstructorQuestionSlice'

const QuestionDrawer = ({open, onClose, data}) => {
    const {addItemQuestionList} = ConstructorQuestionSlice.actions

    const dispatch = useDispatch()

    const onClick = (item) => {
        dispatch(addItemQuestionList(item))
    }
    return(
        <Drawer
            title={"Вопросы"}
            placement={'right'}
            visible={open}
            onClose={onClose}
            mask={false}
        >
            {data?.map((item, index) => (
                <Card
                    hoverable={true}
                    key={index}
                    title={item?.type}
                    extra={
                         <PlusCircleTwoTone style={{fontSize: '20px'}}/>
                    }
                    style={{marginBottom: '12px'}}
                    onClick={() => onClick(item)}
                >
                    {item?.name}
                </Card>
            ))}
        </Drawer>
    )
}
QuestionDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.array,
}
export default QuestionDrawer