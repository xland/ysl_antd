import React, {Component} from 'react'
import {connect} from 'dva';
import {Table, Popconfirm, Row, Col, Button, Card,Tag} from 'antd'
import FuncSave from './func_save'
import styles from './func.less'
import ajax from '../../utils/ajax'
import util from '../../utils/util'

class Func extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeFunc:[],
      dialogType:-1,
      dialogTitle:'增加',
      dialogRecord:{},
      dialogKey:'',
    }
  };

  componentDidMount() {
    var s = this;
    ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
      s.setState({treeFunc:data.data,});
    })
  };

  dialogOk(flag){
    this.setState({dialogVisable:-1,dialogKey:util.createId(),});
    if(flag){
      var s = this;
      ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
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
    var cur={};
    var t;
    if(type===1){
      t="增加同级菜单"
      cur.pid = r.pid;
    }else if(type === 2){
      t="增加子级菜单";
      cur.pid = r.id;
    }else{
      t = '修改权限';
      cur = r;
    }
    this.setState({
      dialogVisable:type,
      dialogTitle:t,
      dialogRecord:cur,
    });
  }

  render(){
    const columns = [{
      title: '权限名称',
      dataIndex: 'func_name',
      key: 'func_name',
      width: 280,
      className: styles.tdLeft,
    }, {
      title: '权限路径',
      dataIndex: 'path',
      key: 'path',
    }, {
      title: '权限排序',
      dataIndex: 'order_num',
      key: 'order_num',
      width: 120,
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 360,
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm title="确认要删除该记录吗?" onConfirm={this.del.bind(this, record.id)}>
              <Tag color="red">删除</Tag>
            </Popconfirm>
            <Tag onClick={this.openDialog.bind(this,record,0)} color="blue">修改</Tag>
            <Tag onClick={this.openDialog.bind(this,record,1)} color="blue">增加同级菜单</Tag>
            <Tag onClick={this.openDialog.bind(this,record,2)} color="blue">增加子级菜单</Tag>
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
        <FuncSave title={this.state.dialogTitle}
                  record={this.state.dialogRecord}
                  isVisable={this.state.dialogVisable}
                  dialogKey={this.state.dialogKey}
                  onOk={this.dialogOk.bind(this)} />
      </div>
    )
  }
}

export default Func
