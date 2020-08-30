import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Switch, Input, DatePicker, Row, Col,Radio } from 'antd';
import { SearchOutlined, RedoOutlined, AlignLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from './../../../axios/index';
import Utils from './../../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class BmCompleted extends React.Component {
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
        title: '订单号',
        dataIndex: 'orderId',
        fixed:'left'
      }, {
        title: '下单者',
        dataIndex: 'orderName'
      }, {
        title: '接单者',
        dataIndex: 'orderReceivingName'
      }, {
        title: '代拿物品',
        dataIndex: 'commodity'
      }, {
        title: '取货凭证',
        dataIndex: 'voucher'
      }, {
        title: '跑腿费(元)',
        dataIndex: 'expenses',
        sorter: (a, b) => a.expenses - b.expenses
      }, {
        title: '收货信息',
        children:[
          {
            title: '收货地址',
            dataIndex: 'deliveryPlace'
          }, {
            title: '联系人',
            dataIndex: 'contacts'
          }, {
            title: '联系人电话',
            dataIndex: 'contactsPhone'
          },
        ],
      },{
        title: '支付方式',
        dataIndex: 'paymentMethod'
      }, {
        title: '下单时间',
        dataIndex: 'orderTime'
      }, {
        title: '接单时间',
        dataIndex: 'orderReceivingTime'
      }, {
        title: '送达时间',
        dataIndex: 'receivingTime'
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
                <FormItem label="订单号" name="orderId"{...formItemLayout2}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="下单者" name="orderName"{...formItemLayout2}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="接单者" name="orderReceivingName"{...formItemLayout2}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="联系人" name="contacts"{...formItemLayout2}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="联系电话" name="contactsPhone"{...formItemLayout2}>
                  <Input allowClear />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="跑腿费" name="expenses"{...formItemLayout2}>
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
                <FormItem label="下单时间" name="orderTime"{...formItemLayout2}>
                  {
                    <Input.Group compact>
                      <DatePicker.RangePicker />
                    </Input.Group>
                  }
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="支付方式" name="paymentMethod"{...formItemLayout2}>
                  {
                    <Radio.Group value={1}>
                      <Radio value={1}>余额</Radio>
                      <Radio value={2}>支付宝</Radio>
                    </Radio.Group>
                  }
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
            size="small"
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
            scroll={{x:1700}}
          />
        </div>
      </div>
    )
  }
}
