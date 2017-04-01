import React, {Component} from 'react';
import {Modal, Table} from 'antd';
import ajax from '../../utils/ajax'


class AccountRole extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleArr: [],
    }
  };

  componentDidMount() {
    var s = this;
    ajax.post("Sys/Role/GetAllRole").then(function ({data}) {
      data.data.forEach((item,index)=>{
        item.key = item.id;
      });
      s.setState({roleArr: data.data});
    })
  }

  dialogOk(flag) {
    if (!flag) {
      this.props.onOk();
      return;
    }
    var s = this;
  }

  columns = [{
    dataIndex: 'role_name',
    key: 'role_name',
    title: '角色名称',
  }]

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: record => ({
      //disabled: record.name === 'Disabled User',
    }),
  }

  render() {
    return (<Modal visible={this.props.dialogVisable}
                   key={this.props.dialogKey}
                   onCancel={this.dialogOk.bind(this, false)}
                   onOk={this.dialogOk.bind(this, true)}
                   title={`给${this.props.record.account_name}设置角色`}>
      <Table columns={this.columns}
             rowKey="id"
             scroll={{y:198}}
             pagination={false} rowSelection={this.rowSelection}
             dataSource={this.state.roleArr}
             bordered size="small" />
    </Modal>);
  }

}

export default AccountRole;
