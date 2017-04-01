import React, {Component} from 'react';
import {Modal, Table} from 'antd';
import ajax from '../../utils/ajax'


class AccountRole extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleArr: [],
      selectedArr:[],
    }
  };

  componentWillMount() {
    var s = this;
    ajax.post("Sys/Role/GetAllRole").then(function ({data}) {
      s.setState({roleArr: data.data});
    })
  }

  componentWillReceiveProps(){
    if(!this.props.dialogVisable){
      var s = this;
      ajax.post("Sys/Account/GetAccountRole", {
        id: this.props.record.id
      }).then(function ({data}) {
        var arr = data.data.map(item=>item.id)
        s.setState({selectedArr: arr});
      })
    }
  }

  dialogOk(flag) {
    if (!flag) {
      this.props.onOk();
      return;
    }
    var s = this;
    var a_r = [];
    this.state.selectedArr.forEach((item,index)=>{
      var obj = {account_id:this.props.record.id,role_id:item};
      a_r.push(obj);
    });
    ajax.post("Sys/Account/UpdateAccountRole",{
      account_id:this.props.record.id,
      account_role:a_r,
    }).then(function ({data}) {
    })
    this.props.onOk();
  }

  columns = [{
    dataIndex: 'role_name',
    key: 'role_name',
    title: '角色名称',
  }]

  rowSelection = () => {
    return
}

  render() {
    return (<Modal visible={this.props.dialogVisable}
                   key={this.props.dialogKey}
                   onCancel={this.dialogOk.bind(this, false)}
                   onOk={this.dialogOk.bind(this, true)}
                   title={`给${this.props.record.account_name}设置角色`}>
      <Table columns={this.columns}
             rowKey="id"
             scroll={{y: 198}}
             pagination={false}
             rowSelection={
               {
                 onChange: (selectedRowKeys, selectedRows) => {
                   this.setState({selectedArr:selectedRowKeys})
                 },
                 selectedRowKeys: this.state.selectedArr,
               }
             }
             dataSource={this.state.roleArr}
             bordered size="small"/>
    </Modal>);
  }

}

export default AccountRole;
