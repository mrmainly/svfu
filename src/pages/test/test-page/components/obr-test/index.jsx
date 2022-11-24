import { Button, Form, Tabs } from 'antd'
import ObrTestSettings from './tabs/settings'
import ObrTestQuestions from './tabs/questions'
const ObrTest = () => {
    return (
        <div>
            <Form layout={"horizontal"}>
                <Tabs defaultActiveKey="1" type={'card'}>
                    <Tabs.TabPane tab={'Вопросы'} key={'1'}>
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
            <Button>
                Сохранить
            </Button>
        </div>
    )
}

export default ObrTest