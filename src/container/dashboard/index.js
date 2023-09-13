import React from 'react';
import { Row, Col } from 'antd';
// import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';

const Dashboard = () => {
  return (
    <>
      <PageHeader
        ghost
        title="Welcome Page"
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                <h2>Welcome to TradeSimple</h2>
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Dashboard;
