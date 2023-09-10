import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Row, Col, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getDocumentTemplateListAPI } from '../../config/api/template';

function ViewTemplate() {
  const history = useHistory();

  const [docTemplateList, setDocTemplateList] = useState([]);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("loginToken")
        const response = await getDocumentTemplateListAPI(token);
        console.log(response)
        setDocTemplateList(response?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();

  },[])

  const dataSource = [];
  if (docTemplateList?.length) {
    docTemplateList.map((value, key) => {
      return dataSource.push({
        id: <span className="order-id">{key+1}</span>,
        name: <span className="customer-name">{value.name}</span>,
        action: (
          <div className="table-actions">
            <>
              <Button className="btn-icon" type="primary" shape="circle" onClick={()=>history.push(`/admin/template/edit-template?id=${value.id}`)}>
                <FeatherIcon icon="eye" size={16} />
              </Button>
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Serial No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <>
      <PageHeader
        ghost
        title="Templates"
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                    {/* <div></div> */}
                </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 10, showSizeChanger: true, total: docTemplateList?.length }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default ViewTemplate;