import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Table } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import FeatherIcon from 'feather-icons-react';
import toast from 'react-hot-toast';
import { Main, BasicFormWrapper, TableWrapper } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import { createOrderAPI, getCurrencyListAPI } from '../../../config/api/orders';
import { getContactAPI } from '../../../config/api/company';
import { toastStyle } from '../../../utility/helper';
import { getTemplateListAPI, getTemplateDetailsAPI } from '../../../config/api/template';

const { Option } = Select;
// const { Dragger } = Upload;

function CreateOrder() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [templateDetails, setTemplateDetails] = useState();

  const columns = templateDetails?.map((detail, index) => {
    const title = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);
    let dataIndex = detail.name;
    let key = detail.type + dataIndex;
    if(index===0){
      dataIndex = "product_name"
      key = "product_name"
    }else if(index===1){
      dataIndex = "quantity"
      key = "quantity"
    }else if(index===2){
      dataIndex = "price"
      key = "price"
    }
    return {
      title,
      dataIndex,
      key,
    };
  });

  columns?.unshift({
    title: 'Serial No.',
    dataIndex: 'serial_num',
    key: 'serial_num',
  });

  // const handleSubmit = values => {
  //   setState({ ...state, submitValues: values });
  // };
  const generateFormData = (data) => {
    const formData = new FormData();
    console.log(typeof data.products[0].photo === 'object');
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item, index) => {
          if (typeof item === 'object') {
            Object.keys(item).forEach((subKey) => {
              const subItem = item[subKey];
              if (typeof subItem === 'object') {
                // Object.keys(subItem).forEach((subSubKey) => {
                //   const value = subItem[subSubKey];
                //   formData.append(`${key}[${index}][${subKey}][${subSubKey}]`, value);
                // });
                formData.append(`${key}[${index}][${subKey}]`, subItem);
              } else {
                formData.append(`${key}[${index}][${subKey}]`, subItem);
              }
            });
          } else {
            formData.append(`${key}[${index}]`, item);
          }
        });
      } else if (typeof data[key] === 'object') {
        Object.keys(data[key]).forEach((subKey) => {
          const value = data[key][subKey];
          formData.append(`${key}[${subKey}]`, value);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return formData;
  };

  const [createOrderJSONData, setCreateOrderJSONData] = useState({
    contact_id: '',
    status: '',
    invoice_number: '',
    order_number: '',
    date: new Date(new Date().getTime() + 330 * 60 * 1000).toISOString().split('T')[0],
    currency: '',
    products: [
    ],
  });

  const handleNormalFieldChange = (e) => {
    setCreateOrderJSONData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductFieldChange = (index, e) => {
    setCreateOrderJSONData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        serial_num: index + 1,
      };
      updatedProducts[index] = {
        ...updatedProducts[index],
        [e.target.name]: e.target.value,
      };

      return {
        ...prevData,
        products: updatedProducts,
      };
    });

  };

  const handleProductFieldPhotoChange = (index, e) => {
    setCreateOrderJSONData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        serial_num: index + 1,
      };
      updatedProducts[index] = {
        ...updatedProducts[index],
        [e.target.name]: e.target.files[0],
      };

      return {
        ...prevData,
        products: updatedProducts,
      };
    });
  };

  const handleSubmit = async (event) => {
    console.log(createOrderJSONData)
    event.preventDefault();

    const formData = generateFormData(createOrderJSONData);


    try {
      const token = localStorage.getItem('loginToken');
      const response = await createOrderAPI(formData, token);

      if (response.status === 201) {
        // Handle success
        console.log('Order created successfully');
        toast.success('Order Created Successfully 🥳', { ...toastStyle.success });
        const initialOrderData = {
          contact_id: '',
          status: '',
          invoice_number: '',
          order_number: '',
          date: new Date(new Date().getTime() + 330 * 60 * 1000).toISOString().split('T')[0],
          currency: '',
          // terms_and_conditions: "",
          // customer_notes: "",
          products: [
            {
              serial_num: '',
              product_name: '',
              price: '',
              quantity: '',
              status: '',
              photo: '',
              sqm: '',
              pricepersqm: '',
            },
          ],
        };

        setCreateOrderJSONData(initialOrderData);

        history.push('/admin/orders/list');
      } else {
        // Handle error
        console.error('Error creating order');
        toast.error('Something Bad happened', { ...toastStyle.error });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something Bad happened', { ...toastStyle.error });
    }
  };

  const createRow = (index) => {
    const row = {};
    columns?.forEach((column, idx) => {
      const { dataIndex, key } = column;

      if (dataIndex === 'serial_num') {
        row[dataIndex] = index + 1;
      } else if (key.substring(0, 5) === 'photo') {
        row[dataIndex] = (
          <Form.Item>
            <input
              name={dataIndex}
              onChange={(e) => handleProductFieldPhotoChange(index, e)}
              style={{ width: '200px' }}
              type="file"
            />
          </Form.Item>
        );
      } else if (idx === 1) {
        row[dataIndex] = (
          <Form.Item>
            <Input.TextArea rows={3} 
              name={dataIndex}
              onChange={(e) => handleProductFieldChange(index, e)}
              style={{ width: '400px'}} />
          </Form.Item>
        );
      } else {
        row[dataIndex] = (
          <Form.Item>
            <Input
              name={dataIndex}
              onChange={(e) => handleProductFieldChange(index, e)}
              style={{ width: '100px' }}
            />
          </Form.Item>
        );
      }
    });
    return row;
  };

  // Create the dataSource array by calling createRow function

  const dataSource = [createRow(0)]

  const [productRow, setProductRow] = useState([]);

  const addProductBtn = () => {
    const idx = productRow.length;

    const tdataSource = createRow(idx);
    const newRows = [...productRow, tdataSource];
    setProductRow(newRows);

  };

  const deleteProductBtn = () => {
    const newArray = productRow.slice(0, -1);
    const updatedProducts = [...createOrderJSONData.products];
    updatedProducts.pop();
    const updatedCreateOrderJSONData = {
      ...createOrderJSONData,
      products: updatedProducts,
    };

    setCreateOrderJSONData(updatedCreateOrderJSONData);

    setProductRow(newArray);
  };

  // const submitOrder = () => {
  //   console.log(createOrderJSONData,"log")
  // }

  const [customerDetail, setCustomerDetail] = useState([]);

  const [currencyList, setCurrencyList] = useState([]);

  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getContactAPI(token);
        console.log(response);
        setCustomerDetail(response.data);

        const response2 = await getCurrencyListAPI(token);
        console.log(response2);
        setCurrencyList(response2.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');

        const response = await getCurrencyListAPI(token);
        console.log(response);
        setCurrencyList(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');

        const response = await getTemplateListAPI(token);
        console.log(response);
        setTemplateList(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchTemplateDetails = async (id) => {
    try {
      console.log(productRow)
      const token = localStorage.getItem('loginToken');

      const response = await getTemplateDetailsAPI(id, token);
      console.log(response);
      setTemplateDetails(response.data.details);
      setProductRow([createRow[0]]);
      // setLoading(false);
    } catch (error) {
      console.log(error.message);
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (templateDetails !== null) {
      setProductRow(dataSource);
    }
  }, [templateDetails]); 

  return (
    <>
      <PageHeader ghost title="Create a new Order" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={36} md={36} sm={36} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="CreateOrder">
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Order Form">
                                  <Form.Item label="Customer Name/Detail">
                                    {/* <Input name="contact_id" onChange={handleNormalFieldChange}/> */}
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(e) => {
                                        setCreateOrderJSONData((prevData) => ({
                                          ...prevData,
                                          contact_id: e,
                                        }));
                                      }}
                                    >
                                      {customerDetail?.map((item, index) => (
                                        <Option value={item.id} key={index}>
                                          {item.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item label="Status">
                                    <Input name="status" onChange={handleNormalFieldChange} />
                                  </Form.Item>
                                  <Form.Item label="Invoice number">
                                    <Input name="invoice_number" onChange={handleNormalFieldChange} />
                                  </Form.Item>
                                  <Form.Item label="Order No">
                                    <Input name="order_number" onChange={handleNormalFieldChange} />
                                  </Form.Item>
                                  <Form.Item label="Date">
                                    <Input
                                      name="date"
                                      onChange={handleNormalFieldChange}
                                      defaultValue={
                                        new Date(new Date().getTime() + 330 * 60 * 1000).toISOString().split('T')[0]
                                      }
                                    />
                                  </Form.Item>
                                  <Form.Item label="Currency">
                                    {/* <Input name="currency" onChange={handleNormalFieldChange}/> */}
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(e) => {
                                        setCreateOrderJSONData((prevData) => ({
                                          ...prevData,
                                          currency: e,
                                        }));
                                      }}
                                    >
                                      {currencyList?.map((item, index) => (
                                        <Option value={item.id} key={index}>
                                          {item.currency}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>

                                  {/* <Form.Item name="price" initialValue="120" label="Price">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>

                                  <Form.Item name="discount" initialValue="20%" label="Discount">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="percent" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item> */}

                                  {/* <Form.Item name="status" initialValue="published" label="Status">
                                    <Radio.Group>
                                      <Radio value="published">Published</Radio>
                                      <Radio value="draft">Draft</Radio>
                                    </Radio.Group>
                                  </Form.Item> */}

                                  {/* <Form.Item
                                    name="description"
                                    initialValue="lorem ipsum dolor sit amit"
                                    label="Product Description"
                                  >
                                    <Input.TextArea rows={5} />
                                  </Form.Item> */}
                                </Cards>
                              </div>

                              <div className="add-product-content" style={{ marginTop: '2rem' }}>
                                <Cards title="Template Details">
                                  <Form.Item label="Choose Template">
                                    {/* <Input name="contact_id" onChange={handleNormalFieldChange}/> */}
                                    <Select
                                      style={{ width: '100%' }}
                                      onChange={(e) => {
                                        fetchTemplateDetails(e);
                                        setCreateOrderJSONData((prevData) => ({
                                          ...prevData,
                                          user_template_id: e,
                                        }));
                                      }}
                                    >
                                      {templateList?.map((item, index) => (
                                        <Option value={item.id} key={index}>
                                          {item.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Cards>
                              </div>
                              {templateDetails ? (
                                <div className="add-product-content" style={{ marginTop: '2rem' }}>
                                  <Cards title="Product Detail">
                                    <Row gutter={15}>
                                      <Col md={24}>
                                        <TableWrapper className="table-order table-responsive">
                                          <Table dataSource={productRow} columns={columns} />
                                        </TableWrapper>
                                      </Col>
                                    </Row>
                                    <Button
                                      size="small"
                                      htmlType="submit"
                                      type="primary"
                                      raised
                                      onClick={addProductBtn}
                                    >
                                      Add Another Product
                                    </Button>
                                    {productRow.length >= 2 ? (
                                      <Button
                                        size="small"
                                        htmlType="submit"
                                        type="secondary"
                                        raised
                                        onClick={deleteProductBtn}
                                        style={{ marginLeft: '2rem' }}
                                      >
                                        Delete
                                      </Button>
                                    ) : null}
                                  </Cards>
                                </div>
                              ) : null}
                              {/* <div className="add-product-content" style={{marginTop:"2rem"}}>
                                <Cards title="">
                                  <Form.Item
                                    label="Terms and Conditions"
                                  >
                                    <Input.TextArea rows={5} name="terms_and_conditions" onChange={handleNormalFieldChange}/>
                                  </Form.Item>
                                  <Form.Item
                                    label="Remarks"
                                  >
                                    <Input.TextArea rows={5} name="customer_notes" onChange={handleNormalFieldChange}/>
                                  </Form.Item>
                                </Cards>
                              </div> */}
                            </Col>
                          </Row>
                        </div>
                        {/* <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Product Image">
                                  <Dragger {...fileUploadProps}>
                                    <p className="ant-upload-drag-icon">
                                      <FeatherIcon icon="upload" size={50} />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">or Browse to choose a file</p>
                                  </Dragger>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div> */}
                        <div className="add-form-action">
                          <Form.Item>
                            {/* <Button
                              className="btn-cancel"
                              size="large"
                              onClick={()=>{
                                history.push('/admin/ecommerce/invoice')
                              }}
                            >
                              Generate Proforma
                            </Button> */}
                            <Button size="large" htmlType="submit" type="primary" raised onClick={handleSubmit}>
                              Save Order
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default CreateOrder;
