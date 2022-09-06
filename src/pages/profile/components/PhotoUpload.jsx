import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Space, message, Upload, Typography, Modal } from 'antd'

import {
    useProfilePostPhotoMutation,
    useProfileDeletePhotoMutation,
} from '../../../services/ProfileService'

const { Text } = Typography

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

const PhotoUpload = ({ fileList, dataPhoto }) => {
    const [profilePostImage] = useProfilePostPhotoMutation()
    const [deletePhotoProfile] = useProfileDeletePhotoMutation()

    const [previewImg, setPreviewImg] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    )

    const handleImageChange = (e) => {
        const image = e.file
        let formData = new FormData()
        formData.append('photo', image)
        profilePostImage(formData).then((res) => {
            if (res.error) {
                message.error('размер файла является слишком большим')
            }
        })
    }

    const handlePreviewImg = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewVisible(true)
        setPreviewImg(file.url || file.preview)
    }

    return (
        <div>
            <div className="info-field">
                <div style={{ width: 200 }}>
                    <Text style={{ fontWeight: 600 }}>Фотография:</Text>
                </div>
                <div className="upload-photo">
                    <Upload
                        customRequest={handleImageChange}
                        onRemove={() => {
                            deletePhotoProfile()
                        }}
                        listType="picture-card"
                        multiple={false}
                        maxCount={1}
                        fileList={dataPhoto === null ? null : fileList}
                        onPreview={handlePreviewImg}
                        accept=".jpg,.jpeg,.png"
                    >
                        {uploadButton}
                    </Upload>
                </div>
            </div>
            <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImg} />
            </Modal>
        </div>
    )
}

export default PhotoUpload
