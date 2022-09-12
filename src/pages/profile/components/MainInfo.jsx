import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import moment from 'moment/moment'
import PropTypes from 'prop-types'

import PhotoUpload from './PhotoUpload'

const { Text } = Typography

const MainInfo = ({ data }) => {
    const [fileList, setFileList] = useState([])
    useEffect(() => {
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${data?.photo}`,
            },
        ])
    }, [data?.photo])
    const items = [
        {
            label: 'Логин:',
            value: data?.username,
        },
        {
            label: 'Фамилия:',
            value: data?.last_name,
        },
        {
            label: 'Имя:',
            value: data?.first_name,
        },
        {
            label: 'Отчество:',
            value: data?.patronymic,
        },
        {
            label: 'Дата рождения:',
            value: moment(data?.birth_date).format('DD.MM.YYYY'),
        },
        {
            label: 'Электронная почта:',
            value: data?.email,
        },
        {
            label: 'Телефон:',
            value: data?.phone,
        },
        {
            label: 'Инн:',
            value: data?.inn,
        },
        {
            label: 'СНИЛС:',
            value: data?.snils,
        },
        {
            label: 'Должность:',
            value: data?.post,
        },
    ]

    return (
        <>
            <PhotoUpload fileList={fileList} dataPhoto={data?.photo} />

            {items.map((item, index) => (
                <div className="info-field" key={index}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>{item.value === '' || item.value === null ? '-' : item.value}</Text>
                </div>
            ))}
        </>
    )
}

MainInfo.propTypes = {
    data: PropTypes.object,
}

export default MainInfo
