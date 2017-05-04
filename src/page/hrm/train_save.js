import React, {Component} from 'react';
import {Modal,Form, Input,InputNumber,DatePicker,Radio,Select  } from 'antd';
import ajax from '../../utils/ajax'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;


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
    var s = this;
    if (flag) {
      s.props.form.validateFields((err, values) => {
        if (!err) {
          var obj = {...this.props.record,...values};
          obj.begin_time = obj.rangeTime[0];
          obj.end_time = obj.rangeTime[1];
          obj.rangeTime = undefined;
          ajax.post("Hrm/Train/SaveTrain",obj).then(function ({data}) {
            s.props.onOk(true);
          })
        }
      });
    }else{
      s.props.onOk(false);
    }
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
            getFieldDecorator('rangeTime', {
              initialValue: [this.props.record.begin_time,this.props.record.end_time],
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<RangePicker size="small" />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="是否循环培训">
        {
          getFieldDecorator('is_loop', {
            initialValue: this.props.record.is_loop||2,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<RadioGroup>
            <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </RadioGroup>)
        }
        </FormItem>
        <FormItem {...formItemLayout} label="循环周期">
          {
            getFieldDecorator('loop_type', {
              initialValue: this.props.record.loop_type,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Select>
              <Option value="1">日</Option>
              <Option value="2">周</Option>
              <Option value="3">月</Option>
              <Option value="4">季度</Option>
              <Option value="5">年</Option>
            </Select>)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="培训项目描述">
          {
            getFieldDecorator('des', {
              initialValue: this.props.record.des,
            })(<Input size="small"  type="textarea" rows="4" />)
          }
        </FormItem>
      </Form>
    </Modal>);
  }
}

export default Form.create()(TrainSave);
