/* eslint-disable no-undef */
import { useLocation, useNavigate } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

import { Line } from '../../../components'

import SoftTestExMo from '../../../constructor/parts/SoftTestExaminer'
import AnswerModeratorModal from './components/modals/AnswerModeratorModal'
import AppealModeratorModal from './components/modals/AppealModeratorModal'
import VerificationSubscribeModalModerator from './components/modals/VerificationSubscribeModalModerator'

const SurveyPartsSoft = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { surveyquest, id, appeal, appeal_text } = state
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
            ) : (
                role === 'MODERATOR' && (
                    <>
                        <AnswerModeratorModal id={id} surveyquest={surveyquest} />
                        <VerificationSubscribeModalModerator
                            id={id}
                            main_moderator={surveyquest?.main_moderator}
                        />
                    </>
                )
            )}
            <SoftTestExMo role="moderator" surveyquest={surveyquest} />
        </div>
    )
}

export default SurveyPartsSoft
