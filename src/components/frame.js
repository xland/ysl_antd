import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import { Link } from 'dva/router'
import ajax from '../utils/ajax'
import './frame.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Frame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeFunc:[],
      subFunc:[],
    }
  };
  componentDidMount() {
    var s = this;
    ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
      s.setState({treeFunc:data.data,});
    })
  };
  render(){
    return (
      <div>
        <div>
          <div style={{
            "float": 'left', width: '180px', height: '46px', fontSize: "18px",color:"#FEFEFE",fontWeight:"bold",
            background: '#3e3e3e', lineHeight: "46px", textAlign: 'center'}}>
            远传运营管理系统
          </div>
          <Menu theme="dark" mode="horizontal" style={{float: "right", width: '180px',height: "46px"}}>
            <SubMenu title={<span><Icon type="setting"/>刘晓伦，下午好！</span>}>
              <Menu.Item key="5">
                <Link to="sys/func">
                  <Icon type="mail"/>个人信息
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="sys/func">
                  <Icon type="mail"/>站内信
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="sys/func">
                  <Icon type="mail"/>退出登录
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Menu theme="dark" mode="horizontal" style={{marginLeft: "180px", marginRight: "180px", height: "46px"}}>
            {
              this.state.treeFunc.map((item,index)=>{
                return (
                  <Menu.Item key={item.id}>
                    <Icon type="mail"/>{item.func_name}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </div>
        <Menu style={{width: 180, position: "absolute", left: "0px", top: "48px", bottom: '0px'}} mode="vertical">
          <Menu.Item key="5">
            <Link to="sys/func">
              <Icon type="mail"/>权限设置
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail"/><span>账户设置</span></span>}>
            <MenuItemGroup title="Item 1">
              <Menu.Item key="1"></Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="Iteom 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigation Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><icon type="setting"/><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
export default Frame
