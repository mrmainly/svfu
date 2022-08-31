import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import TheoreticalPartExMo from './components/parts/theoretical_part_exmo'
import PracticalPartExMo from './components/parts/practical_part_exmo'
import AnswerTheoreticalPartExpertModal from './components/modals/AnswerTheoreticalPartExpertModal'
import VerificationSubscribeModal from './components/modals/VerificationSubscribeModal'

const SurveysPart = () => {
    const location = useLocation()

    const state = location.state

    const { surveyquest, id } = state
    const { part } = useSelector((state) => state.survey_slice)

    console.log(surveyquest)

    return (
        <div>
            <AnswerTheoreticalPartExpertModal id={id} />
            <VerificationSubscribeModal id={id} />
            {part === 'theoretical-part' ? (
                <TheoreticalPartExMo surveyquest={surveyquest} />
            ) : (
                <PracticalPartExMo />
            )}
        </div>
    )
}

export default SurveysPart