import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar } from './components';
import { Home, Cryptocurrencies, CryptoDetails, Exchanges, News, Error404 } from './pages';

import './App.css';
import 'antd/dist/antd.min.css' // ant design css file

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:uuid' element={<CryptoDetails />} /> {/*:coinId = dynamic id*/}
              <Route path='/news' element={<News />} />
              <Route path='*' element={<Error404 />} />
            </Routes>
          </div>
        </Layout>

        <div className='footer'>
        <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
          Riverto<br />
          All right reserved
        </Typography.Title>
        <Space>
          <Link to={'/'}>Home</Link>
          <Link to={'/exchanges'}>Exchanges</Link>
          <Link to={'/news'}>News</Link>
        </Space>
      </div>
      </div>
      
    </div>
  )
}

export default App