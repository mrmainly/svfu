import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PracticalPart from './components/parts/PracticalPart'
import TheoreticalPart from './components/parts/TheoreticalPart'

const TesterSurveyPart = () => {
    const location = useLocation()
    const state = location.state

    const { part_tester } = useSelector((state) => state.survey_slice)

    const { id, surveyquest } = state

    const surveyquest_test = [
        {
            id: 1,
            question: {
                description:
                    'Согласно годовому маркетинговому плану, отдел Сбыта должен увеличить продажи на 40% при росте прибыли компании на 10%.  Какая из перечисленных стратегий реализуется? Отметьте один из вариантов ответа:',
                question_images: [],

                technique: 'MULTIPLE_CHOICE',
                variant: [
                    {
                        id: 2,
                        name: 'Стратегия увеличения продаж',
                    },
                    {
                        id: 3,
                        name: 'Стратегия увеличения продаж',
                    },
                    {
                        id: 4,
                        name: 'Стратегия увеличения продаж',
                    },
                ],
            },
        },
        {
            id: 2,
            question: {
                description:
                    'Согласно годовому маркетинговому плану, отдел Сбыта должен увеличить продажи на 40% при росте прибыли компании на 10%.  Какая из перечисленных стратегий реализуется? Отметьте один из вариантов ответа:',
                question_images: [],
                technique: 'DESCRIBE',
                under_questions: [
                    {
                        label: 'Если Вы действующий руководитель или у Вас есть опыт работы руководителем',
                        hint: 'Подчеркните, какие из перечисленных ошибок, Вы периодически допускаете(ли).',
                    },
                ],
            },
        },
        {
            id: 2,
            question: {
                description:
                    'Согласно годовому маркетинговому плану, отдел Сбыта должен увеличить продажи на 40% при росте прибыли компании на 10%.  Какая из перечисленных стратегий реализуется? Отметьте один из вариантов ответа:',
                question_images: [],
                technique: 'DESCRIBE',
            },
        },
        {
            id: 3,
            question: {
                description:
                    'Согласно годовому маркетинговому плану, отдел Сбыта должен увеличить продажи на 40% при росте прибыли компании на 10%.  Какая из перечисленных стратегий реализуется? Отметьте один из вариантов ответа:',
                question_images: [],
                technique: 'ONE_CHOICE',
                variant: [
                    {
                        id: 2,
                        name: 'Стратегия увеличения продаж',
                    },
                    {
                        id: 3,
                        name: 'Стратегия увеличения продаж',
                    },
                    {
                        id: 4,
                        name: 'Стратегия увеличения продаж',
                    },
                ],
            },
        },
    ]

    console.log('surveyquest', surveyquest)

    return (
        <div>
            {part_tester === 'p-p' ? (
                <PracticalPart id={id} />
            ) : (
                <TheoreticalPart surveyquest={surveyquest_test} id={id} />
            )}
        </div>
    )
}

export default TesterSurveyPart
