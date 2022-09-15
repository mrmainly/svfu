import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { BsArrowLeft } from 'react-icons/bs'

import { Line } from '../../../components'

import TheoreticalPartExMo from './components/parts/theoretical_part_exmo'
import PracticalPartExMo from './components/parts/practical_part_exmo'
import AnswerExpertModal from './components/modals/AnswerExpertModal'
import AnswerModeratorModal from './components/modals/AnswerModeratorModal'
import AppealModeratorModal from './components/modals/AppealModeratorModal'
import VerificationSubscribeModal from './components/modals/VerificationSubscribeModal'
import VerificationSubscribeModalModerator from './components/modals/VerificationSubscribeModalModerator'

const SurveysPart = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { surveyquest, id, appeal, appeal_text } = state
    const { part } = useSelector((state) => state.survey_slice)
    const role = JSON.parse(localStorage.getItem('role'))
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <BsArrowLeft
                    style={{ fontSize: 30, cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <span
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '20px',
                        lineHeight: '30px',
                    }}
                >
                    {surveyquest?.survey.name}
                </span>
            </div>
            <Line />
            {role === 'MODERATOR' && appeal ? (
                <AppealModeratorModal id={id} surveyquest={surveyquest} appeal_text={appeal_text} />
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
