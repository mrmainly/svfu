/* eslint-disable no-undef */
import { useLocation, useNavigate } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

import { Line } from '../../../components'

import SoftTestExMo from '../../../constructor/parts/soft_test_expert_moderator'
import AnswerExpertModal from './components/modals/AnswerExpertModal'
import VerificationSubscribeModal from './components/modals/VerificationSubscribeModal'

const SurveyPartsSoft = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { surveyquest, id } = state

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
            <AnswerExpertModal
                id={id}
                expert_review={surveyquest?.expert_review}
                main_expert={surveyquest.main_expert}
            />
            <VerificationSubscribeModal id={id} main_expert={surveyquest?.main_expert} />

            <SoftTestExMo surveyquest={surveyquest} />
        </div>
    )
}

export default SurveyPartsSoft
