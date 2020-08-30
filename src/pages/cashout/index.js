import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Switch, Input, DatePicker, Row, Col, Radio } from 'antd';
import { SearchOutlined, RedoOutlined, AlignLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Cashout extends React.Component {
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
      },{
        title: '提现金额',
        dataIndex: 'cashoutAmount',
        sorter: (a, b) => a.cashoutAmount - b.cashoutAmount
      }, {
        title: '剩余金额',
        dataIndex: 'remainingAmount',
        sorter: (a, b) => a.remainingAmount - b.remainingAmount
      }, {
        title: '提现状态',
        dataIndex:'cashoutStatus'
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
        <Card style={{ marginBottom: '10px' }}>
          <Form ref="formsearch">
            <Row>
              <Col span="8">
                <FormItem label="用户名" name="name"{...formItemLayout2}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="真实姓名" name="realName"{...formItemLayout2}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="提现金额" name="cashoutAmount"{...formItemLayout2}>
                  {
                    <Input.Group>
                      <Input
                        style={{ width: 100, textAlign: 'center' }}
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
                      />
                    </Input.Group>
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="剩余金额" name="remainingAmount"{...formItemLayout2}>
                  {
                    <Input.Group>
                      <Input
                        style={{ width: 100, textAlign: 'center' }}
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
                      />
                    </Input.Group>
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="提现状态" name="cashoutStatus"{...formItemLayout2}>
                  <Radio.Group value={1}>
                    <Radio value={1}>提现成功</Radio>
                    <Radio value={2}>正在提现</Radio>
                    <Radio value={2}>提现失败</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "6px" }}>
              <FormItem>
                <Button icon={<SearchOutlined />} type="primary" style={{ margin: '0 20px' }}>查询</Button>
                <Button icon={<RedoOutlined />} onClick={this.handleReset}>重置</Button>
              </FormItem>
            </Row>
          </Form>
        </Card>
        <Card className="btn_card">
          <Button icon={<AlignLeftOutlined />} type="primary" style={{ marginLeft: '15px' }}>详情</Button>
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
