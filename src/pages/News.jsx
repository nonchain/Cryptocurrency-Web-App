import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Avatar, Select, Typography, Card } from 'antd'
import { useGetNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from '../components/Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoUrl = 'https://www.finance-monthly.com/Finance-Monthly/wp-content/uploads/2022/02/Bitcoin-Motion_-The-Website-You-Need-To-Succeed-In-Cryptocurrency-Is-Now-Launched.jpg';
const demoImage = 'https://cdn-icons-png.flaticon.com/512/147/147142.png';

const News = ({ simplified }) => {
  const count = simplified ? 6 : 11;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetNewsQuery({ newsCategory, count });
  const { data } = useGetCryptosQuery(100);

  //console.log(cryptoNews);
  if (!cryptoNews?.value) return <Loader />
  return (
    <>

      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select__news'
              placeholder='Select a Crypto'
              optionFilterProp='children'
              onChange={value => setNewsCategory(value)}
              filterOption={(input, option) => option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value='Cryptocurrency'>Cryptocurrency</Option>
              {data?.data?.coins.map(coin => <Option value={coin?.name}>{coin?.name}</Option>)}
            </Select>
          </Col>
        )}
        {
          cryptoNews?.value.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i} >
              <Card hoverable className='news__card'>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className='news__image-container'>
                    <Title className='news__title' level={4}>{news.name}</Title>
                    <img src={news?.image?.thumbnail?.contentUrl || demoUrl} alt="news image" />
                  </div>
                  <p>
                    {
                      news.description.length >= 150 ? `${news.description.substring(0, 100)} ...` : news.description
                    }
                  </p>

                  <div className="provider__container">
                    <div>
                      <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="provider" />
                      <Text className='provider__name '>{news?.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default News