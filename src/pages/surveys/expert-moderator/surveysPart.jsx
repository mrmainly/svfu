import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import TheoreticalPartExMo from './components/parts/theoretical_part_exmo'
import PracticalPartExMo from './components/parts/practical_part_exmo'
import AnswerExpertModal from './components/modals/AnswerExpertModal'
import AnswerModeratorModal from './components/modals/AnswerModeratorModal'
import AppealModeratorModal from './components/modals/AppealModeratorModal'
import VerificationSubscribeModal from './components/modals/VerificationSubscribeModal'
import VerificationSubscribeModalModerator from './components/modals/VerificationSubscribeModalModerator'

const SurveysPart = () => {
    const location = useLocation()

    const state = location.state

    const { surveyquest, id, appeal } = state
    const { part } = useSelector((state) => state.survey_slice)
    const role = JSON.parse(localStorage.getItem('role'))
    console.log(surveyquest)
    return (
        <div>
            {role === 'MODERATOR' && appeal ? (
                <AppealModeratorModal id={id} surveyquest={surveyquest} />
            ) : role === 'MODERATOR' ? (
                <>
                    <AnswerModeratorModal id={id} surveyquest={surveyquest} />
                    <VerificationSubscribeModalModerator
                        id={id}
                        main_moderator={surveyquest?.main_moderator}
                    />
                </>
            ) : (
                <>
                    <AnswerExpertModal
                        id={id}
                        expert_review={surveyquest?.expert_review}
                        main_expert={surveyquest.main_expert}
                    />
                    <VerificationSubscribeModal id={id} main_expert={surveyquest?.main_expert} />
                </>
            )}

            {part === 'theoretical-part' ? (
                <TheoreticalPartExMo surveyquest={surveyquest} />
            ) : (
                <PracticalPartExMo />
            )}
        </div>
    )
}

export default SurveysPart
