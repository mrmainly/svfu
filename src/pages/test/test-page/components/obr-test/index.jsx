import { Button, Form, Input, Tabs } from 'antd'
import ObrTestSettings from './tabs/settings'
import ObrTestQuestions from './tabs/questions'
import Description from './tabs/description'

import { useSelector } from 'react-redux'

const ObrTest = () => {
    const { testQuestionList } = useSelector(
        (state) => state.constructor_question_slice
    )
    console.log('testQuestionList', testQuestionList)
    const handleSubmit = (data) => {
        const chapters = data.chapters
        chapters.map((chapter, index) => {
            chapter.question = []
            testQuestionList.forEach((item) => (
                item.chapterId === index && (
                    chapter.question.push(item.id)
                )
            ))
        })

        console.log("data", data)

        const unit = {
            name: data.name,
            description: data.description,
            direction: data.direction,
            test_time: data.test_time,
            unit_type: 'SOFT',
        }
        const unit_criterion = {
            main_criterion: data.main_criterion,
            use_criterion_chapters: data.use_criterion_chapters,
        }
        console.log('unit', unit)
        console.log('unit_criterion', unit_criterion)
        console.log('chapter', chapters)
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
                    ['use_criterion_chapters']: false,
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