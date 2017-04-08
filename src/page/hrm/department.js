import React, {Component} from 'react'
import {Table, Popconfirm, Row, Col, Button, Card,Tag} from 'antd'
import ajax from '../../utils/ajax'
import util from '../../utils/util'
import DepartmentSave from './department_save'

class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeFunc:[],
      dialogType:-1,
      dialogKey:'',
      dialogRecord:{}
    }
  };

  componentDidMount() {
    var s = this;
    ajax.post("Hrm/Department/GetAllDepartmentTree").then(function ({data}) {
      s.setState({treeFunc:data.data,});
    })
  };

  dialogOk(flag){
    this.setState({dialogType:-1,dialogKey:util.createId(),});
    if(flag){
      var s = this;
      ajax.post("Hrm/Department/GetAllDepartmentTree").then(function ({data}) {
        s.setState({treeFunc:data.data,});
      })
    }
  }

  del(id){
    var s = this;
    ajax.post("Sys/Func/DelFunc",{id}).then(function ({data}) {
      if(data.code === 0){
        ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
          s.setState({treeFunc:data.data,});
        })
      }
    })
  }
  openDialog(r,type){
    this.setState({dialogRecord:r,dialogType:type});
  }

  render(){
    const columns = [{
      title: '部门名称',
      dataIndex: 'department_name',
      key: 'department_name',
    }, {
      title: '部门负责人',
      dataIndex: 'leader_name',
      key: 'leader_name',
      width: 158,
    },{
      title: '部门排序',
      dataIndex: 'order_num',
      key: 'order_num',
      width: 108,
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 360,
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm title="确认要删除该部门吗?" onConfirm={this.del.bind(this, record.id)}>
              <Tag color="red">删除</Tag>
            </Popconfirm>
            <Tag onClick={this.openDialog.bind(this,record,0)} color="blue">修改</Tag>
            <Tag onClick={this.openDialog.bind(this,record,1)} color="blue">增加同级部门</Tag>
            <Tag onClick={this.openDialog.bind(this,record,2)} color="blue">增加子级部门</Tag>
          </div>
        )
      },
    }];
    return(
      <div>
        <Table columns={columns}
               pagination={false}
               rowKey={record => record.id}
               dataSource={this.state.treeFunc}
               bordered size="small"/>
        <DepartmentSave
          dialogRecord={this.state.dialogRecord}
          dialogType={this.state.dialogType}
          onOk={this.dialogOk.bind(this)}
          dialogKey={this.state.dialogKey}
        ></DepartmentSave>
      </div>
    )
  }
}

export default Department
