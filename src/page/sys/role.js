import React, {Component} from 'react'
import {Table, Popconfirm, Row, Col, Button, Card, Tag, Input} from 'antd'
import RoleSave from './role_save'
import RoleFunc from './role_func'
import ajax from '../../utils/ajax'
import util from '../../utils/util'

const Search = Input.Search;

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleArr: [],
      tableHeight: 180,
      dialogType: 0,
      dialogTitle: '增加账户',
      dialogRecord: {},
      dialogKey: '',
    }
  };

  //todo:这里不是动态变化高度的，不知道为什么，暂时先不用
  // onWindowResize(s){
  //   let h = document.body.clientHeight-198;
  //   if(h < 180){
  //     h = 180;
  //   }
  //   console.log(h);
  //   s.setState({tableHeight:h});
  // };
  componentDidMount() {
    // window.addEventListener('resize', this.onWindowResize(this))
    // this.onWindowResize(this);
    let h = document.body.clientHeight - 198;
    if (h < 180) {
      h = 180;
    }
    this.setState({tableHeight: h});
    var s = this;
    ajax.post("Sys/Role/GetAllRole").then(function ({data}) {
      s.setState({roleArr: data.data});
    })
  };

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.onWindowResize)
  // }

  dialogOk(flag) {
    if (!flag) {
      this.setState({dialogType: 0, dialogKey: util.createId(),});
      return;
    }
    var s = this;
    ajax.post("Sys/Role/GetAllRole").then(function ({data}) {
      s.setState({roleArr: data.data, dialogType: 0, dialogKey: util.createId(),});
    })
  }

  del(id) {
    var s = this;
    ajax.post("Sys/Role/DelRole", {id}).then(function ({data}) {
      if (data.code === 0) {
        ajax.post("Sys/Role/GetAllRole").then(function ({data}) {
          s.setState({roleArr: data.data});
        })
      }
    })
  }

  openDialog(r, type) {
    this.setState({
      dialogType: type,
      dialogTitle: type === 1 ? "增加角色" : '修改角色',
      dialogRecord: r,
    });
  }
  openFuncDialog(r, type) {
    this.setState({
      dialogRecord: r,
    });
    this.refs.roleFuncDialog.showDialog();
  }

  columns = [{
    title: '角色名称',
    dataIndex: 'role_name',
    key: 'role_name',

  }, {
    title: '角色排序',
    dataIndex: 'order_num',
    key: 'order_num',
    width: 180,
  }, {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 220,
    render: (text, record, index) => {
      return (
        <div>
          <Popconfirm title="确认要删除该角色吗?" onConfirm={this.del.bind(this, record.id)}>
            <Tag color="red">删除</Tag>
          </Popconfirm>
          <Tag onClick={this.openDialog.bind(this, record, 2)} color="blue">修改</Tag>
          <Tag onClick={this.openFuncDialog.bind(this,record)} color="blue">设置权限</Tag>
        </div>
      )
    },
  }]

  render() {

    return (
      <div>
        <div style={{height: 36, paddingTop: 6, clear: 'both'}}>
          <Tag onClick={this.openDialog.bind(this, {role_name: ''}, 1)} style={{float: "right"}} color="blue-inverse">新增角色</Tag>
        </div>
        <Table columns={this.columns} scroll={{y: this.state.tableHeight}}
               rowKey={record => record.id}
               pagination={false}
               dataSource={this.state.roleArr}
               bordered size="small"/>
        <RoleSave title={this.state.dialogTitle}
                  record={this.state.dialogRecord}
                  dialogType={this.state.dialogType}
                  dialogKey={this.state.dialogKey}
                  onOk={this.dialogOk.bind(this)}/>
        <RoleFunc
          record={this.state.dialogRecord}
          ref="roleFuncDialog"
          dialogKey={this.state.roleDialogKey}
          selectedRoleIds={this.state.selectedRoleIds}></RoleFunc>
      </div>
    )
  }
}

export default Role
