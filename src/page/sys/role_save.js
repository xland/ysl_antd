import React, { Component } from 'react';
import { Modal, Form, Input,InputNumber  } from 'antd';
import ajax from '../../utils/ajax'
const FormItem = Form.Item;


class AccountSave extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  };
  componentDidMount(){
  }
  dialogOk(flag){
    if(!flag){
      this.props.onOk();
      return;
    }
    var s = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var obj = {...this.props.record,...values};
      var s = this;
      ajax.post("Sys/Role/SaveRole",obj).then(function ({data}) {
        s.props.onOk(true);
      })
    });
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const { getFieldDecorator } = this.props.form;
    return (<Modal visible={this.props.dialogType>0}
                   key={this.props.dialogKey}
                   onCancel={this.dialogOk.bind(this,false)}
                   onOk={this.dialogOk.bind(this,true)}
                   title={this.props.title}>
      <Form>
        <FormItem {...formItemLayout}  label="角色名称">
          {
            getFieldDecorator('role_name', {
              initialValue: this.props.record.role_name,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                }, {
                  min:3,
                  message: '不能少于2个字符',
                },{
                  validator: (r,v,cb)=>{
                    const { getFieldValue } = this.props.form;
                    if (v.length>2&&this.props.dialogType === 1) {
                      ajax.post("Sys/Role/CheckRoleName",{role_name:v}).then(function ({data}) {
                        if(data.data){
                          cb('系统中已存在相同的帐号！');
                        }else{
                          cb()
                        }
                      })
                      return;
                    }
                    cb()
                  }
                }
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="角色排序">
          {
            getFieldDecorator('order_num', {
              initialValue: this.props.record.order_num,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<InputNumber size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="角色描述">
          {
            getFieldDecorator('des', {
              initialValue: this.props.record.des,
            })(<Input type="textarea" rows="4" size="small" />)
          }
        </FormItem>
      </Form>
    </Modal>);
  }

}

export default Form.create()(AccountSave);
