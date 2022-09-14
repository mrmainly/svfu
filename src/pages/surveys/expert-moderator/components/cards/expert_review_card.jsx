import React from 'react'
import PropTypes from 'prop-types'

import { Card, Typography } from 'antd'

const { Text } = Typography

const ExpertReviewCard = ({ recommendation, id }) => {
    return (
        <Card
            title={<Text style={{ color: '#2F80ED' }}>id: {id}</Text>}
            style={{
                width: '100%',
                marginTop: 10,
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text>
                    Дата проверки: <span style={{ fontWeight: 'bold' }}>22.08.2022, 14:25</span>
                </Text>
                <Text style={{ marginTop: 10 }}>
                    Рекомендация: <span style={{ fontWeight: 'bold' }}>{recommendation}</span>
                </Text>
            </div>
        </Card>
    )
}

ExpertReviewCard.propTypes = {
    id: PropTypes.number,
    recommendation: PropTypes.string,
}

export default ExpertReviewCard
