import React from 'react'

import MainInfo from './MainInfo'
import { Line } from '../../../../../../components'
import SocialNetworks from './SocialNetworks'
import InfoScreen from './InfoScreen'

const Information = () => {
    return (
        <div>
            <MainInfo />
            <Line />
            <SocialNetworks />
            <InfoScreen />
        </div>
    )
}

export default Information
