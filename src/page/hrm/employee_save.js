import React, { Component } from 'react';
import { Modal, Form, Input,InputNumber,Col,Row,Radio,DatePicker  } from 'antd';
import ajax from '../../utils/ajax'
import util from '../../utils/util'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
var moment = require('moment');


class EmployeeSave extends Component {
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
      var obj = {...this.props.dialogRecord,...values};
      var s = this;
      ajax.post("Hrm/Employee/SaveEmployee",obj).then(function ({data}) {
        s.props.onOk(true);
      })
    });
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    let title ="";
    if(this.props.dialogType === 1){title = "增加员工"}
    if(this.props.dialogType === 2){title =  "修改员工"}
    const { getFieldDecorator } = this.props.form;
    return (<Modal visible={this.props.dialogType>0}
                   key={this.props.dialogKey}
                   width={560}
                   onCancel={this.dialogOk.bind(this,false)}
                   onOk={this.dialogOk.bind(this,true)}
                   title={title}>
      <Form>
        <Row gutter={18} type={'flex'}>
          <Col span={12} key="1">
        <FormItem {...{
          labelCol: { span: 7 },
          wrapperCol: { span: 15 },
        }} label="姓名">
          {
            getFieldDecorator('employee_name', {
              initialValue: this.props.dialogRecord.employee_name,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input size="small" />)
          }
        </FormItem>
          </Col>
          <Col  span={12} key="2">
        <FormItem {...{
          labelCol: { span: 7 },
          wrapperCol: { span: 15 },
        }} label="性别">
          {
            getFieldDecorator('sex', {
              initialValue: this.props.dialogRecord.sex||1,
            })(<RadioGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>)
          }
        </FormItem>
          </Col>
        </Row>
        <Row gutter={18} type={'flex'}>
          <Col span={12} key="1">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 15 },
            }} label="身份证">
              {
                getFieldDecorator('id_num', {
                  initialValue: this.props.dialogRecord.id_num,
                  rules: [
                    {
                      required: true,
                      message: ' ',
                    },
                    {
                      validator: (r,v,cb)=>{
                        var flag = util.IdentityCodeValid(v);
                        if(!flag){
                          cb('身份证号码错误！')
                        }
                        cb()
                      }
                    }
                  ],
                })(<Input size="small" />)
              }
            </FormItem>
          </Col>
          <Col  span={12} key="2">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 15 },
            }} label="工号">
              {
                getFieldDecorator('emp_num', {
                  initialValue: this.props.dialogRecord.emp_num,
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<Input size="small" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={18} type={'flex'}>
          <Col span={12} key="1">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 15 },
            }} label="婚否">
              {
                getFieldDecorator('marriage', {
                  initialValue: this.props.dialogRecord.marriage||2,
                })(<RadioGroup onChange={this.onChange}>
                  <Radio value={1}>已婚</Radio>
                  <Radio value={2}>未婚</Radio>
                </RadioGroup>)
              }
            </FormItem>
          </Col>
          <Col  span={12} key="2">
            <FormItem {...{
              labelCol: { span: 8 },
              wrapperCol: { span: 15 },
            }} label="育儿数">
              {
                getFieldDecorator('childrenNum', {
                  initialValue: this.props.dialogRecord.childrenNum||0,
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<InputNumber size="small" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={18} type={'flex'}>
          <Col span={12} key="1">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 15 },
            }} label="到岗">
              {
                getFieldDecorator('in_time', {
                  initialValue: this.props.dialogRecord.in_time?moment(this.props.dialogRecord.in_time.split('T')[0]):moment(),
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<DatePicker size="small" />)
              }
            </FormItem>
          </Col>
          <Col span={12} key="2">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 16 },
            }} label="转正">
              {
                getFieldDecorator('regular_time', {
                  initialValue: this.props.dialogRecord.regular_time?moment(this.props.dialogRecord.regular_time.split('T')[0]):moment(),
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<DatePicker size="small" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={18} type={'flex'}>
          <Col span={12} key="1">
            <FormItem {...{
              labelCol: { span: 9 },
              wrapperCol: { span: 15 },
            }} label="紧急联系人">
              {
                getFieldDecorator('emergency_name', {
                  initialValue: this.props.dialogRecord.emergency_name,
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<Input size="small" />)
              }
            </FormItem>
          </Col>
          <Col span={12} key="2">
            <FormItem {...{
              labelCol: { span: 12 },
              wrapperCol: { span: 11 },
            }} label="紧急联系人电话">
              {
                getFieldDecorator('emergency_phone_num', {
                  initialValue: this.props.dialogRecord.emergency_phone_num,
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<Input size="small" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={18} type={'flex'}>
          <Col span={12} key="1">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 15 },
            }} label="座机">
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
          </Col>
          <Col span={12} key="2">
            <FormItem {...{
              labelCol: { span: 7 },
              wrapperCol: { span: 15 },
            }} label="手机">
              {
                getFieldDecorator('phone_num', {
                  initialValue: this.props.dialogRecord.phone_num,
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(<Input size="small" />)
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>);
  }

}

export default Form.create()(EmployeeSave);
