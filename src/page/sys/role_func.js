import React, {Component} from 'react';
import {Modal, Table,Tree} from 'antd';
import ajax from '../../utils/ajax'
const TreeNode = Tree.TreeNode;

class RoleFunc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      funcs: [],
      selectedArr:[],
      visable:false,
    }
  };

  componentDidMount() {
    var s = this;
    ajax.post("Sys/Func/GetAllFuncTree").then(function ({data}) {
      s.setState({funcs: data.data});
    })
  }

  dialogOk(flag) {
    if (flag) {
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
    }else{
      this.setState({visable:false})
    }
    this.setState({selectedArr: []});
  }

  selectRows(){
    this.setState({selectedArr:this.props.selectedRoleIds})
  }

  showDialog(r){
    this.setState({visable:true})
  }

  getTreeNode(item){
    var subs;
    if(item.children){
      subs = item.children.map(m=>{
        return this.getTreeNode(m);
      })
    }
    return (
      <TreeNode key={item.id} title={item.func_name}>
        {subs}
      </TreeNode>
    )
  }

  render() {
    return (<Modal visible={this.state.visable}
                   key={this.props.dialogKey}
                   onCancel={this.dialogOk.bind(this, false)}
                   onOk={this.dialogOk.bind(this, true)}
                   title={`给角色设置权限`}>
      <Tree
        checkable
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        {
          this.state.funcs.map(item=>{
            return this.getTreeNode(item);
          })
        }
      </Tree>
    </Modal>);
  }

}

export default RoleFunc;
