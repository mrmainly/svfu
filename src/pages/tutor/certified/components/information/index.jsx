import React from 'react'
import PropTypes from 'prop-types'

import MainInfo from './MainInfo'
import { Line } from '../../../../../components'
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

Information.propTypes = {
    data: PropTypes.object,
}

export default Information
