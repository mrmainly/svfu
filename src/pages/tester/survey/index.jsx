import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PracticalPart from './components/parts/PracticalPart'
import TheoreticalPart from './components/parts/TheoreticalPart'
import SoftPart from './components/parts/SoftPart'

const TesterSurveyPart = () => {
    const location = useLocation()
    const state = location.state

    const { part_tester } = useSelector((state) => state.survey_slice)

    const { id, unit_type } = state
    return (
        <div>
            {unit_type === 'SOFT' ? (
                <SoftPart id={id} />
            ) : part_tester === 'p-p' ? (
                <PracticalPart id={id} />
            ) : (
                <TheoreticalPart id={id} />
            )}
        </div>
    )
}

export default TesterSurveyPart
