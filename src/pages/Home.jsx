import React from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from '../components/Loader';

//import Cryptocurrencies from './Cryptocurrencies';
import { News, Cryptocurrencies } from './';

const { Title } = Typography;

const Home = () => {
   const { data, isFetching } = useGetCryptosQuery(10);

   const globalStats = data?.data?.stats;
   // console.log(data);
   // let globalStats;

   // console.log(data);

   // if(data !== undefined) {
   //    if(data.data !== undefined) {
   //       globalStats = data.data.stats;
   //    }
   // }
   if (isFetching) return <Loader />

   return (
      <>
         <Title level={2}>Global Crypto State</Title>
         <Row>
            <Col span={12}><Statistic title={'Total Cryptocurrencies'} value={millify(globalStats.total)} /> </Col>
            <Col span={12}><Statistic title={'Total Exchanges'} value={millify(globalStats.totalExchanges)} /> </Col>
            <Col span={12}><Statistic title={'Total Market Cap'} value={millify(globalStats.totalMarketCap)} /> </Col>
            <Col span={12}><Statistic title={'Total 24 Volume'} value={millify(globalStats.total24hVolume)} /> </Col>
            <Col span={12}><Statistic title={'Total Markets'} value={millify(globalStats.totalMarkets)} /> </Col>

         </Row>

         <div className="home__heading-container">
            <Title level={2} className='home__title'>Top 10 Cryptocurrencies</Title>
            <Title level={3} className='show__more'>
               <Link to={'/cryptocurrencies'}>Show more</Link>
            </Title>
         </div>
         <Cryptocurrencies simplified />

         <div className="home__heading-container">
            <Title level={2} className='home__title'>Latest News</Title>
            <Title level={3} className='show__more'>
               <Link to={'/news'}>Show more</Link>
            </Title>
         </div>
         <News simplified />
      </>
   )
}

export default Home