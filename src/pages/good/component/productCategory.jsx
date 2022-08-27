import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
const { Option } = Select;

import { getGoodCates, addGoodCates } from '@/store/actionCreator/GoodActions'



export default (props) => {

    const dispatch = useDispatch()
    const { goodCates } = useSelector(store => store.good)

    useEffect(() => {
        dispatch(getGoodCates())
    }, [])

    // const [items, setItems] = useState(['手机', '电脑']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const { value, onChange, hidden } = props

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        dispatch(addGoodCates([...goodCates, { _id: +new Date(), cate_zh: name }]))

        setName('');
        setTimeout(() => {
            //获取焦点
            inputRef.current?.focus();
        }, 0);
    };

    const data = useMemo(() => {
        return goodCates.map((item) => {
            if (hidden) {
                if (!hidden.includes(item.cate_zh)) {
                    return {
                        label: item.cate_zh,
                        value: item.cate,
                    }
                }
            } else {
                return {
                    label: item.cate_zh,
                    value: item.cate,
                }
            }
        }).filter(item => item !== undefined)

    }, [goodCates])

    useEffect(() => {
       if(onChange){
        if(value){
            onChange(value)
        }
       }
    }, [value])

    return (
        <Select
            style={{
                width: 300,
            }}
            placeholder="请选择商品品类"
            allowClear
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider
                        style={{
                            margin: '8px 0',
                        }}
                    />
                    <Space
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Input
                            placeholder="输入自定义品类"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            添加品类
                        </Button>
                    </Space>
                </>
            )}
            options={data}
            onChange={(ev)=>{
                console.log(ev)
                onChange(ev)
            }}
            defaultValue={value}
            value={value}
        >
            {/* {goodCates.map((item) => (
                <Option key={item._id} value ={item.cate_zh} >{item.cate_zh}</Option>
            ))} */}
        </Select>
    );
}