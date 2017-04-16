import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import { Link } from 'dva/router'
import ajax from '../utils/ajax'

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
    console.log(this.props.path);
    var s = this;
    ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
      console.log(data)
      s.setState({treeFunc:data.data,subFunc:data.data[0].children});
    })
  };
  topMenuClick({item,key,keyPath}){
    if(this.state.treeFunc[key].children){
      this.setState({subFunc:this.state.treeFunc[key].children});
    }
  }
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
          <Menu onClick={this.topMenuClick.bind(this)}
                defaultSelectedKeys={['0']}
                theme="dark" mode="horizontal"
                style={{marginLeft: "180px", marginRight: "180px", height: "46px"}}>
            {
              this.state.treeFunc.map((item,index)=>{
                return (
                  <Menu.Item key={index}>
                    <i className={`iconfont ${item.icon} `}></i>
                    {item.func_name}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </div>
        <Menu style={{width: 180, position: "absolute", left: "0px", top: "48px", bottom: '0px'}} mode="vertical">
          {
            this.state.subFunc.map((item,index)=>{
              if(item.children&&item.children.length>0){
                return(
                  <SubMenu key={index} title={<span><i className={`iconfont ${item.icon} `}></i>{item.func_name}</span>}>
                    {
                      item.children.map((item,index)=>{
                        return(
                          <Menu.Item key={index}>
                            <Link to={item.path}>
                              <i className={`iconfont ${item.icon} `}></i>{item.func_name}
                            </Link>
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              }
              return (
                <Menu.Item key={index}>
                  <Link to={item.path}>
                    <i className={`iconfont ${item.icon}`}></i>{item.func_name}
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </div>
    )
  }
}
export default Frame
