import React from 'react'
import { Spin } from 'antd'

import MainInfo from './MainInfo'
import { Line } from '../../../../components'
import SocialNetworks from './SocialNetworks'
import InfoScreen from './InfoScreen'

const Information = ({ data }) => {
    return (
        <div>
            <>
                <MainInfo data={data} />
                <Line />
                <SocialNetworks data={data} />
                <InfoScreen data={data} />
            </>
        </div>
    )
}

export default Information
