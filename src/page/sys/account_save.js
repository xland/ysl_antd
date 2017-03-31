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
      ajax.post("Sys/Account/SaveAccount",obj).then(function ({data}) {
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
        <FormItem {...formItemLayout}  label="帐号">
          {
            getFieldDecorator('account_name', {
              initialValue: this.props.record.account_name,
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
                    if (v.length>2) {
                      ajax.post("Sys/Account/CheckAccountName",{account_name:v}).then(function ({data}) {
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
            })(<Input size="small" disabled={this.props.dialogType === 2} />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="密码">
          {
            getFieldDecorator('pass_word', {
              initialValue: this.props.record.pass_word,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout}  label="重复密码">
          {
            getFieldDecorator('pass_word2', {
              initialValue: this.props.record.pass_word,
              rules: [{
                required: true,
                message: '请再次输入以确认密码',
              }, {
                validator: (r,v,cb)=>{
                  const { getFieldValue } = this.props.form;
                  if (v && v !== getFieldValue('pass_word')) {
                    cb('两次输入不一致！');
                    return;
                  }
                  cb()
                }
              }],
            })(<Input size="small" />)
          }
        </FormItem>
      </Form>
    </Modal>);
  }

}

export default Form.create()(AccountSave);
