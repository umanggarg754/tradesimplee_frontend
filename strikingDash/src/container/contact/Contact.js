import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Table, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Action, ContactPageheaderStyle } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper, CardToolbox, BasicFormWrapper } from '../styled';
import Heading from '../../components/heading/heading';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { AddUser, UserTableStyleWrapper } from '../pages/style';
import { contactSearchData } from '../../redux/contact/actionCreator';
import { Dropdown } from '../../components/dropdown/dropdown';
import { Modal } from '../../components/modals/antd-modals';
import { getContactAPI, addContactAPI, editContactAPI } from '../../config/api/company';
import { toastStyle } from '../../utility/helper'

function ContactTable() {
  const dispatch = useDispatch();
  // const { users } = useSelector(state => {
  //   return {
  //     users: state.Contact.data,
  //   };
  // });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: false,
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
  });

  const { update } = state;

  const handleSearch = searchText => {
    dispatch(contactSearchData(searchText));
  };

  // const onHandleDelete = id => {
  //   const value = users.filter(item => item.id !== id);
  //   dispatch(contactDeleteData(value));
  // };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  // const handleOk = values => {
  //   onCancel();
  //   const arrayData = [];
  //   users.map(data => {
  //     return arrayData.push(data.id);
  //   });
  //   const max = Math.max(...arrayData);
  //   dispatch(
  //     contactAddData([
  //       ...users,
  //       {
  //         ...values,
  //         id: max + 1,
  //         time: new Date().getTime(),
  //         img: 'static/img/users/6.png',
  //         live: false,
  //         stared: false,
  //       },
  //     ]),
  //   );
  //   form.resetFields();
  // };

  // const handleEditOk = values => {
  //   onCancel();
  //   const updateUsers = users;

  //   updateUsers.map(user => {
  //     if (user.id === update.id) {
  //       const updateUser = user;
  //       updateUser.id = update.id;
  //       updateUser.name = values.name;
  //       updateUser.email = values.email;
  //       updateUser.phone = values.phone;
  //       updateUser.designation = values.designation;
  //       updateUser.company = values.company;
  //       updateUser.time = update.time;
  //       updateUser.img = update.img;
  //       updateUser.stared = update.stared;
  //     }
  //     return true;
  //   });
  //   dispatch(contactAddData(updateUsers));
  //   form.resetFields();
  // };

  const handleCancel = () => {
    onCancel();
  };

  const [listContact, setListContact] = useState([]);
  const [addNewContanct, setAddNewState] = useState({
    name: "",  
    company: "", 
    linkedin:"", 
    email:"", 
    phone:"", 
    whatsapp:"", 
    summary:"",
    background:"",
    status:"",
    country:"",
    city:"",
    type:""
  })

  const [editContact, setEditContact] = useState({
    id:"",
    name: "",  
    company: "", 
    linkedin:"", 
    email:"", 
    phone:"", 
    whatsapp:"", 
    summary:"",
    background:"",
    status:"",
    country:"",
    city:"",
    type:""
  })

  const handleChangeAddNew = (e) =>{
    setAddNewState({ ...addNewContanct, [e.target.name]: e.target.value });
  }

  const handleChangeEdit = (e) =>{
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  }

  const submitAddNewContact = async () => {
    onCancel();
    const params = {
      name: addNewContanct.name,  
      company: addNewContanct.company, 
      linkedin: addNewContanct.linkedin, 
      email: addNewContanct.email, 
      phone: addNewContanct.phone, 
      whatsapp: addNewContanct.whatsapp, 
      summary: addNewContanct.summary,
      background: addNewContanct.background,
      status: addNewContanct.status,
      country: addNewContanct.country,
      city: addNewContanct.city,
      type: addNewContanct.type
    }

    const token = localStorage.getItem("loginToken")
    const response = await addContactAPI(params, token)
    console.log(response);
    if(response?.status===201){
      // dispatch(login());
      // history.push('/company-register');
      setListContact([...listContact, response.data]); // Add the new entry to the current data state
      setAddNewState({
        name: "",  
        company: "", 
        linkedin:"", 
        email:"", 
        phone:"", 
        whatsapp:"", 
        summary:"",
        background:"",
        status:"",
        country:"",
        city:"",
        type:""
      });
      toast.success('Contact Added Successfully 🥳',{...toastStyle.success})

    }else{
      toast.error('Please try again 😞',{...toastStyle.error})
    }
  }

  const submitEditContact = async () => {
    onCancel();
    console.log(editContact)
    const token = localStorage.getItem("loginToken")
    const response = await editContactAPI(editContact.id, editContact, token)
    console.log(response);
    if(response?.status===201){
      toast.success('Contact Edited Successfully 🥳',{...toastStyle.success})

    }else{
      toast.error('Please try again 😞',{...toastStyle.error})
    }
  }

  const editActionBtn = (data) =>{
    console.log(data)
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
    setEditContact(data)
  }


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("loginToken")
        const response = await getContactAPI(token);
        console.log(response)
        setListContact(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchData();

  },[])

  const usersTableData = [];

  listContact
    ?.map(user => {
      const { id, name, type, email, phone, company, status, city, country } = user;

      return usersTableData.push({
        key: id,
        user: (
          <div className="user-info">
            {/* <figure>
              <img style={{ width: '40px' }} src={require(`../../${img}`)} alt="" />
            </figure> */}
            <figcaption>
              <Heading className="user-name" as="h6">
                {name}
              </Heading>
              <span className="user-designation">{city}, {country}</span>
            </figcaption>
          </div>
        ),
        email,
        company,
        type,
        phone,
        status,
        action: (
          <Action className="table-actions">
            {/* <Button
              onClick={() => dispatch(onStarUpdate(users, id))}
              className="btn-icon"
              type="primary"
              to="#"
              shape="circle"
            >
              <FeatherIcon className={stared ? 'active' : 'deactivate'} icon="star" size={16} />
            </Button> */}
            <Dropdown
              className="wide-dropdwon"
              content={
                <>
                  <Link onClick={() => editActionBtn(user)} to="#">
                    <span>Edit</span>
                  </Link>
                  {/* <Link onClick={() => onHandleDelete(id)} to="#">
                    <span>Delete</span>
                  </Link> */}
                </>
              }
              action={['click']}
            >
              <Button className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="more-vertical" size={16} />
              </Button>
            </Dropdown>
          </Action>
        ),
      });
    });

  const usersTableColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setState({ ...state, selectedRowKeys, selectedRows });
  //   },
  //   getCheckboxProps: record => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };



  return (
    <>
      <CardToolbox>
        <ContactPageheaderStyle>
          <PageHeader
            ghost
            title="Contacts"
            subTitle={
              <>
                <AutoComplete
                  onSearch={handleSearch}
                  // dataSource={notData}
                  placeholder="Search by Name"
                  width="100%"
                  patterns
                />
              </>
            }
            buttons={[
              <Button onClick={showModal} className="btn-add_new" size="default" type="primary" key="1">
                <Link to="#">+ Add New</Link>
              </Button>,
            ]}
          />
        </ContactPageheaderStyle>
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <UserTableStyleWrapper>
                <div className="contact-table">
                  <TableWrapper className="table-responsive">
                    <Table
                      // rowSelection={rowSelection}
                      dataSource={usersTableData}
                      columns={usersTableColumns}
                      pagination={{
                        defaultPageSize: 10,
                        total: usersTableData.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                      }}
                    />
                  </TableWrapper>
                </div>
              </UserTableStyleWrapper>
            </Cards>
          </Col>
        </Row>
        <Modal
          type={state.modalType}
          title="Contact Information"
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <BasicFormWrapper>
                <Form form={form} name="contact">
                  <Form.Item label="Name">
                    <Input placeholder="Input Name" name="name" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    rules={[{ message: 'Please input your email!', type: 'email' }]}
                  >
                    <Input name="email" placeholder="name@example.com" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="Company Name">
                    <Input name="company" placeholder="Input Company Name" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="LinkedIN">
                    <Input name="linkedin" placeholder="Input linkedin URL" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="Phone Number">
                    <Input name="phone" placeholder="+91 972546 5236" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="WhatsApp Number">
                    <Input name="whatsapp" placeholder="+91 972546 5236" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="Summary">
                    <Input name="summary" placeholder="Input Summary" onChange={handleChangeAddNew} />
                  </Form.Item>

                  <Form.Item label="Background">
                    <Input name="background" placeholder="Background" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="Status">
                    <Input name="status" placeholder="Input Status" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="Country">
                    <Input name="country" placeholder="Input Country" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="City">
                    <Input name="city" placeholder="Input City" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Form.Item label="Type">
                    <Input name="type" placeholder="Input Type" onChange={handleChangeAddNew}/>
                  </Form.Item>

                  <Button htmlType="submit" size="default" type="primary" key="submit" onClick={submitAddNewContact}>
                    Add New Contact
                  </Button>
                </Form>
              </BasicFormWrapper>
            </AddUser>
          </div>
        </Modal>
        <Modal
          type={state.modalType}
          title="Contact Information"
          visible={state.editVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="project-modal">
            <AddUser>
              <BasicFormWrapper>
                <Form form={form} name="contactEdit">

                  <Form.Item label="Name">
                    <Input defaultValue={update.name} name="name" onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    rules={[{ message: 'Please input your email!', type: 'email' }]}
                  >
                    <Input name="email" defaultValue={update.email} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="Company Name">
                    <Input name="company" defaultValue={update.company} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="LinkedIN">
                    <Input name="linkedin" defaultValue={update.linkedin} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="Phone Number">
                    <Input name="phone" defaultValue={update.phone} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="WhatsApp Number">
                    <Input name="whatsapp" defaultValue={update.whatsapp} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="Summary">
                    <Input name="summary" defaultValue={update.summary} onChange={handleChangeEdit} />
                  </Form.Item>

                  <Form.Item label="Background">
                    <Input name="background" defaultValue={update.background} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="Status">
                    <Input name="status" defaultValue={update.status} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="Country">
                    <Input name="country" defaultValue={update.country} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="City">
                    <Input name="city" defaultValue={update.city} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Form.Item label="Type">
                    <Input name="type" defaultValue={update.type} onChange={handleChangeEdit}/>
                  </Form.Item>

                  <Button htmlType="submit" size="default" type="primary" key="submit" onClick={submitEditContact}>
                    Save Changes
                  </Button>
                </Form>
              </BasicFormWrapper>
            </AddUser>
          </div>
        </Modal>
      </Main>
    </>
  );
}

export default ContactTable;
