import { Button, Form, Tabs } from 'antd'
import ObrTestSettings from './tabs/settings'
import ObrTestQuestions from './tabs/questions'
const ObrTest = () => {
    const handleSubmit = (data) => {
        console.log("data", data)
    }
    return (
        <div>
            <Form layout={"horizontal"} onFinish={handleSubmit}>
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
                    <Tabs.TabPane tab={'Настройки'} key={'2'}>
                        <ObrTestSettings/>
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