import React, {Component} from 'react';
import {Modal, Table,Tree} from 'antd';
import ajax from '../../utils/ajax'
import util from '../../utils/util'
const TreeNode = Tree.TreeNode;

class RoleFunc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogKey:'',
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
      var a_r = this.state.selectedArr.map((item)=>{
        return {role_id:s.props.record.id,func_id:item};
      });
      ajax.post("Sys/Role/SaveRoleFunc",{
        role_id:s.props.record.id,
        role_func:a_r,
      }).then(function ({data}) {

      })
    }
    this.setState({visable:false,selectedArr: [],dialogKey:util.createId()});
  }

  showDialog(r){
    var self = this;
    ajax.post("Sys/Role/GetRoleFunc",{
      id:r.id
    }).then(function ({data}) {
      var arr = data.data.map(item=>{
        return item.id;
      })
      self.setState({visable:true,selectedArr:arr});
    })
  }
  onCheck(checkedKeys){
    this.setState({selectedArr:checkedKeys});
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
                   key={this.state.dialogKey}
                   onCancel={this.dialogOk.bind(this, false)}
                   onOk={this.dialogOk.bind(this, true)}
                   title={`给角色设置权限`}>
      <div style={{height:280,overflowY:'scroll',margin:-16}}>
      <Tree
        checkable
        onCheck={this.onCheck.bind(this)}
        checkedKeys={this.state.selectedArr}
      >
        {
          this.state.funcs.map(item=>{
            return this.getTreeNode(item);
          })
        }
      </Tree>
      </div>
    </Modal>);
  }

}

export default RoleFunc;
