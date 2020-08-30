import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Switch, Input, DatePicker, Row, Col, Radio } from 'antd';
import { SearchOutlined, RedoOutlined, AlignLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Address extends React.Component {
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
      }, {
        title: '专业',
        dataIndex: 'major'
      }, {
        title: '收货信息',
        children: [
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
              <Col span="6">
                <FormItem label="联系人" name="contacts"{...formItemLayout}>
                  {
                    <Input allowClear />
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="联系电话" name="contactsPhone"{...formItemLayout}>
                  <Input allowClear />
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
