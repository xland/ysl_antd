import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input,InputNumber  } from 'antd';
import ajax from '../../utils/ajax'
import util from '../../utils/util'
const FormItem = Form.Item;

class DepartmentSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogType:-1,
    }
  };
  componentDidMount(){
  }
  dialogOk(flag){
    var s = this;
    if(flag){
      this.props.form.validateFields((err, values) => {
        if (!err) {
          var obj = {...this.props.record,...values};
          console.log(obj);
          var s = this;
          ajax.post("Sys/Func/SaveFunc",obj).then(function ({data}) {
            s.props.onOk(true);
          })
        }
      });
    }else{
      s.props.onOk(false);
    }
  }

  render(){
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    let title ="";
    if(this.props.dialogType === 0){title = "修改部门"}
    if(this.props.dialogType === 1){title =  "增加同级部门"}
    if(this.props.dialogType === 2){title =  "增加子级部门"}
    const { getFieldDecorator } = this.props.form;
    return (<Modal visible={this.props.dialogType>=0}
                   key={this.props.dialogKey}
                   onOk={this.dialogOk.bind(this,true)}
                   onCancel={this.dialogOk.bind(this,false)}
                   title={title}>
      <Form>
        <FormItem {...formItemLayout} label="部门名称">
          {
            getFieldDecorator('department_name', {
              initialValue: this.props.dialogRecord.department_name,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="部门排序">
          {
            getFieldDecorator('order_num', {
              initialValue: this.props.dialogRecord.order_num,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<InputNumber size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="部门电话">
          {
            getFieldDecorator('telphone', {
              initialValue: this.props.dialogRecord.telphone,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="部门简介">
          {
            getFieldDecorator('des', {
              initialValue: this.props.dialogRecord.des,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" type="textarea" rows="4" />)
          }
        </FormItem>
      </Form>
    </Modal>);
  }

}

export default Form.create()(DepartmentSave);
