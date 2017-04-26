import React, {Component} from 'react';
import {Modal,Form} from 'antd';
import ajax from '../../utils/ajax'
const FormItem = Form.Item;


class TrainSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleArr: [],
      selectedArr:[],
    }
  };

  componentDidMount() {
    var s = this;
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
    }
    this.setState({selectedArr: []});
    this.props.onOk();
  }

  selectRows(){
    this.setState({selectedArr:this.props.selectedRoleIds})
  }

  columns = [{
    dataIndex: 'role_name',
    key: 'role_name',
    title: '角色名称',
  }]

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    return (<Modal visible={this.props.dialogType>0}
                   key={this.props.dialogKey}
                   title={this.props.title}
                   onCancel={this.dialogOk.bind(this, false)}
                   onOk={this.dialogOk.bind(this, true)}>
      <Form>

      </Form>
    </Modal>);
  }
}

export default Form.create()(TrainSave);
