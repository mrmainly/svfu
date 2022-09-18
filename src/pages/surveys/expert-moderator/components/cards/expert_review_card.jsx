import React from 'react'
import PropTypes from 'prop-types'

import { Card, Typography } from 'antd'

const { Text } = Typography

const ExpertReviewCard = ({ recommendationPartOne, recommendationPartTwo, id }) => {
    console.log('recommendationPartOne', recommendationPartOne)
    return (
        <Card
            title={<Text style={{ color: '#2F80ED' }}>id: {id}</Text>}
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
                <Text>
                    Дата проверки: <span style={{ fontWeight: 'bold' }}>22.08.2022, 14:25</span>
                </Text>
                {recommendationPartOne ? (
                    <Text style={{ marginTop: 10 }}>
                        Рекомендация:{' '}
                        <span style={{ fontWeight: 'bold' }}>{recommendationPartOne}</span>
                    </Text>
                ) : (
                    <Text style={{ marginTop: 10 }}>
                        Рекомендация:{' '}
                        <span style={{ fontWeight: 'bold' }}>{recommendationPartTwo}</span>
                    </Text>
                )}
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
