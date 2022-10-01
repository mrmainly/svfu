import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'antd'
import { statusChoices } from '../../../../../constants'

const { Text } = Typography

const ModeratorReviewCard = ({ moderator_name, recommendation, estimate }) => {
    return (
        <div>
            <Text
                style={{
                    width: '120px',
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#2F80ED',
                }}
            >
                Модератор #{moderator_name}
            </Text>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', marginTop: '8px' }}>
                <Text
                    style={{
                        width: '120px',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '24px',
                    }}
                >
                    Аттестация:
                </Text>
                <Text
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '24px',
                    }}
                >
                    {statusChoices[estimate]}
                </Text>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <Text
                    style={{
                        width: '120px',
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '24px',
                    }}
                >
                    Рекомендация:
                </Text>
                <Text
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '24px',
                    }}
                >
                    {recommendation}
                </Text>
            </div>
        </div>
    )
}

ModeratorReviewCard.propTypes = {
    moderator_name: PropTypes.string,
    recommendation: PropTypes.string,
    estimate: PropTypes.any,
}

export default ModeratorReviewCard
