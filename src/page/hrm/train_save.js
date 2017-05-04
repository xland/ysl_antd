import React, {Component} from 'react';
import {Modal,Form, Input,InputNumber } from 'antd';
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


  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
    };
    const { getFieldDecorator } = this.props.form;
    return (<Modal visible={this.props.dialogType>0}
                   key={this.props.dialogKey}
                   title={this.props.title}
                   onCancel={this.dialogOk.bind(this, false)}
                   onOk={this.dialogOk.bind(this, true)}>
      <Form>
        <FormItem {...formItemLayout} label="培训项目名称">
          {
            getFieldDecorator('train_title', {
              initialValue: this.props.record.train_title,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="开始-结束">
          {
            getFieldDecorator('train_title', {
              initialValue: this.props.record.train_title,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="是否循环培训">
        {
          getFieldDecorator('train_title', {
            initialValue: this.props.record.train_title,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input size="small" />)
        }
        </FormItem>
        <FormItem {...formItemLayout} label="是否循环培训">
          {
            getFieldDecorator('train_title', {
              initialValue: this.props.record.train_title,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="培训项目描述">
          {
            getFieldDecorator('train_title', {
              initialValue: this.props.record.train_title,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small"  type="textarea" rows="4" />)
          }
        </FormItem>
      </Form>
    </Modal>);
  }
}

export default Form.create()(TrainSave);
