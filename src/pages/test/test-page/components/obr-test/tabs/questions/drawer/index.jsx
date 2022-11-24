import { Card, Drawer } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'

const QuestionDrawer = ({open, onClose, data}) => {
    const onClick = () => {
        console.log("fas")
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
                    onClick={onClick}
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