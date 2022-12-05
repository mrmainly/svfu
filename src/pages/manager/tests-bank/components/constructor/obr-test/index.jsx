import React from 'react'
import { Button, Form, Input, message, Spin, Tabs } from 'antd'
import ObrTestSettings from './tabs/settings'
import ObrTestQuestions from './tabs/questions'
import Description from './tabs/description'

import { useSelector } from 'react-redux'

import {
    usePostUnitMutation,
    usePostUnitSoftMutation,
    usePostUnitSoftChapterMutation,
} from '../../../../../../services/manager/TestsBank'
import moment from 'moment'

const ObrTest = () => {
    // const [unitData, setUnitData] = React.useState({})
    const [postUnit] = usePostUnitMutation()
    const [postUnitSoft] = usePostUnitSoftMutation()
    const [postUnitSoftChapter] = usePostUnitSoftChapterMutation()
    const { testQuestionList } = useSelector((state) => state.constructor_question_slice)
    const handleSubmit = (data) => {
        const hhminuts =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))

        data.test_time = hhminuts
        const chapters = data.chapters
        chapters.map((chapter, index) => {
            chapter.question = []
            testQuestionList.forEach(
                (item) => item.chapterId === index && chapter.question.push(item.id)
            )
        })
        const unit = {
            name: data.name,
            description: data.description,
            direction: data.direction,
            test_time: data.test_time,
            unit_type: 'SOFT',
        }

        // eslint-disable-next-line no-undef
        const unitFormData = new FormData()
        unitFormData.append('name', data.name)
        unitFormData.append('description', data.description)
        unitFormData.append('direction', data.direction)
        unitFormData.append('test_time', data.test_time)
        unitFormData.append('unit_type', 'SOFT')

        const unit_criterion = {
            main_criterion: data.main_criterion,
            use_criterion_chapters: data.use_criterion_chapters,
        }
        console.log('unit', unit)
        console.log('unit_criterion', unit_criterion)
        console.log('chapter', chapters)

        postUnit(unitFormData).then((unitRes) => {
            if(unitRes.data) {
                postUnitSoft({body: unit_criterion, id: unitRes.data.unit_id}).then((unitSoftRes) => {
                    if(unitSoftRes.data) {
                        postUnitSoftChapter({body: chapters, id: unitRes.data.unit_id}).then((unitSoftChapterRes) => {
                            if(unitSoftChapterRes.data) {
                                message.success('Тест создан')
                            } else {
                                message.error('Что то пошло не так в создании разделов')
                            }
                        })
                    } else {
                        message.error('Что то пошло не так в создании критериев теста')
                    }
                })
            } else {
                message.error('Что то пошло не так в создании теста')
            }

        })

        // if (unitData) {
        //     const promiseUnitSoft = new Promise((resolve, reject) => {
        //         const responseUnitSoft = postUnitSoft({
        //             body: unit_criterion,
        //             id: unit.unit_id,
        //         })
        //         {
        //             responseUnitSoft.data ? resolve() : reject('то не то')
        //         }
        //     })
        //
        //     const promiseUnitSoftChapter = new Promise((resolve, reject) => {
        //         const responseUnitSoftChapter = postUnitSoftChapter({
        //             body: chapters,
        //             id: unit.unit_id,
        //         })
        //         {
        //             responseUnitSoftChapter.data ? resolve() : reject('xто не то')
        //         }
        //     })
        //     Promise.all([promiseUnitSoft, promiseUnitSoftChapter])
        //         .then((data) => message.success(data[0], data[1]))
        //         .catch((error) => message.error(error))
        // } else {
        //     message.error('тест не создан')
        // }

        // const response = postUnit()
        // if (response.success) {
        //     try{
        //         const response2 = postUnitSoft()
        //         if (response2.success){
        //             const response3 = postUnitSoftChapter()
        //             try (response3.success){} catch {
        //
        //             } catch (
        //                 new Error()
        //                 )
        //         } catch {
        //             postUnitSoftDelete()
        //             new Error()
        //         }
        //     } catch {
        //         postDelete(response.id)
        //     }
        // }

        // postUnit({formData: unitFormData}).then((res) => {
        //     if (res.data) {
        //         postUnitSoft({body: unit_criterion, id: res.data.unit_id}).then((res) => {
        //             if (!res.data) {
        //                 message.error('Что то пошло не так')
        //             }
        //         })
        //         postUnitSoftChapter({body: chapters, id: res.data.unit_id}).then((res) => {
        //             if (!res.data) {
        //                 message.error('Что то пошло не так')
        //             }
        //         })
        //     } else {
        //         message.error(res.error.data.errors[0])
        //     }
        // })
    }

    return (
        <div>
            <Form
                layout={'horizontal'}
                onFinish={handleSubmit}
                scrollToFirstError={true}
                initialValues={{
                    ['вопросы']: false,
                    ['варианты ответов']: false,
                    ['use_criterion_chapters']: false,
                }}
            >
                <Form.Item name={'name'}>
                    <Input
                        bordered={false}
                        placeholder={'Название тестирования'}
                        style={{ backgroundColor: '#f5f5f5', color: 'black' }}
                    />
                </Form.Item>
                <Tabs
                    defaultActiveKey="1"
                    type={'card'}
                    tabBarExtraContent={<Button htmlType={'submit'}>Создать</Button>}
                >
                    <Tabs.TabPane tab={'Разделы'} key={'1'}>
                        <ObrTestQuestions />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Описание'} key={'2'}>
                        <Description />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Параметры'} key={'3'}>
                        <ObrTestSettings />
                    </Tabs.TabPane>
                </Tabs>
            </Form>
        </div>
    )
}

export default ObrTest
