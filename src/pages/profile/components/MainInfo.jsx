import React, { useState, useEffect } from 'react'
import { Typography, Space, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import {
    useProfilePostPhotoMutation,
    useProfileDeletePhotoMutation,
} from '../../../services/ProfileService'

const { Text } = Typography

const MainInfo = ({ data }) => {
    const [fileList, setFileList] = useState([])

    const [profilePostImage] = useProfilePostPhotoMutation()
    const [deletePhotoProfile] = useProfileDeletePhotoMutation()
    console.log(data)
    useEffect(() => {
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${data.photo}`,
            },
        ])
    }, [data.photo])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const handleImageChange = (e) => {
        const image = e.file.originFileObj
        let formData = new FormData()
        formData.append('photo', image)
        if (e.fileList.length) {
            profilePostImage(formData).then((res) => {
                if (res.error) {
                    message.error('размер файла является слишком большим')
                }
            })
        } else {
            deletePhotoProfile()
        }
    }

    const items = [
        {
            label: 'Логин:',
            value: data.username,
        },
        {
            label: 'Фамилия:',
            value: data.last_name,
        },
        {
            label: 'Имя:',
            value: data.first_name,
        },
        {
            label: 'Отчество:',
            value: data.patronymic,
        },
        {
            label: 'Дата рождения:',
            value: data.birth_date,
        },
        {
            label: 'Телефон:',
            value: data.phone,
        },
        {
            label: 'Инн:',
            value: data.inn,
        },
        {
            label: 'СНИЛС:',
            value: data.snils,
        },
        {
            label: 'Должность:',
            value: data.post,
        },
    ]

    return (
        <>
            <Space size="middle" style={{ display: 'flex', alignItems: 'start' }}>
                <div style={{ width: 200 }}>
                    <Text style={{ fontWeight: 600 }}>Фотография:</Text>
                </div>
                <Upload
                    listType="picture-card"
                    multiple={false}
                    maxCount={1}
                    fileList={data.photo === null ? null : fileList}
                    onChange={handleImageChange}
                >
                    {uploadButton}
                </Upload>
            </Space>
            {items.map((item, index) => (
                <Space key={index} size="middle" style={{ marginTop: 12 }}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>{item.value === '' || item.value === null ? '-' : item.value}</Text>
                </Space>
            ))}
        </>
    )
}

export default MainInfo
