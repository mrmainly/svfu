import React from 'react'
import PropTypes from 'prop-types'

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

Information.propTypes = {
    data: PropTypes.any,
}

export default Information
