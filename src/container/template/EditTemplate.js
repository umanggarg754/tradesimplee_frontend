import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { AddProductForm } from './Style';
import { Main, BasicFormWrapper } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { Button } from '../../components/buttons/buttons';
// import { toastStyle } from '../../utility/helper';
import { getTemplateDetailsAPI } from '../../config/api/template';

const { Option } = Select;

function EditTemplate() {
  const [form] = Form.useForm();
  // const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  // const [fieldRow, setFieldRow] = useState(0);

  const [createOrderJSONData, setCreateOrderJSONData] = useState();

  const handleNormalFieldChange = (e) => {
    setCreateOrderJSONData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(createOrderJSONData);
  };

  const handleDetailsChange = (index, field, value) => {
    setCreateOrderJSONData((prevData) => {
      const newDetails = [...prevData.details];
      newDetails[index] = {
        ...newDetails[index],
        [field]: value,
      };
      return {
        ...prevData,
        details: newDetails,
      };
    });
  };

  const handleNameChange = (index, e) => {
    handleDetailsChange(index, 'name', e.target.value);
  };

  const handleTypeChange = (index, e) => {
    console.log(e);
    handleDetailsChange(index, 'type', e);
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const token = localStorage.getItem('loginToken');
  //       const response = await createTemplateAPI(createOrderJSONData, token);

  //       console.log(response);
  //       if (response.status === 201) {
  //         // Handle success
  //         toast.success('Templated Added Successfully 🥳', { ...toastStyle.success });
  //         const initialOrderData = {
  //           name: "",
  //           details: [
  //             {"name":"Product Description","type":"TEXT"},
  //             {"name":"Quantity","type":"NUMBER"},
  //             {"name":"Price per Product","type":"NUMBER"} ,
  //           ],
  //         };

  //         setCreateOrderJSONData(initialOrderData);

  //         history.push('/admin/template/list');
  //       } else {
  //         // Handle error
  //         console.error('Error creating order');
  //         toast.error('Something Bad happened', { ...toastStyle.error });
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       toast.error('Something Bad happened', { ...toastStyle.error });
  //     }
  //   };

  // const addProductBtn = () => {
  //   setFieldRow(fieldRow + 1);
  // };

  // const deleteProductBtn = () => {
  //   setFieldRow(fieldRow - 1);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await getTemplateDetailsAPI(id, token);
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

  return (
    <>
      <PageHeader ghost title="View your Template" />
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
                                    <Input
                                      name="name"
                                      value={createOrderJSONData?.name}
                                      onChange={handleNormalFieldChange}
                                    />
                                  </Form.Item>
                                    {createOrderJSONData?.details.map((item, index) => (
                                      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
                                        <div style={{ flex: 1 }}>
                                          <Form.Item label="Field Name">
                                            <Input
                                              name="field-name"
                                              onChange={(e) => handleNameChange(index, e)}
                                              value={item.name}
                                            />
                                          </Form.Item>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          <Form.Item label="Field Type">
                                            <Select
                                              style={{ width: '100%' }}
                                              onChange={(e) => handleTypeChange(index, e)}
                                              value={item.type}
                                            >
                                              <Option value="text" key="text">
                                                TEXT
                                              </Option>
                                              <Option value="number" key="number">
                                                NUMBER
                                              </Option>
                                              <Option value="photo" key="photo">
                                                PHOTO
                                              </Option>
                                            </Select>
                                          </Form.Item>
                                        </div>
                                      </div>
                                    ))}
                                  {/* {fieldRow >= 1 && Array(fieldRow)
                                    .fill(0)
                                    .map((_, index) => (
                                      <div key={index} style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
                                        <div style={{ flex: 1 }}>
                                          <Form.Item label="Field Name">
                                            <Input name="field-name" onChange={(e) => handleNameChange(index + 3, e)} />
                                          </Form.Item>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                          <Form.Item label="Field Type">
                                            <Select
                                              style={{ width: '100%' }}
                                              onChange={(e) => handleTypeChange(index + 3, e)}
                                            >
                                              <Option value="text" key="text">
                                                TEXT
                                              </Option>
                                              <Option value="number" key="number">
                                                NUMBER
                                              </Option>
                                              <Option value="photo" key="photo">
                                                PHOTO
                                              </Option>
                                            </Select>
                                          </Form.Item>
                                        </div>
                                      </div>
                                    ))}
                                  <Button size="small" htmlType="submit" type="primary" raised onClick={addProductBtn}>
                                    Add Another Field
                                  </Button>
                                  {fieldRow > 0 ? (
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
                                  ) : null} */}
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        {/* <div className="add-form-action">
                          <Form.Item>
                            <Button size="large" htmlType="submit" type="primary" raised onClick={handleSubmit}>
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

export default EditTemplate;
