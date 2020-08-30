import React from 'react'
import MenuConfig from './../../config/menuConfig'
import { Menu } from 'antd'
import './index.less'
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;

export default class NavLeft extends React.Component{
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);

        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){//如果有子节点再递归一次直到没有子节点
                return(
                    <SubMenu icon={item.icon} title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return  <Menu.Item icon={item.icon} title={item.title} key={item.key}>
                <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
        })
    }
    render(){
     
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo.png" alt=""/>
                    <h1>校园跑腿信息平台</h1>
                </div>
                <Menu theme="dark"mode="inline">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}