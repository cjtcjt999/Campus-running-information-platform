import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Switch, Input, DatePicker,Row,Col } from 'antd';
import { SearchOutlined, RedoOutlined, AlignLeftOutlined, FileTextOutlined, HomeOutlined} from '@ant-design/icons';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option;

export default class index extends React.Component {
  state = {
    list: [],
    isShowOpenCity: false
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList();
  }
  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/user/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list: list,
        pagination: Utils.pagination(list, (current) => {
          _this.params.page = current;
          // _this.requestList();
        })
      })
    })
  }
  handleShowDetail = () => {
    const fieldValue = this.refs.formsearch.getFieldsValue();
    let chooseDetail, chooseDetail2, chooseDetail3, chooseDetail4, chooseDetail5, chooseDetail6 = false;
    console.log(fieldValue)
    let _this = this;
    axios.ajax({
      url: '/user/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      let list = res.result.item_list.map((item, index) => {
        item.key = index;
        console.log(item.balance, this.state.balanceValue1, this.state.balanceValue2);
        fieldValue.name == item.name || !fieldValue.name ? chooseDetail = true : chooseDetail = false;
        fieldValue.realName == item.realName || !fieldValue.realName ? chooseDetail2 = true : chooseDetail2 = false
        fieldValue.phoneNumber == item.phoneNumber || !fieldValue.phoneNumber ? chooseDetail3 = true : chooseDetail3 = false
        fieldValue.studentNumber == item.studentNumber || !fieldValue.studentNumber ? chooseDetail4 = true : chooseDetail4 = false
        fieldValue.major == item.major || !fieldValue.major ? chooseDetail5 = true : chooseDetail5 = false
        if ((item.balance >= this.state.balanceValue1 && item.balance <= this.state.balanceValue2) || (!this.state.balanceValue2 && item.balance >= this.state.balanceValue1) || (!this.state.balanceValue1 && !this.state.balanceValue2)){
          chooseDetail6 = true
        }else{
          chooseDetail6 = false
        }
        console.log(chooseDetail6);
        return chooseDetail && chooseDetail2 && chooseDetail3 && chooseDetail4 && chooseDetail5 && chooseDetail6? item : null
      }).filter(v => v);
      this.setState({
        list: list,
        pagination: Utils.pagination(list, (current) => {
          _this.params.page = current;
          // _this.handleShowDetail();
        })
      })
    })
  }
  balanceChange1(e) {
      this.setState({
        balanceValue1: Number(e.target.value)
      })
  }
  balanceChange2(e) {
      this.setState({
        balanceValue2: Number(e.target.value)
      })
  }
  render() {
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id'
      }, {
        title: '用户名',
        dataIndex: 'name'
      }, {
        title: '真实姓名',
        dataIndex: 'realName'
      }, {
        title: '学号',
        dataIndex: 'studentNumber'
      }, {
        title: '专业',
        dataIndex: 'major'
      }, {
        title: '手机号码',
        dataIndex: 'phoneNumber'
      }, {
        title: '余额',
        dataIndex: 'balance',
        sorter: (a, b) => a.balance - b.balance
      }, {
        title: '注册时间',
        dataIndex: 'registerTime'
      },{
        title: '用户权限',
        dataIndex: 'permission',
        fixed: 'right',
        render(permission) {
          return permission == 1 ? <Switch defaultChecked="true" /> : <Switch />;
        }
      }
    ]
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 17
      }
    }
    const formItemLayout2 = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19
      }
    }
    const { selectedRowKeys } = this.state;
    return (
      <div className="container">
        <Card style={{marginBottom:'10px'}}>
          <Form ref="formsearch">
            <Row>
              <Col span="6">
                <FormItem label="用户名" name="name"{...formItemLayout}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="真实姓名" name="realName"{...formItemLayout}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="手机号码" name="phoneNumber"{...formItemLayout}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="学号" name="studentNumber"{...formItemLayout}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="专业" name="major"{...formItemLayout}>
                  {
                    <Select
                      placeholder="全部"
                    >
                      <Option value="">全部</Option>
                      <Option value="电子信息工程">电子信息工程</Option>
                      <Option value="物联网工程">物联网工程</Option>
                      <Option value="通信工程">通信工程</Option>
                    </Select>
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="余额" name="balance"{...formItemLayout2}>
                  <Input.Group>
                    <Input 
                        style={{ width: 100, textAlign: 'center' }} 
                        onChange={this.balanceChange1.bind(this)} 
                    />
                    <Input
                        style={{
                          width: 40,
                          borderLeft: 0,
                          borderRight: 0,
                          pointerEvents: 'none'
                        }}
                        placeholder="至"
                        disabled
                    />
                    <Input
                        style={{
                          width: 100,
                          textAlign: 'center',
                        }}
                        onChange={this.balanceChange2.bind(this)} 

                    />
                  </Input.Group>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="注册时间" name="registerTime"{...formItemLayout2}>
                  {
                    <Input.Group compact>
                      <DatePicker.RangePicker />
                    </Input.Group>
                  }
                </FormItem>
              </Col>
            </Row>
            <Row justify="center"style={{marginTop:"6px"}}>
              <FormItem>
                <Button icon={<SearchOutlined />}type="primary" style={{ margin: '0 20px' }} onClick={this.handleShowDetail}>查询</Button>
                <Button icon={<RedoOutlined />} onClick={this.handleReset}>重置</Button>
              </FormItem>
            </Row>
          </Form>
        </Card>
        <Card className="btn_card">
              <Button icon={<AlignLeftOutlined />} type="primary" style={{ marginLeft:'15px' }}>详情</Button>
              <Button icon={<FileTextOutlined />} type="primary" style={{ marginLeft:'15px' }}>订单查询</Button>
              <Button icon={<HomeOutlined />} type="primary" style={{ marginLeft:'15px' }}>收货地址查询</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            rowSelection={{
              type: 'radio',
              selectedRowKeys
            }}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  let selectKey = [index];
                  this.setState({
                    selectedRowKeys: selectKey
                  })
                } // 点击行
              };
            }}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    )
  }
}
