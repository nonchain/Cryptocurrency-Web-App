import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify';
import { Card, Col, Row, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from '../components/Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      const filteredDate = cryptoList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setCryptos(filteredDate)
    }, 200)

    return ()=>{
      clearTimeout(handler);
    };

  }, [cryptoList, searchTerm])

  //console.log(cryptos);
  if (isFetching) return <Loader />

  return (
    <>
      {/* gutter == gap */}
      <div className={`search__crypto ${simplified && 'hidden'}`}>
        <Input placeholder='Search ...' onChange={e => setSearchTerm(e.target.value)} />
      </div>
      <Row gutter={[32, 32]} className='crypto__card-container'>
        {/* Full width in Ant Design is 24 Column */}
        {cryptos?.map(currency => (
          <Col xs={24} sm={12} lg={6} key={currency.uuid} className='crypto__card'>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto__image' alt='Crypto Icon' src={currency.iconUrl} />}
                hoverable
              >
                <p>{`Price: ${millify(currency.price)}`}</p>
                <p>{`Market Cap: ${millify(currency.marketCap)}`}</p>
                <p>{`Change: ${millify(currency.change)}%`}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies