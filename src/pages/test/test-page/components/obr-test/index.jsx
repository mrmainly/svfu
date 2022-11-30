import { Button, Form, Input, Tabs } from 'antd'
import ObrTestSettings from './tabs/settings'
import ObrTestQuestions from './tabs/questions'
import Description from './tabs/description'
const ObrTest = () => {
    const handleSubmit = (data) => {
        console.log("data", data)
    }
    return (
        <div>
            <Form
                layout={"horizontal"}
                onFinish={handleSubmit}
                scrollToFirstError={true}
                initialValues={{
                    ['вопросы']: false,
                    ['варианты ответов']: false,
            }}
            >
                <Form.Item
                    name={'name'}
                >
                    <Input
                        bordered={false}
                        placeholder={'Название тестирования'}
                        style={{backgroundColor: '#f5f5f5', color: 'black'}}
                    />
                </Form.Item>
                <Tabs
                    defaultActiveKey="1"
                    type={'card'}
                    tabBarExtraContent={
                        <Button htmlType={'submit'}>
                            Создать
                        </Button>
                    }
                >
                    <Tabs.TabPane tab={'Разделы'} key={'1'}>
                        <ObrTestQuestions/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Описание'} key={'2'}>
                        <Description/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Параметры'} key={'3'}>
                        <ObrTestSettings/>
                    </Tabs.TabPane>
                </Tabs>
            </Form>
        </div>
    )
}

export default ObrTest