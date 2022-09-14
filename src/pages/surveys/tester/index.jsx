import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import PracticalPart from './components/parts/PracticalPart'
import TheoreticalPart from './components/parts/TheoreticalPart'

const TesterSurveyPart = () => {
    const [data, setData] = useState([])

    const location = useLocation()
    const state = location.state

    const { part_tester } = useSelector((state) => state.survey_slice)

    const { surveyquest, id } = state

    useEffect(() => {
        setData(surveyquest)
    }, [surveyquest])
    return (
        <div>
            {part_tester === 'p-p' ? (
                <PracticalPart id={id} />
            ) : (
                <TheoreticalPart surveyquest={data} id={id} />
            )}
        </div>
    )
}

export default TesterSurveyPart
