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
import { getDocumentTemplateDetailsAPI } from '../../config/api/template';
import {config} from '../../config/api/index'

function Invoice() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('order_id');
  const templateId = queryParams.get('template_id');

  const { rtl } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  let componentRef = useRef();

  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceTableColumns, setInvoiceTableColumns] = useState([]);
  const [invoiceTableData, setInvoiceTableData] = useState([]);

  const generateInvoiceTableColumns = () => {
    console.log('gg', invoiceData);
    if (!invoiceData || !invoiceData?.products || invoiceData?.products.length === 0) {
      console.log('gg', invoiceData?.products);
      return;
    }
    console.log('yo');
    const firstProduct = invoiceData.products[0];
    const productKeys = Object.keys(firstProduct);

    const dynamicColumns = productKeys.map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      dataIndex: key,
      key,
    }));

    // Optionally, you can add or remove columns as needed
    // dynamicColumns.push({
    //   title: 'New Column',
    //   dataIndex: 'new_column',
    //   key: 'new_column',
    // });

    console.log(dynamicColumns);

    setInvoiceTableColumns(dynamicColumns);
  };

  const generateInvoiceTableData = (proformaData) => {
    if (!proformaData || !proformaData.products || proformaData.products.length === 0) {
      return [];
    }

    return proformaData.products.map((product, index) => {
      const formattedProduct = {};
      Object.keys(product).forEach((key) => {
        let value = product[key];
        // Check if the value is a UUID (assuming a simple regex pattern here)
        const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
        if (uuidPattern.test(value)) {
          value = (
            <img
              src={`${config.API_URL}/assets/${value}`}
              alt={value}
              style={{ width: '150px', height: '150px' }}
            />
          );
        }
        
        formattedProduct[key] = value;
        console.log(formattedProduct)
      });

      return {
        key: (index + 1).toString(),
        row: (index + 1).toString(),
        ...formattedProduct,
        // You can add more fields here if needed.
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getDocumentTemplateDetailsAPI(orderId, templateId, token);
        console.log(response);
        setInvoiceData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    generateInvoiceTableColumns();
    setInvoiceTableData(generateInvoiceTableData(invoiceData));
  }, [invoiceData]);

  return (
    <div className="invoice-area">
      <PageHeader ghost title="Invoice" />
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
                        {invoiceData?.company_name}
                      </Heading>
                      <p>
                        {invoiceData?.company_address} <br />
                        {/* {invoiceData?.company_details.city} */}
                      </p>
                    </Col>
                    <Col sm={12} xs={24}>
                      <div>
                        <address className="invoice-info">
                          {invoiceData?.date && <div>Date: {invoiceData.date}</div>}
                          {invoiceData?.order_number && <div>Order No.: {invoiceData.order_number}</div>}
                          {invoiceData?.invoice_number && <div>Invoice No.: {invoiceData.invoice_number}</div>}
                          {invoiceData?.IEC_number && <div>IEC No.: {invoiceData.IEC_number}</div>}
                        </address>
                      </div>
                    </Col>
                  </Row>
                </InvoiceHeader>
                {invoiceData?.consignee_details || invoiceData?.bank_details ? (
                  <InvoiceLetterBox>
                    <div className="invoice-letter-inner">
                      {invoiceData?.consignee_details?.name && (
                        <address>
                          <Heading className="invoice-customer__title" as="h5">
                            Invoice To:
                          </Heading>
                          <p>
                            {invoiceData?.consignee_details?.name} <br />
                            {invoiceData?.consignee_details?.company} <br />
                            {invoiceData?.contact_details?.city} <br />
                            {invoiceData?.contact_details?.country}
                          </p>
                        </address>
                      )}
                      <div className="invoice-barcode">
                        <Cards headless>
                          {/* <img style={{ width: '100%' }} src={require('../../static/img/barcode.png')} alt="barcode" />
                        <p>8364297359912267</p> */}
                        </Cards>
                      </div>
                      {invoiceData?.bank_details && (
                        <address>
                          <Heading className="invoice-customer__title" as="h5">
                            Bank Details:
                          </Heading>
                          <p>{invoiceData?.bank_details}</p>
                        </address>
                      )}
                    </div>
                  </InvoiceLetterBox>
                ) : null}

                <br />
                <br />
                <ProductTable>
                  <div className="table-invoice table-responsive">
                    <Table columns={invoiceTableColumns} dataSource={invoiceTableData} pagination={false} />
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
                          {invoiceData?.total_amount && <span className="summary-total-label">Total : </span>}
                          <span className="summary-total-amount">{invoiceData?.total_amount}</span>
                        </Heading>
                        <Heading as="h6">
                          {invoiceData?.total_amount_in_words && <span className="summary-total-label">(in words) : </span>}
                          <span>{invoiceData?.total_amount_in_words}</span>
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
