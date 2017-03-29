import React, {Component} from 'react'
import {Table, Popconfirm, Row, Col, Button, Card,Tag,Input} from 'antd'
import AccountSave from './account_save'
import ajax from '../../utils/ajax'
import util from '../../utils/util'

const Search = Input.Search;

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountArr:[],
      rowCount:0,
      tableHeight:180,
      dialogVisable:false,
      dialogTitle:'增加',
      dialogRecord:{},
      dialogKey:'',
    }
  };
  onWindowResize(){
    let h = document.body.clientHeight-198;
    if(h < 180){
      h = 180;
    }
    this.setState({tableHeight:h});
  };
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize();
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{}).then(function ({data}) {
      console.log(data);
      s.setState({accountArr:data.data,rowCount:data.rowCount});
    })
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  dialogOk(flag){
    if(!flag){
      this.setState({dialogVisable:false,dialogKey:util.createId(),});
      return;
    }
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{}).then(function ({data}) {
      s.setState({accountArr:data.data,dialogVisable:false,dialogKey:util.createId(),rowCount:data.rowCount,});
    })
  }

  del(id){
    var s = this;
    ajax.post("Sys/Func/DelFunc",{id}).then(function ({data}) {
      if(data.code === 0){
        ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
          s.setState({accountArr:data.data,});
        })
      }
    })
  }
  openDialog(r){
    this.setState({
      dialogVisable:true,
      dialogTitle:"增加账户",
      dialogRecord:r,
    });
  }

  render(){
    const columns = [{
      title: '用户名',
      dataIndex: 'account_name',
      key: 'account_name',

    }, {
      title: '账户创建时间',
      dataIndex: 'add_time',
      key: 'add_time',
      width: 180,
      render:text=>{
        return (text.replace(/T/,' '))
      }
    },{
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 220,
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm title="确认要删除该帐号吗?" onConfirm={this.del.bind(this, record.id)}>
              <Tag color="red">删除</Tag>
            </Popconfirm>
            <Tag onClick={this.openDialog.bind(this,record,0)} color="blue">修改</Tag>
          </div>
        )
      },
    }];
    return(
      <div>
        <div style={{height:36,paddingTop:6,clear:'both'}}>
          <Search size="small"
            placeholder="请输入要搜索的帐号"
            style={{ width: 200,float:'left' }}
            onSearch={value => console.log(value)}
          />
          <Tag onClick={this.openDialog.bind(this,{})} style={{float:"right"}} color="blue-inverse">新增账户</Tag>
        </div>
        <Table columns={columns} scroll={{ y: this.state.tableHeight }}
               pagination={{size:"small",total:this.state.rowCount,showQuickJumper:true,defaultPageSize:38,
                 showTotal:(total, range) => {
                  return (
                   <span style={{color:'#acacac'}}>系统中共有{total}行记录，本页从第{range[0]}行记录开始，共展示{range[1]-range[0]+1}行记录</span>
                  )}
               }}
               rowKey={record => record.id}
               dataSource={this.state.accountArr}
               bordered size="small"/>
        <AccountSave title={this.state.dialogTitle}
                  record={this.state.dialogRecord}
                  isVisable={this.state.dialogVisable}
                  dialogKey={this.state.dialogKey}
                  onOk={this.dialogOk.bind(this)} />
      </div>
    )
  }
}

export default Account