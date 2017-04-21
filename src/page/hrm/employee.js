import React, {Component} from 'react'
import {Table, Popconfirm, Row, Col, Button, Card,Tag,Input} from 'antd'
import ajax from '../../utils/ajax'
import util from '../../utils/util'
import EmployeeSave from './employee_save'

const Search = Input.Search;

class Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountArr:[],
      rowCount:0,
      tableHeight:180,
      dialogType:0,
      dialogRecord:{},
      dialogKey:'',
      roleDialogKey:'',
      roleDialogVisable:false,
      searchTxt:'',
      curPageIndex:1,
      selectedRoleIds:[],
    }
  };
  //todo:这里不是动态变化高度的，不知道为什么，暂时先不用
  componentDidMount() {
    let h = document.body.clientHeight-198;
    let w = document.body.clientWidth-50;
    if(h < 180){
      h = 180;
    }
    this.setState({tableHeight:h,tableWidth:w});
    var s = this;
    ajax.post("Hrm/Employee/GetEmployeeByPage",{pager:{}}).then(function ({data}) {
      s.setState({accountArr:data.data,rowCount:data.rowCount});
    })
  };

  dialogOk(flag){
    if(!flag){
      this.setState({dialogType:0,dialogKey:util.createId(),});
      return;
    }
    var s = this;
    ajax.post("Hrm/Employee/GetEmployeeByPage",{
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
    ajax.post("Hrm/Employee/DelEmployee",{id}).then(function ({data}) {
      if(data.code === 0){
        ajax.post("Hrm/Employee/GetEmployeeByPage",{
          pager:{page_index:s.state.curPageIndex-1}
        }).then(function ({data}) {
          s.setState({accountArr:data.data,rowCount:data.rowCount});
        })
      }
    })
  }
  openDialog(r,type){
    this.setState({
      dialogType:type,
      dialogRecord:r,
    });
  }

  openRoleDialog(r,type){
    var s = this;
    ajax.post("Sys/Account/GetAccountRole", {
      id: r.id
    }).then(function ({data}) {
      var arr = data.data.map(item=>item.id);
      s.setState({
        roleDialogVisable:true,
        dialogRecord:r,
        selectedRoleIds: arr
      });
      s.refs.accountRoleDialog.selectRows();
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
        rowCount:data.rowCount
      });
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

  columns = [
  {
    title: '姓名',
    dataIndex: 'employee_name',
    key: 'employee_name',
    fixed: 'left',
    width: 80,
  },{
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 58,
    fixed: 'left',
    render:text=>{
      let t = "未知";
      if(text === "0"){
        t = "女";
      }else if(text === "1"){
        t = "男";
      }
      return (t)
    },
  }, {
    title: '身份证',
    dataIndex: 'id_num',
    key: 'id_num',
    width: 160,
  }, {
    title: '工号',
    dataIndex: 'emp_num',
    key: 'emp_num',
    width: 120,
  }, {
    title: '婚姻',
    dataIndex: 'marriage',
    key: 'marriage',
    width: 80,
    render:text=>{
      let t = "未知";
      if(text === "0"){
        t = "未婚";
      }else if(text === "1"){
        t = "已婚";
      }
      return (t)
    }
  }, {
    title: '孩子',
    dataIndex: 'childrenNum',
    key: 'childrenNum',
    width: 80,
    render:text=>{
      return (text+"个")
    }
  }, {
    title: '到岗时间',
    dataIndex: 'in_time',
    key: 'in_time',
    width: 80,
    render:text=>{
      return (text.split('T')[0])
    }
  },{
    title: '转正时间',
    dataIndex: 'regular_time',
    key: 'regular_time',
    width: 80,
    render:text=>{
      return (text.split('T')[0])
    }
  },{
    title: '常用号码',
    dataIndex: 'phone_num',
    key: 'phone_num',
    width: 120,
  }, {
    title: '紧急联系人',
    dataIndex: 'emergency_name',
    key: 'emergency_name',
    width: 160,
  }, {
    title: '紧急联系号码',
    dataIndex: 'emergency_phone_num',
    key: 'emergency_phone_num',
    width: 160,
  }, {
    title: '生日',
    dataIndex: 'birthday',
    key: 'birthday',
    width: 80,
    render:text=>{
      return (text.split('T')[0])
    },
  },{
    title: '状态',
    dataIndex: 'employee_state',
    key: 'employee_state',
    width: 60,
  },{
    title: '座机',
    dataIndex: 'telphone',
    key: 'telphone',
    width: 80,
  },{
    title: '录入时间',
    dataIndex: 'add_time',
    key: 'add_time',
    width: 128,
    render:text=>{
      return (text.replace(/T/,' '))
    }
  },{
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
    render: (text, record, index) => {
      return (
        <div>
          <Popconfirm title="确认要删除该员工吗?" onConfirm={this.del.bind(this, record.id)}>
            <Tag color="red">删除</Tag>
          </Popconfirm>
          <Tag onClick={this.openDialog.bind(this,record,2)} color="blue">修改</Tag>
        </div>
      )
    },
  }];
  render(){
    //todo:滚动条有瑕疵
    return(
      <div>
        <div style={{height:36,paddingTop:6,clear:'both'}}>
          <Search size="small"
            placeholder="请输入要搜索的员工姓名"
                  onChange={e=>this.setState({searchTxt:e.target.value})}
            style={{ width: 200,float:'left' }}
                  value={this.state.searchTxt}
            onSearch={this.searchAccount}
          />
          <Tag onClick={this.openDialog.bind(this,{},1)} style={{float:"right"}} color="blue-inverse">新增员工</Tag>
        </div>
        <Table columns={this.columns} scroll={{ y: this.state.tableHeight,x: this.state.tableWidth }}
               pagination={{size:"small",total:this.state.rowCount,showQuickJumper:true,defaultPageSize:28,
                 onChange:this.changePagerIndex,
                 showTotal:this.getPagerTxt,
               }}
               bordered={true}
               rowKey={record => record.id}
               dataSource={this.state.accountArr}
                />
        <EmployeeSave
          dialogRecord={this.state.dialogRecord}
          dialogType={this.state.dialogType}
          onOk={this.dialogOk.bind(this)}
          dialogKey={this.state.dialogKey}
        />
      </div>
    )
  }
}

export default Employee
