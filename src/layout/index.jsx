/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'
import HeaderLogin from '../components/header/headerlogin'

import './layout.css'

const MyLayout = () => {
    const params = useLocation()
    const navigate = useNavigate()

    const token = cookie.get('token')

    useEffect(() => {
        if (token === '' || token === undefined || token === null || !token) {
            navigate(ROUTES.LOGIN)
        }
    }, [token])

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
