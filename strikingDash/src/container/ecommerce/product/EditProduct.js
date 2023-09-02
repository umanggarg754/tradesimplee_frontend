import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Table } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import FeatherIcon from 'feather-icons-react';
import toast from 'react-hot-toast';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import { createOrderAPI, getCurrencyListAPI } from '../../../config/api/orders';
import { getContactAPI } from '../../../config/api/company';
import { toastStyle } from '../../../utility/helper';
// import Heading from '../../../components/heading/heading';
// import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
// import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';

const { Option } = Select;
// const { Dragger } = Upload;

function EditProduct() {
  const [form] = Form.useForm();
  const history = useHistory();
  // const [state, setState] = useState({
  //   file: null,
  //   list: null,
  //   submitValues: {},
  // });

  // const fileList = [
  //   {
  //     uid: '1',
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: require('../../../static/img/products/1.png'),
  //     thumbUrl: require('../../../static/img/products/1.png'),
  //   },
  // ];

  // const fileUploadProps = {
  //   name: 'file',
  //   multiple: false,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       // setState({ ...state, file: info.file, list: info.fileList });
  //       console.log(info.file)
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   listType: 'picture',
  //   defaultFileList: fileList,
  //   showUploadList: {
  //     showRemoveIcon: true,
  //     removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
  //   },
  // };

  const columns = [
    {
      title: 'Serial No',
      dataIndex: 'serialno',
      key: 'serialno',
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Packing',
      dataIndex: 'packing',
      key: 'packing',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
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
      title: 'Box',
      dataIndex: 'box',
      key: 'box',
    },
    {
      title: 'Marks & No.',
      dataIndex: 'marksandnums',
      key: 'marksandnums',
    },
    {
      title: 'Container',
      dataIndex: 'container',
      key: 'container',
    },
    {
      title: 'Design Photo',
      dataIndex: 'photo',
      key: 'photo',
    },
    {
      title: 'Pallets',
      dataIndex: 'pallets',
      key: 'pallets',
    },
    {
      title: 'Pcs Per Box',
      dataIndex: 'pcsperbox',
      key: 'pcsperbox',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Gross Weight',
      dataIndex: 'grossweight',
      key: 'grossweight',
    },
    {
      title: 'Total Amount',
      dataIndex: 'price',
      key: 'price',
    }
  ];

  

  // const handleSubmit = values => {
  //   setState({ ...state, submitValues: values });
  // };
const generateFormData = (data) => {
  const formData = new FormData();
  console.log(typeof data.products[0].photo === "object")
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        if (typeof item === "object") {
          Object.keys(item).forEach((subKey) => {
            const subItem = item[subKey];
            if (typeof subItem === "object") {
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
    } else if (typeof data[key] === "object") {
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
    contact_id: "",
    status : "",
    invoice_number : "",
    order_number : "",
    date : new Date(new Date().getTime() + 330 * 60 * 1000).toISOString().split('T')[0],
    currency : "",
    // terms_and_conditions : "",
    // customer_notes : "",
    products : [{
      serial_num:"",
      product_name:"",
      price:"",
      quantity: "",
      stauts:"",
      photo:"",
      sqm : "",
      pricepersqm : ""
    }]
  })

  const handleNormalFieldChange = (e) => {
    setCreateOrderJSONData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
    console.log(createOrderJSONData)
  };
  

  const handleProductFieldChange = (index, e) => {
    setCreateOrderJSONData(prevData => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        "serial_num": index+1
      };
      updatedProducts[index] = {
        ...updatedProducts[index],
        [e.target.name]: e.target.value
      };
  
      return {
        ...prevData,
        products: updatedProducts
      };
    });

    console.log(createOrderJSONData)
  };

  const handleProductFieldPhotoChange = (index, e) => {
    setCreateOrderJSONData(prevData => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        "serial_num": index+1
      };
      updatedProducts[index] = {
        ...updatedProducts[index],
        [e.target.name]: e.target.files[0]
      };
  
      return {
        ...prevData,
        products: updatedProducts
      };
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = generateFormData(createOrderJSONData)

    console.log(formData)
    console.log(createOrderJSONData)

    try {
      const token = localStorage.getItem("loginToken")
      const response = await createOrderAPI(formData, token);


      console.log(response)
      if (response.status===201) {
        // Handle success
        console.log('Order created successfully');
        toast.success('Order Created Successfully 🥳',{...toastStyle.success})
        const initialOrderData = {
          contact_id: "",
          status: "",
          invoice_number: "",
          order_number: "",
          date: new Date(new Date().getTime() + 330 * 60 * 1000).toISOString().split('T')[0],
          currency: "",
          // terms_and_conditions: "",
          // customer_notes: "",
          products: [{
            serial_num: "",
            product_name: "",
            price: "",
            quantity: "",
            status: "",
            photo: "",
            sqm : "",
            pricepersqm : ""
          }]
        }
      
          setCreateOrderJSONData(initialOrderData);

          history.push('/admin/ecommerce/orders')

      } else {
        // Handle error
        console.error('Error creating order');
        toast.error('Something Bad happened',{...toastStyle.error})
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something Bad happened',{...toastStyle.error})
    }
  };
  


  const dataSource = [
    {
      serialno : (
        <Form.Item>
          {/* <Input name="serialno"/> */}
          <p>1</p>
        </Form.Item>
      ),
      product_name : (
        <Form.Item>
          <Input name="product_name" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '400px' }}/>
        </Form.Item>
      ),
      packing : (
        <Form.Item>
          <Input name="packing" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      quantity : (
        <Form.Item>
          <Input name="quantity" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      sqm : (
        <Form.Item>
          <Input name="sqm" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      pricepersqm : (
        <Form.Item>
          <Input name="pricepersqm" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      box : (
        <Form.Item>
          <Input name="box" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      marksandnums : (
        <Form.Item>
          <Input name="marksandnums" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      container : (
        <Form.Item>
          <Input name="container" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      photo : (
        <Form.Item>
          <input type="file" name="photo" onChange={(e)=>handleProductFieldPhotoChange(0, e)} style={{ width: '200px' }}/>
        </Form.Item>
      ),
      pallets : (
        <Form.Item>
          <Input name="pallets" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      pcsperbox : (
        <Form.Item>
          <Input name="pcsperbox" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      brand : (
        <Form.Item>
          <Input name="brand" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      grossweight : (
        <Form.Item>
          <Input name="grossweight" onChange={(e)=>handleProductFieldChange(0, e)} style={{ width: '100px' }}/>
        </Form.Item>
      ),
      price : (
        <Form.Item>
          <Input name="price" onChange={(e)=>handleProductFieldChange(0, e)}/>
          {/* <p>{createOrderJSONData.products[0].pricepersqm && createOrderJSONData.products[0].sqm ? parseInt(createOrderJSONData.sqm)*parseInt(createOrderJSONData.pricepersqm) : "NA"}</p> */}
        </Form.Item>
      )
    }
  ]


  const [productRow, setProductRow] = useState(dataSource);
  

  const addProductBtn = () =>{

    const idx=productRow.length+1;
    const tempDataSource = {
      serialno : (
        <Form.Item>
          {/* <Input name={`serialno-${idx}`} defaultValue={idx} /> */}
          <p>{idx}</p>
        </Form.Item>
      ),
      product_name : (
        <Form.Item>
          <Input name="product_name" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      packing : (
        <Form.Item>
          <Input name="packing" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      quantity : (
        <Form.Item>
          <Input name="quantity" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      sqm : (
        <Form.Item>
          <Input name="sqm" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      pricepersqm : (
        <Form.Item>
          <Input name="pricepersqm" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      box : (
        <Form.Item>
          <Input name="box" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      marksandnums : (
        <Form.Item>
          <Input name="marksandnums" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      container : (
        <Form.Item>
          <Input name="container" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      photo : (
        <Form.Item>
          <input type="file" name="photo" onChange={(e)=>handleProductFieldPhotoChange(idx-1, e)}/>
        </Form.Item>
      ),
      pallets : (
        <Form.Item>
          <Input name="pallets" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      pcsperbox : (
        <Form.Item>
          <Input name="pcsperbox" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      brand : (
        <Form.Item>
          <Input name="brand" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      grossweight : (
        <Form.Item>
          <Input name="grossweight" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      ),
      price : (
        <Form.Item>
          <Input name="price" onChange={(e)=>handleProductFieldChange(idx-1, e)}/>
        </Form.Item>
      )
    }
    const newRows = [...productRow, tempDataSource];
    setProductRow(newRows);


    const newProduct = {
      serial_num:"",
      product_name:"",
      price:"",
      quantity: "",
      stauts:"",
      photo:"",
      other_details:{
        packing:"",
        box:"",
        marksandnums:"",
        sqm : "",
        pricepersqm : "",
        container : "",
        pallets : "",
        pcsperbox : "",
        brand : "",
        grossweight : "",
        price: ""
      }
    };
    const updatedCreateOrderJSONData = { ...createOrderJSONData };
    updatedCreateOrderJSONData.products.push(newProduct);
    setCreateOrderJSONData(updatedCreateOrderJSONData);
  }

  const deleteProductBtn = () =>{
    const newArray = productRow.slice(0, -1);
    const updatedProducts = [...createOrderJSONData.products];
    updatedProducts.pop();
    const updatedCreateOrderJSONData = {
      ...createOrderJSONData,
      products: updatedProducts
    };
  
    setCreateOrderJSONData(updatedCreateOrderJSONData);

    setProductRow(newArray);
  }


  // const submitOrder = () => {
  //   console.log(createOrderJSONData,"log")
  // }

  const [customerDetail, setCustomerDetail] = useState([])

  const [currencyList, setCurrencyList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getContactAPI(token);
        console.log(response);
        setCustomerDetail(response.data)

        const response2 = await getCurrencyListAPI(token);
        console.log(response2);
        setCurrencyList(response2.data)
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
        setCurrencyList(response.data)
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  


  return (
    <>
      <PageHeader
        ghost
        title="Create a new Order"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={36} md={36} sm={36} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="editProduct">
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Order Form">
                                  <Form.Item label="Customer Name/Detail">
                                    {/* <Input name="contact_id" onChange={handleNormalFieldChange}/> */}
                                    <Select style={{ width: '100%' }} onChange={(e)=>{
                                      setCreateOrderJSONData(prevData => ({
                                        ...prevData,
                                        contact_id: e
                                      }));
                                    }}>
                                      {customerDetail?.map((item,index)=>(
                                        <Option value={item.id} key={index}>{item.name}</Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item label="Status">
                                    <Input name="status" onChange={handleNormalFieldChange}/>
                                  </Form.Item>
                                  <Form.Item label="Invoice number">
                                    <Input name="invoice_number" onChange={handleNormalFieldChange}/>
                                  </Form.Item>
                                  <Form.Item label="Order No">
                                    <Input name="order_number" onChange={handleNormalFieldChange}/>
                                  </Form.Item>
                                  <Form.Item label="Date">
                                    <Input name="date" onChange={handleNormalFieldChange} defaultValue={new Date(new Date().getTime() + 330 * 60 * 1000).toISOString().split('T')[0]}/>
                                  </Form.Item>
                                  <Form.Item label="Currency">
                                    {/* <Input name="currency" onChange={handleNormalFieldChange}/> */}
                                    <Select style={{ width: '100%' }} onChange={(e)=>{
                                      setCreateOrderJSONData(prevData => ({
                                        ...prevData,
                                        currency: e
                                      }));
                                    }}>
                                      {currencyList?.map((item,index)=>(
                                        <Option value={item.id} key={index}>{item.currency}</Option>
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
                              <div className="add-product-content" style={{marginTop:"2rem"}}>
                                <Cards title="Product Detail">
                                <Row gutter={15}>
                                  <Col md={24}>
                                    <TableWrapper className="table-order table-responsive">
                                      <Table
                                        dataSource={productRow}
                                        columns={columns}
                                      />
                                    </TableWrapper>
                                  </Col>
                                </Row>
                                <Button size="small" htmlType="submit" type="primary" raised onClick={addProductBtn}>
                                      Add Another Product
                                    </Button>
                                    {productRow.length>=2?(
                                      <Button size="small" htmlType="submit" type="secondary" raised onClick={deleteProductBtn} style={{marginLeft:"2rem"}}>Delete
                                      </Button>
                                    ):null}
                                </Cards>
                              </div>
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

export default EditProduct;
