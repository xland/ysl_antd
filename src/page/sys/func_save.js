import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input,InputNumber  } from 'antd';
import ajax from '../../utils/ajax'
const FormItem = Form.Item;


class FuncSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  };
  componentDidMount(){
  }
  dialogOk(flag){
    if(flag){
      var s = this;
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
      this.props.onOk();
    }
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator } = this.props.form;
    const { func_name, order_num, path,des,icon } = this.props.record;
    return (<Modal visible={this.props.isVisable>=0}
                   key={this.props.dialogKey}
                   onCancel={this.dialogOk.bind(this,false)}
                   onOk={this.dialogOk.bind(this,true)}
                   title={this.props.title}>
      <Form>
        <FormItem {...formItemLayout}  label="权限名称">
          {
            getFieldDecorator('func_name', {
              initialValue: func_name,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="权限路径">
          {
            getFieldDecorator('path', {
              initialValue: path,
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="权限图标">
          {
            getFieldDecorator('icon', {
              initialValue: icon,
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="权限排序">
          {
            getFieldDecorator('order_num', {
              initialValue: order_num?order_num:0,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<InputNumber size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="权限备注">
          {
            getFieldDecorator('des', {
              initialValue: des,
            })(<Input size="small" type="textarea" rows="4" />)
          }
        </FormItem>
      </Form>
    </Modal>);
  }

}

export default Form.create()(FuncSave);
