import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Row, Col, Table, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
// import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { orderFilter } from '../../redux/orders/actionCreator';

// import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { getOrderListAPI } from '../../config/api/orders';
import { getDocumentTemplateListAPI } from '../../config/api/template';

const { Option } = Select;

function Orders() {
  const history = useHistory();
  // const dispatch = useDispatch();
  //   const { searchData, orders } = useSelector(state => {
  //     return {
  //       searchData: state.headerSearchData,
  //       orders: state.orders.data,
  //     };
  //   });

  //   const [state, setState] = useState({
  //     notData: searchData,
  //     item: orders,
  //     selectedRowKeys: [],
  //   });

  //   const { notData, selectedRowKeys } = state;
  // const filterKey = ['Shipped', 'Awaiting Shipment', 'Canceled'];

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getOrderListAPI(token);
        console.log(response);
        setOrderList(response?.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     if (orders) {
  //       setState({
  //         item: orders,
  //         selectedRowKeys,
  //       });
  //     }
  //   }, [orders, selectedRowKeys]);

  //   const handleSearch = searchText => {
  //     const data = searchData.filter(value => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
  //     setState({
  //       ...state,
  //       notData: data,
  //     });
  //   };

  // const handleChangeForFilter = e => {
  //   dispatch(orderFilter('status', e.target.value));
  // };

  const [docTemplateList, setDocTemplateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getDocumentTemplateListAPI(token);
        console.log(response);
        setDocTemplateList(response?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const dataSource = [];
  if (orderList?.length) {
    orderList.map((value, key) => {
      const { status, amount, date } = value;
      return dataSource.push({
        key: key + 1,
        id: <span className="order-id">{value.order_number}</span>,
        customer: <span className="customer-name">{value.contact_name}</span>,
        status: (
          <span
            className={`status ${
              status === 'Shipped' ? 'Success' : status === 'Awaiting Shipment' ? 'warning' : 'error'
            }`}
          >
            {status}
          </span>
        ),
        amount: <span className="ordered-amount">{amount}</span>,
        date: <span className="ordered-date">{date}</span>,
        action: (
          <div className="table-actions">
            <>
              <Button
                className="btn-icon"
                type="primary"
                shape="circle"
                onClick={() => history.push(`/admin/ecommerce/edit-order?id=${value.id}`)}
              >
                <FeatherIcon icon="eye" size={16} />
              </Button>
              <Select
                value="Document" // Set the default value if needed
                onChange={(val) => {
                  const selectedItemId = val; // This is the selected value
                  console.log('yo');
                  history.push(`/admin/orders/invoice?order_id=${value.id}&template_id=${selectedItemId}`);
                }}
              >
                {docTemplateList?.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>

              {/* <Button
                className="btn-icon"
                type="info"
                to="#"
                shape="circle"
                onClick={() => history.push(`/admin/orders/invoice?id=${value.id}`)}
              >
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button
                className="btn-icon"
                type="danger"
                to="#"
                shape="circle"
                onClick={() => history.push(`/admin/orders/design-list?id=${value.id}`)}
              >
                <FeatherIcon icon="list" size={16} />
              </Button> */}
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Order No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  // const onSelectChange = selectedRowKey => {
  //   setState({ ...state, selectedRowKeys: selectedRowKey });
  // };

  // const rowSelection = {
  //   onChange: (srk) => {
  //     onSelectChange(srk);
  //   },
  // };

  return (
    <>
      <PageHeader
        ghost
        title="Orders"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <CalendarButtonPageHeader key="1" />
        //     <ExportButtonPageHeader key="2" />
        //     <ShareButtonPageHeader key="3" />
        //     <Button size="small" key="4" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                  {/* <Col lg={6} xs={24}>
                    <div className="table-search-box">
                      <AutoComplete onSearch={handleSearch} dataSource={notData} width="100%" patterns />
                    </div>
                  </Col> */}
                  {/* <Col xxl={14} lg={16} xs={24}>
                    <div className="table-toolbox-menu">
                      <span className="toolbox-menu-title"> Status:</span>
                      <Radio.Group onChange={handleChangeForFilter} defaultValue="">
                        <Radio.Button value="">All</Radio.Button>
                        {item.length &&
                          [...new Set(filterKey)].map(value => {
                            return (
                              <Radio.Button key={value} value={value}>
                                {value}
                              </Radio.Button>
                            );
                          })}
                      </Radio.Group>
                    </div>
                  </Col> */}
                  {/* <Col xxl={4} xs={24}>
                    <div className="table-toolbox-actions">
                      <Button size="small" type="secondary" transparented>
                        Export
                      </Button>
                      <Button size="small" type="primary">
                        <FeatherIcon icon="plus" size={12} /> Add Order
                      </Button>
                    </div>
                  </Col> */}
                </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  // rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 10, showSizeChanger: true, total: orderList?.length }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default Orders;
