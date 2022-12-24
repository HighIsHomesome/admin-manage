import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import {getAccountsByConditionForColumn}  from '../page/request/api'

export default function Columns(props){
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("合计:",props)
        setData(props.accountData)
        console.log("data:",data)
    }, []);

    const asyncFetch = () => {
        // getAccountsByConditionForColumn({
        //     start:props.start,
        //     end:props.end,
        //     category:props.category
        // }).then((response) => response.json())
        //     .then((json) => setData(json))
        //     .catch((error) => {
        //         console.log('fetch data failed', error);
        //     });
        fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'value',
        yField: 'date',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        scrollbar: {
            type: 'horizontal',
        },
    };

    return <Column {...config} />;
};