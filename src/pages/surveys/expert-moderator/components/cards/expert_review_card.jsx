import React from 'react'

import { Card, Typography } from 'antd'

const { Text } = Typography

const ExpertReviewCard = ({ expert_name, recommendation }) => {
    return (
        <Card
            title={expert_name}
            extra={<Text>Скопировать текст</Text>}
            style={{
                width: '100%',
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

export default ExpertReviewCard
