import React from 'react'

import MainInfo from './MainInfo'
import { Line } from '../../../../components'
import SocialNetworks from './SocialNetworks'
import InfoScreen from './InfoScreen'

const Information = ({ data }) => {
    return (
        <div>
            <>
                <MainInfo data={data.user} />
                <Line />
                <SocialNetworks data={data.user} />
                <InfoScreen data={data.user} />
            </>
        </div>
    )
}

export default Information
