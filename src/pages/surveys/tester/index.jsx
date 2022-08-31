import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PracticalPart from './components/parts/PracticalPart'
import TheoreticalPart from './components/parts/TheoreticalPart'

const TesterSurveyPart = () => {
    const location = useLocation()
    const state = location.state

    const { part_tester } = useSelector((state) => state.survey_slice)

    const { surveyquest, id } = state
    return (
        <div>
            {part_tester === 'p-p' ? (
                <PracticalPart id={id} />
            ) : (
                <TheoreticalPart surveyquest={surveyquest} id={id} />
            )}
        </div>
    )
}

export default TesterSurveyPart
