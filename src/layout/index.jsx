/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'
import HeaderLogin from '../components/header/headerlogin'

import './layout.css'

const MyLayout = () => {
    const params = useLocation()
    const navigate = useNavigate()

    return (
        <>
            {params.pathname == ROUTES.LOGIN ||
            params.pathname == ROUTES.REGISTRATION ||
            params.pathname == ROUTES.FORGOT_PASSWORD ? (
                <div>
                    <HeaderLogin />
                    <Outlet />
                </div>
            ) : params.pathname === ROUTES.TESTER_SURVEY_PART ||
              params.pathname === ROUTES.SURVEY_PARTS_MODERATOR ||
              params.pathname === ROUTES.SURVEY_PARTS_EXPERT ? (
                <SurveyLayout />
            ) : (
                <MainLayout params={params} />
            )}
        </>
    )
}

export default MyLayout
