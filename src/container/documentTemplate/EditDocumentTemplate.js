import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom'
// import toast from 'react-hot-toast';
import { AddProductForm } from './Style';
import { Main, BasicFormWrapper } from '../styled';
import { Checkbox } from '../../components/checkbox/checkbox';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { Button } from '../../components/buttons/buttons';
import { getTemplateListAPI, getTemplateDetailsAPI, getDocumentTemplateDetailsByIdAPI } from '../../config/api/template';
// import { toastStyle } from '../../utility/helper';

const { Option } = Select;

function EditDocumentTemplate() {
  const [form] = Form.useForm();
  // const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('template_id');

  const [templateDetails, setTemplateDetails] = useState();
  const [templateList, setTemplateList] = useState([]);

  const checkboxNames = ['Company Address', 'Date', 'Order Number', 'Invoice Number', 'Consignee Detail', 'Bank Details', 'IEC_number', 'Customer Notes', "Terms and Condition"];

  const [createOrderJSONData, setCreateOrderJSONData] = useState({
    name: '',
    type: '',
    details: {
      general_details: checkboxNames,
      product_details: []
    },
  });

  const handleNormalFieldChange = (e) => {
    setCreateOrderJSONData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(createOrderJSONData);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const token = localStorage.getItem('loginToken');
  //     const response = await createDocumentTemplateAPI(createOrderJSONData, token);

  //     console.log(response);
  //     if (response.status === 201) {
  //       // Handle success
  //       toast.success('Templated Added Successfully 🥳', { ...toastStyle.success });
        
  //       history.push('/admin/document-template/list');
  //     } else {
  //       // Handle error
  //       console.error('Error creating order');
  //       toast.error('Something Bad happened', { ...toastStyle.error });
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toast.error('Something Bad happened', { ...toastStyle.error });
  //   }
  // };


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
      const token = localStorage.getItem('loginToken');

      const response = await getTemplateDetailsAPI(id, token);
      console.log(response);
      setTemplateDetails(response.data.details);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChangeGeneral = (name) => {
    setCreateOrderJSONData((prevData) => {
      const isChecked = prevData.details.general_details.includes(name);
  
      const updatedGeneralDetails = isChecked
        ? prevData.details.general_details.filter((item) => item !== name)
        : [...prevData.details.general_details, name];
  
      return {
        ...prevData,
        details: {
          ...prevData.details,
          general_details: updatedGeneralDetails,
        },
      };
    });
    console.log(createOrderJSONData)
  };

  const handleCheckboxChangeProduct = (name, index) => {
    console.log(index)
    setCreateOrderJSONData((prevData) => {
      const isChecked = prevData.details.product_details.includes(name);
  
      let updatedGeneralDetails;
  
      if (index === 1) {
        // If index is 1, insert "price" into product_details
        updatedGeneralDetails = isChecked
          ? prevData.details.product_details.includes("quantity")
            ? prevData.details.product_details.filter((item) => item !== name)
            : [...prevData.details.product_details, "quantity"]
        : [...prevData.details.product_details, "quantity"]
      } else if (index === 2) {
        // If index is 1, insert "price" into product_details
        updatedGeneralDetails = isChecked
          ? prevData.details.product_details.includes("price")
            ? prevData.details.product_details.filter((item) => item !== name)
            : [...prevData.details.product_details, "price"]
        : [...prevData.details.product_details, "price"]
      } else {
        // If index is not 1, update product_details normally
        updatedGeneralDetails = isChecked
          ? prevData.details.product_details.filter((item) => item !== name)
          : [...prevData.details.product_details, name];
      }
  
      return {
        ...prevData,
        details: {
          ...prevData.details,
          product_details: updatedGeneralDetails,
        },
      };
    });
    console.log(createOrderJSONData);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getDocumentTemplateDetailsByIdAPI(id, token);
        console.log(response);
        setCreateOrderJSONData(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (createOrderJSONData && createOrderJSONData.user_template_id) {
      fetchTemplateDetails(createOrderJSONData.user_template_id);
    }
  }, [createOrderJSONData]);


  



  return (
    <>
      <PageHeader ghost title="View your Document Template" />
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
                                <Cards title="Template Form">
                                  <Form.Item label="Template Name">
                                    <Input name="name" value={createOrderJSONData?.name} onChange={handleNormalFieldChange} />
                                  </Form.Item>
                                  <Form.Item label="Document Type">
                                    <Input name="name" value={createOrderJSONData?.type} onChange={handleNormalFieldChange} />
                                  </Form.Item>

                                  <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                      {/* <div>
                                          <Checkbox>Company Name Address</Checkbox>
                                        </div> */}
                                      {checkboxNames.map((name) => (
                                        <div>
                                          <Checkbox
                                            key={name}
                                            type="checkbox"
                                            value={name}
                                            checked={createOrderJSONData.details.general_details.includes(name)}
                                            onChange={() => handleCheckboxChangeGeneral(name)}
                                          >
                                            {name}
                                          </Checkbox>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-product-content" style={{ marginTop: '2rem' }}>
                          <Cards title="Template Details">
                            <Form.Item label="Choose Template">
                              <Select
                                style={{ width: '100%' }}
                                // onChange={(e) => {
                                //   fetchTemplateDetails(e);
                                // }}
                                value={templateList.length > 0 && templateList.find(obj => obj.id === createOrderJSONData?.user_template_id)?.name}
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
                          <div className="add-product-content">
                            <Cards title="">
                              <Form.Item label="Choose Fields">
                                {templateDetails.map((elem, index) => (
                                  <div>
                                    <Checkbox
                                      key={index}
                                      type="checkbox"
                                      value={elem.name}
                                      checked={createOrderJSONData.details.product_details ? (index === 1 && createOrderJSONData.details.product_details.includes("quantity")) ||
                                      (index === 2 && createOrderJSONData.details.product_details.includes("price")) ||
                                      createOrderJSONData.details.product_details.includes(elem.name)
                                    : false}
                                      onChange={() => handleCheckboxChangeProduct(elem.name, index)}
                                    >
                                      {elem.name}
                                    </Checkbox>
                                </div>
                                ))}
                              </Form.Item>
                            </Cards>
                          </div>
                        ) : null}
                        {/* <div className="add-form-action">
                          <Form.Item>
                            <Button size="large" htmlType="submit" type="primary" raised onClick={()=>console.log(createOrderJSONData)}>
                              Save Template
                            </Button>
                          </Form.Item>
                        </div> */}
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

export default EditDocumentTemplate;
