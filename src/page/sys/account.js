import React, {Component} from 'react'
import {Table, Popconfirm, Row, Col, Button, Card,Tag,Input} from 'antd'
import AccountSave from './account_save'
import AccountRole from './account_role'
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
      dialogType:0,
      dialogTitle:'增加',
      dialogRecord:{},
      dialogKey:'',
      roleDialogKey:'',
      roleDialogVisable:false,
      searchTxt:'',
      curPageIndex:1,
      selectedRoles:[],
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
    let h = document.body.clientHeight-198;
    if(h < 180){
      h = 180;
    }
    this.setState({tableHeight:h});
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{pager:{}}).then(function ({data}) {
      s.setState({accountArr:data.data,rowCount:data.rowCount});
    })
  };
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.onWindowResize)
  // }

  dialogOk(flag){
    if(!flag){
      this.setState({dialogType:0,dialogKey:util.createId(),});
      return;
    }
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{
      pager:{page_index:this.state.curPageIndex-1}
    }).then(function ({data}) {
      s.setState({accountArr:data.data,dialogType:0,dialogKey:util.createId(),rowCount:data.rowCount,});
    })
  }
  roleDialogOk(flag){
    if(!flag){
      this.setState({roleDialogVisable:false,roleDialogKey:util.createId(),});
      return;
    }
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{
      pager:{page_index:this.state.curPageIndex-1}
    }).then(function ({data}) {
      s.setState({accountArr:data.data,dialogType:0,dialogKey:util.createId(),rowCount:data.rowCount,});
    })
  }

  del(id){
    var s = this;
    ajax.post("Sys/Account/DelAccount",{id}).then(function ({data}) {
      if(data.code === 0){
        ajax.post("Sys/Account/GetAccountByPage",{
          pager:{page_index:this.state.curPageIndex-1}
        }).then(function ({data}) {
          s.setState({accountArr:data.data,rowCount:data.rowCount});
        })
      }
    })
  }
  openDialog(r,type){
    this.setState({
      dialogType:type,
      dialogTitle:type===1?"增加账户":'修改账户',
      dialogRecord:r,
    });
  }

  openRoleDialog(r,type){
    this.setState({
      roleDialogVisable:true,
      dialogRecord:r,
    });
  }

  getPagerTxt = (total, range) => {
    return (
      <span style={{color:'#acacac'}}>系统中共有{total}行记录，本页从第{range[0]}行记录开始，共展示{range[1]-range[0]+1}行记录</span>
    )}

  changePagerIndex = (page, pageSize)=>{
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{
      pager:{page_index:page-1}
    }).then(function ({data}) {
      s.setState({accountArr:data.data,
        curPageIndex:page,
        rowCount:data.rowCount});
    })
  }

  searchAccount = (v) => {
    var s = this;
    ajax.post("Sys/Account/GetAccountByPage",{
      pager:{page_index:this.state.curPageIndex-1},
      searchTxt:v
    }).then(function ({data}) {
      s.setState({accountArr:data.data,
        rowCount:data.rowCount});
    })
  }
  changeSearchTxt = (e)=>{

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
            <Tag onClick={this.openDialog.bind(this,record,2)} color="blue">修改</Tag>
            <Tag onClick={this.openRoleDialog.bind(this,record)} color="blue">设置角色</Tag>
          </div>
        )
      },
    }];
    //todo:滚动条有瑕疵
    return(
      <div>
        <div style={{height:36,paddingTop:6,clear:'both'}}>
          <Search size="small"
            placeholder="请输入要搜索的帐号"
                  onChange={e=>this.setState({searchTxt:e.target.value})}
            style={{ width: 200,float:'left' }}
                  value={this.state.searchTxt}
            onSearch={this.searchAccount}
          />
          <Tag onClick={this.openDialog.bind(this,{},1)} style={{float:"right"}} color="blue-inverse">新增账户</Tag>
        </div>
        <Table columns={columns} scroll={{ y: this.state.tableHeight }}
               pagination={{size:"small",total:this.state.rowCount,showQuickJumper:true,defaultPageSize:38,
                 onChange:this.changePagerIndex,
                 showTotal:this.getPagerTxt,
               }}
               rowKey={record => record.id}
               dataSource={this.state.accountArr}
               bordered size="small"/>
        <AccountSave title={this.state.dialogTitle}
                  record={this.state.dialogRecord}
                  dialogType={this.state.dialogType}
                  dialogKey={this.state.dialogKey}
                  onOk={this.dialogOk.bind(this)} />
        <AccountRole record={this.state.dialogRecord}
                     dialogVisable={this.state.roleDialogVisable}
                     dialogKey={this.state.roleDialogKey}
                     selectedRoles={this.state.selectedRoles}
                     onOk={this.roleDialogOk.bind(this)}></AccountRole>
      </div>
    )
  }
}

export default Account
