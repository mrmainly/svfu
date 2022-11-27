import { Button, Form, Tabs } from 'antd'

import 'react-summernote/dist/react-summernote.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/dist/css/bootstrap.css'

import TestSoftEditor from './components/tabs/editor'
import TestSoftComments from './components/tabs/comments'
import TestSoftParameters from './components/tabs/parameters'

const TestSoftQuestion = () => {
    const onFinish = (data) => {
        console.log(data)
    }

    return (
        <div>
            <Form layout={'horizontal'} onFinish={onFinish}>
                <Tabs
                    defaultActiveKey="1"
                    type={'card'}
                    tabBarExtraContent={<Button size="large">Создать вопрос</Button>}
                >
                    <Tabs.TabPane tab={'Редактор'} key={'1'}>
                        <TestSoftEditor />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Блок комиссии'} key={'2'}>
                        <TestSoftComments />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Параметры'} key={'3'}>
                        <TestSoftParameters />
                    </Tabs.TabPane>
                </Tabs>
            </Form>
        </div>
    )
}

export default TestSoftQuestion
