import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'

const ActionButton = ({ arrayIndex, surveyquest_length }) => {
    const { handleArrayIndex } = SurveysSlice.actions

    const dispatch = useDispatch()

    return (
        <div className="action-button">
            {arrayIndex === 0 ? (
                ''
            ) : (
                <Button
                    type="primary"
                    className="action_button-btn"
                    onClick={() => {
                        dispatch(handleArrayIndex(arrayIndex - 1))
                    }}
                >
                    Назад
                </Button>
            )}
            {surveyquest_length - 1 === arrayIndex ? (
                ''
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <Button
                        className="action_button-btn"
                        type="primary"
                        onClick={() => {
                            dispatch(handleArrayIndex(arrayIndex + 1))
                        }}
                    >
                        Далее
                    </Button>
                </div>
            )}
        </div>
    )
}

ActionButton.propTypes = {
    arrayIndex: PropTypes.number,
    surveyquest_length: PropTypes.number,
}

export default ActionButton
