import React, { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/logo150.png'

const Navbar = () => {
   const [activeMenu, setActiveMenu] = useState(true);
   const [screenSize, setScreenSize] = useState(null);

   useEffect(() => {
      const handelResize = () => setScreenSize(window.innerWidth);
      window.addEventListener('resize', handelResize);

      handelResize();

      //return ()=> window.removeEventListener('resize', handelResize);
   }, []);

   useEffect(() => {
      if (screenSize < 768) return setActiveMenu(false)
      setActiveMenu(true)

   }, [screenSize]);

   return (
      <div className='nav__container'>
         <div className='logo__container'>
            <div>
               <Avatar src={icon} size={'large'} />
               <Typography.Title level={2} className='logo'>
                  <Link to={'./'}>Riverto</Link>
               </Typography.Title>
            </div>

            <Button className='menu__control-container' onClick={() => setActiveMenu(!activeMenu)} >
               <MenuOutlined />
            </Button>
         </div>

         {activeMenu && (
            <Menu theme='dark'>
               <Menu.Item icon={<HomeOutlined />}>
                  <Link to={'/'}>Home</Link>
               </Menu.Item>
               <Menu.Item icon={<FundOutlined />}>
                  <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
               </Menu.Item>
               <Menu.Item icon={<MoneyCollectOutlined />}>
                  <Link to={'/exchanges'}>Exchanges</Link>
               </Menu.Item>
               <Menu.Item icon={<BulbOutlined />}>
                  <Link to={'/news'}>News</Link>
               </Menu.Item>
            </Menu>
         )}
      </div>
   )
}

export default Navbar