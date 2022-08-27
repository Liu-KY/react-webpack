import { Upload, Modal, } from 'antd';
//图片裁剪
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

//处理图片
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });



const App = ({ value, onChange }) => {
  //显示弹窗
  const [previewVisible, setPreviewVisible] = useState(false);
  //url链接
  const [previewImage, setPreviewImage] = useState('');
  //图片标题
  const [previewTitle, setPreviewTitle] = useState('');
  //图片列表
  const [fileList, setFileList] = useState([]);
  //图片src
  // const [imgSrc, setimgSrc] = useState('');

  const { token } = useSelector(store => store.user)
  // console.log(token)
  useEffect(() => {
    if (value && fileList.length == 0) {
      setFileList([
        {
          uid: +new Date(),
          name: 'image.png',
          status: 'done',
          url: `http://localhost:9999${value}`,
        },
      ])

    }
  }, [value])

  // {
  //   uid: '-1',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },

  //关闭预览窗口
  const handleCancel = () => setPreviewVisible(false);
  //打开预览窗口
  const handlePreview = async (file) => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  //上传事件
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleChange = ({ file, fileList }) => {
    setFileList(fileList)

    if (file.status === 'done' && file.response.err === 0) {
      // setimgSrc(file.response.data.img)
      onChange(file.response.data.img)
    }
  }
  //上传小组件
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //上传前的校验
  const beforeUpload = (file) => {
    const imgType = ["image/jpeg", 'image/png', 'image/jpg']
    //校验类型
    if (!imgType.includes(file.type)) {
      return Promise.reject()
    }
    //校验大小
    if (file.size / 1024 / 1024 > 2) {
      return Promise.reject()
    }
    return Promise.resolve(file)

  }


  return (
    <>
      <ImgCrop rotate>

        <Upload
          action="http://localhost:9000/api/v1/react/upload/img"
          headers={{
            Authorization: token
          }}
          name='good'
          beforeUpload={beforeUpload}
          //显示方式  
          listType="picture-card"
          //图片列表
          fileList={fileList}
          //预览回调
          onPreview={handlePreview}
          //上传状态变化
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </ImgCrop>


      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>




    </>
  );

};

export default App;