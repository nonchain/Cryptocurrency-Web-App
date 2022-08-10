import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify';
import { Typography, Col, Row, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptosDetailsQuery, useGetCryptosHistoryQuery } from '../services/cryptoApi';
import LineChart from '../components/LineChart';
import Loader from '../components/Loader';


const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { uuid } = useParams();
  const [timePeriod, setTimePeriod] = useState('24h')
  const { data, isFetching } = useGetCryptosDetailsQuery(uuid)
  const { data: coinHistory } = useGetCryptosHistoryQuery({uuid, timePeriod})
  const cryptoDetails = data?.data?.coin;
  // console.log(data)
  // console.log(coinHistory)

  if (isFetching) return <Loader />

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin__detail-container'>
      <Col className='coin__heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>

      <Select
        defaultValue={'24h'}
        className='select__timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}>

        {time.map(date => <Option key={date}>{date}</Option>)}

      </Select>
      {/* Line Chart */}
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      {/* Statistics */}
      <Col className='stats__container'>
        <Col className=''>
          <Col className='coin__value-statistics-heading'>
            <Title level={3} className='coin__details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>

          {stats.map(({icon, title, value} , i)=>(
            <Col className='coin__stats' key={i}>
              <Col className='coin__stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className=''>
          <Col className='coin__value-statistics-heading'>
            <Title level={3} className='coin__details-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>

          {genericStats.map(({icon, title, value} , i)=>(
            <Col className='coin__stats' key={i}>
              <Col className='coin__stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className='coin__desc-link'>
        {/* DESCRIPTION */}
        <Row className='coin__desc'>
          <Title level={3} className='coin__details-heading'>
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        {/* LINKS */}
        <Col className='coin__links'>
        <Title level={4} className='coin__details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link)=>(
            <Row className='coin__link' key={link.name}>
              <Title level={5} children='link__name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails