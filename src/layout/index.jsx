/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ROUTES from '../routes'
import { Loading } from '../components'
import './layout.css'

const LazySurveyLayout = lazy(() => import('./layouts/SurveyLayout'))
const LazyHeaderLogin = lazy(() => import('../components/headers/headerlogin'))
const LazyMainLayout = lazy(() => import('./layouts/MainLayout'))

const MyLayout = () => {
    const params = useLocation()

    return (
        <>
            {params.pathname == ROUTES.LOGIN ||
            params.pathname == ROUTES.REGISTRATION ||
            params.pathname == ROUTES.FORGOT_PASSWORD ? (
                <Suspense fallback={<Loading />}>
                    <LazyHeaderLogin />
                    <Outlet />
                </Suspense>
            ) : params.pathname === ROUTES.TESTER_SURVEY_PART ||
              params.pathname === ROUTES.SURVEY_PARTS_MODERATOR ||
              params.pathname === ROUTES.SURVEY_PARTS_EXPERT ? (
                <Suspense fallback={<Loading />}>
                    <LazySurveyLayout />
                </Suspense>
            ) : (
                <Suspense fallback={<Loading />}>
                    <LazyMainLayout params={params} />
                </Suspense>
            )}
        </>
    )
}

export default MyLayout
