/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'

import './layout.css'

const MyLayout = () => {
    const params = useLocation()

    return (
        <>
            {params.pathname == ROUTES.LOGIN ||
            params.pathname == ROUTES.REGISTRATION ||
            params.pathname == ROUTES.FORGOT_PASSWORD ? (
                <div>
                    <Outlet />
                </div>
            ) : params.pathname === ROUTES.TESTER_SURVEY_PART ||
              params.pathname === ROUTES.SURVEYS_PART ? (
                <SurveyLayout />
            ) : (
                <MainLayout params={params} />
            )}
        </>
    )
}

export default MyLayout
