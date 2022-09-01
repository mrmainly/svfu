import React from 'react'

import { Typography } from 'antd'
import { udEstimate } from '../../../../../translation/EstimateTransation'

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
                    {udEstimate(estimate)}
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

export default ModeratorReviewCard
