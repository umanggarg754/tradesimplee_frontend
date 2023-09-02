import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Table, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { useLocation } from 'react-router-dom';
import { InvoiceHeader, InvoiceLetterBox, InvoiceAction, ProductTable, OrderSummary } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
// import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { getProformaDetailsAPI } from '../../config/api/orders';

function Invoice() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const { rtl } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  let componentRef = useRef();

  const invoiceTableColumns = [
    {
      title: 'Sr. No.',
      dataIndex: 'row',
      key: 'row',
    },
    {
      title: 'Product Description',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Packing',
      dataIndex: 'packing',
      key: 'packing',
    },
    {
      title: 'Box',
      dataIndex: 'box',
      key: 'box',
    },
    {
      title: 'SQM',
      dataIndex: 'sqm',
      key: 'sqm',
    },
    {
      title: 'Price per SQM',
      dataIndex: 'pricepersqm',
      key: 'pricepersqm',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ];

  // const printInvoice = () => {
  //   window.print();
  // };

  const [proformaData, setProformaData] = useState();

  function generateInvoiceTableData(proformaData) {
    const productDetails = proformaData?.product_details;

    const invoiceTableData = productDetails?.map((product, index) => ({
      key: (index + 1).toString(),
      row: (index + 1).toString(),
      details: (
        <>
          <div className="product-info">
            <Heading className="product-info-title" as="h6">
              {product.product_name}
            </Heading>
            <ul className="info-list">
              <li>
                <span className="info-title">Type 2</span>
                <span>600 X 1200 MM EACH BOX 2 PCS & 1.44 SQ-M</span>
              </li>
              <br />
              <li>
                <span className="info-title"> Type 1</span>
                <span>60X1200 : 31 PALLET - 992 BOX - 32 BOX PER PALLET</span>
              </li>
            </ul>
          </div>
        </>
      ),
      packing: <span>{product.packing}</span>,
      box: <span>{product.box}</span>,
      sqm: <span>{product.sqm}</span>,
      pricepersqm: <span>{product.pricepersqm}</span>,
      totalAmount: <span>{parseFloat(product.sqm) * parseFloat(product.pricepersqm)}</span>,
    }));
    console.log(invoiceTableData);
    return invoiceTableData;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getProformaDetailsAPI(id, token);
        console.log(response);
        setProformaData(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [invoiceTableData, setInvoiceTableData] = useState([]);

  useEffect(() => {
    if (proformaData?.product_details) {
      const generatedTableData = generateInvoiceTableData(proformaData);
      setInvoiceTableData(generatedTableData);
    }
  }, [proformaData]);

  // const invoiceTableData = [
  //   {
  //     key: '1',
  //     row: '1',
  //     details: (
  //       <>
  //         <div className="product-info">
  //           <Heading className="product-info-title" as="h6">
  //             {proformaData.product_detail.product_name}
  //           </Heading>
  //           <ul className="info-list">
  //             <li>
  //               <span className="info-title">Type 2</span>
  //               <span>600 X 1200 MM EACH BOX 2 PCS & 1.44 SQ-M</span>
  //             </li>
  //             <br/>
  //             <li>
  //               <span className="info-title"> Type 1</span>
  //               <span>60X1200 : 31 PALLET - 992 BOX - 32 BOX PER PALLET</span>
  //             </li>
  //           </ul>
  //         </div>
  //       </>
  //     ),
  //     packing: <span>{proformaData?.product_detail.packing}</span>,
  //     box: <span>{proformaData?.product_detail.box}</span>,
  //     sqm: <span>{proformaData?.product_detail.sqm}</span>,
  //     pricepersqm: <span>{proformaData?.product_detail.pricepersqm}</span>,
  //     totalAmount: <span>{proformaData?.product_detail.sqm}*{proformaData?.product_detail.pricepersqm}</span>
  //   }
  // ];

  return (
    <div className="invoice-area">
      <PageHeader
        ghost
        title="Invoice"
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
      <Main ref={(el) => (componentRef = el)}>
        <Row gutter={15}>
          <Col md={24}>
            <Cards headless>
              <div className="invoice-content-wrap" id="print-invoice-content">
                <InvoiceHeader>
                  <Row>
                    <Col sm={12} xs={24}>
                      {/* <figure className="company-logo">
                        <img className="top-img" src={require('../../static/img/Logo_Dark.svg').default} alt="logo" />
                      </figure> */}
                      <Heading className="invoice-author__title" as="h1">
                        {proformaData?.company_details.name}
                      </Heading>
                      <p>
                        {proformaData?.company_details.address} <br />
                        {proformaData?.company_details.city}
                      </p>
                    </Col>
                    <Col sm={12} xs={24}>
                      <div>
                        <address className="invoice-info">
                          {/* Admin Company <br />
                          795 Folsom Ave, Suite 600 <br />
                          San Francisco, CA 94107, USA <br /> */}
                          Date: {proformaData?.order_details?.date} <br />
                          Order No.: {proformaData?.order_details?.order_number} <br />
                          Invoice No.: {proformaData?.order_details?.invoice_number} <br />
                          IEC No.: {proformaData?.company_details?.ic_number} <br />
                        </address>
                      </div>
                    </Col>
                  </Row>
                </InvoiceHeader>
                <InvoiceLetterBox>
                  <div className="invoice-letter-inner">
                    <address>
                      <Heading className="invoice-customer__title" as="h5">
                        Invoice To:
                      </Heading>
                      <p>
                        {proformaData?.contact_details?.name} <br />
                        {proformaData?.contact_details?.city} <br />
                        {proformaData?.contact_details?.country}
                      </p>
                    </address>
                    <div className="invoice-barcode">
                      <Cards headless>
                        {/* <img style={{ width: '100%' }} src={require('../../static/img/barcode.png')} alt="barcode" />
                        <p>8364297359912267</p> */}
                      </Cards>
                    </div>
                    <address>
                      <Heading className="invoice-customer__title" as="h5">
                        Bank Details:
                      </Heading>
                      <p>{proformaData?.company_details?.bank_details}</p>
                    </address>
                  </div>
                </InvoiceLetterBox>

                <br />
                <br />
                <ProductTable>
                  <div className="table-invoice table-responsive">
                    <Table dataSource={invoiceTableData} columns={invoiceTableColumns} pagination={false} />
                  </div>
                </ProductTable>

                <Row justify="end">
                  <Col xxl={4} xl={5} sm={8} xs={14} offset={rtl ? 0 : 10}>
                    <OrderSummary>
                      <div className="invoice-summary-inner">
                        {/* <ul className="summary-list">
                          <li>
                            <span className="summary-list-title">Subtotal :</span>
                            <span className="summary-list-text">{`$${497.32}`}</span>
                          </li>
                          <li>
                            <span className="summary-list-title">Discount :</span>
                            <span className="summary-list-text">{`$${-20}`}</span>
                          </li>
                          <li>
                            <span className="summary-list-title">Shipping Charge :</span>
                            <span className="summary-list-text">{`$${30}`}</span>
                          </li>
                        </ul> */}
                        <Heading className="summary-total" as="h4">
                          <span className="summary-total-label">Total : </span>
                          <span className="summary-total-amount">{proformaData?.total_amount}</span>
                        </Heading>
                        <Heading className="summary-total" as="h4">
                          <span className="summary-total-label">(in words) : </span>
                          <span className="summary-total-amount">{proformaData?.total_amount_in_words}</span>
                        </Heading>
                      </div>
                    </OrderSummary>
                  </Col>
                </Row>
                  <Cards title="Other Details">
                  <p>Terms and Conditions</p>
                  <Form.Item label="">
                    <Input.TextArea rows={5} name="terms_and_conditions" />
                  </Form.Item>
                  <p>Remarks</p>
                  <Form.Item label="">
                    <Input.TextArea rows={5} name="customer_notes" />
                  </Form.Item>
                </Cards>
                <Row justify="end">
                  <Col lg={12} md={18} sm={24} offset={0}>
                    <InvoiceAction>
                      {/* <Button size="medium" shape="round" type="default" onClick={() => printInvoice()}>
                        <FeatherIcon icon="printer" size={14} />
                        Print
                      </Button>
                      <Button size="medium" shape="round" type="default">
                        <FeatherIcon icon="send" size={14} />
                        Send Invoice
                      </Button> */}
                      {/* <Button size="medium" shape="round" type="primary" onClick={() => printInvoice()}>
                        <FeatherIcon icon="download" size={14} />
                        Download
                      </Button> */}
                      <ReactToPrint
                        trigger={() => (
                          <Button size="medium" shape="round" type="primary">
                            <FeatherIcon icon="download" size={14} />
                            Download
                          </Button>
                        )}
                        content={() => componentRef}
                      />
                    </InvoiceAction>
                  </Col>
                </Row>
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default Invoice;