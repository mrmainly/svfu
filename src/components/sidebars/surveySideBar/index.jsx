/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { SurveysSlice } from '../../../reducers/SurveysSlice'

import '../surveySideBar.css'
import HardBody from './components/hard_body'
import SoftBody from './components/soft_body'

const SurveysSideBar = () => {
    const [data, setData] = useState([])

    const { arrayIndex, part } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex, openExpertTheoreticalPartOpen, changePartsStatus } =
        SurveysSlice.actions

    const dispatch = useDispatch()

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem('side_bar_data_ex_mo'))
        setData(newData)
    }, [])

    const changeQuestion = (index) => {
        if (part != 'practical-part') {
            dispatch(handleArrayIndex(index))
        }
    }

    const handleParts = () => {
        dispatch(
            changePartsStatus(part === 'theoretical-part' ? 'practical-part' : 'theoretical-part')
        )
    }

    const completeConclusion = () => {
        dispatch(openExpertTheoreticalPartOpen(true))
    }
    return (
        <>
            {data?.survey?.unit_type === 'HARD' ? (
                <HardBody
                    changeQuestion={changeQuestion}
                    arrayIndex={arrayIndex}
                    part={part}
                    data={data}
                    handleParts={handleParts}
                    completeConclusion={completeConclusion}
                />
            ) : (
                <SoftBody
                    changeQuestion={changeQuestion}
                    arrayIndex={arrayIndex}
                    data={data}
                    completeConclusion={completeConclusion}
                />
            )}
        </>
    )
}

export default SurveysSideBar
