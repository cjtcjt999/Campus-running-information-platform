import React from 'react'
import { UserOutlined, FileTextOutlined, HomeOutlined, DollarOutlined} from '@ant-design/icons';
const menuList = [
    {
        title:'用户管理',
        key:'/admin/user',
        icon:<UserOutlined/>
    },
    {
        title:'订单管理',
        key:'/admin/order',
        icon:<FileTextOutlined />,
        children:[
            {
                title:'帮买订单',
                key:'/admin/order/bm',
                children:[
                    {
                        title:'已完成订单',
                        key:'/admin/order/bm/completed',
                    },
                    {
                        title:'进行中订单',
                        key:'/admin/order/bm/progress',
                    },
                    {
                        title:'待接单订单',
                        key:'/admin/order/bm/request',
                    }
                ]
            },
            {
                title:'代拿订单',
                key:'/admin/order/dn',
                children:[
                    {
                        title:'已完成订单',
                        key:'/admin/order/dn/completed',
                    },
                    {
                        title:'进行中订单',
                        key:'/admin/order/dn/progress',
                    },
                    {
                        title:'待接单订单',
                        key:'/admin/order/dn/request',
                    }
                ]
            }
        ]
    },
    {
        title:'收货地址管理',
        key:'/admin/address',
        icon:<HomeOutlined />
    },
    {
        title:'提现信息管理',
        key:'/admin/cashout',
        icon:<DollarOutlined />
    },
];
export default menuList;