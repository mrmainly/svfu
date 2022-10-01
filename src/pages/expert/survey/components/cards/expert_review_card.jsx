import React from 'react'
import PropTypes from 'prop-types'

import { Card, Typography } from 'antd'

const { Text } = Typography

const ExpertReviewCard = ({ recommendationPartOne, recommendationPartTwo, id }) => {
    return (
        <Card
            title={<Text style={{ color: '#2F80ED' }}>Эксперт: {id}</Text>}
            style={{
                width: '100%',
                marginTop: 10,
            }}
            // extra={
            //     <div style={{ fontSize: 16 }}>
            //         {recommendationPartOne ? 'Теоретическая часть' : 'Практическая часть'}
            //     </div>
            // }
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ marginTop: 10 }}>Рекомендация по теоретической части:</Text>
                    <Text style={{ fontWeight: 'bold' }}>{recommendationPartOne}</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ marginTop: 10 }}>Рекомендация по практической части:</Text>
                    <Text style={{ fontWeight: 'bold' }}>{recommendationPartTwo}</Text>
                </div>
            </div>
        </Card>
    )
}

ExpertReviewCard.propTypes = {
    id: PropTypes.number,
    recommendationPartOne: PropTypes.string,
    recommendationPartTwo: PropTypes.string,
}

export default ExpertReviewCard
