import React from 'react'
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const convertTime = timestamp => {
   const unixTime = timestamp;
   const date = new Date(unixTime * 1000);
   return date.toLocaleDateString("en-US");
}

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
   const coinPrice = [];
   const coinTimestamp = [];

   console.log(coinHistory?.data?.history);
   console.log(coinTimestamp);

   for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
      coinPrice.push(coinHistory?.data?.history[i].price);
      coinTimestamp.push(convertTime(coinHistory?.data?.history[i].timestamp));
   }

   const data = {
      labels: coinTimestamp.reverse(),
      datasets: [
         {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#ff71bd',
         }
      ]
   };

   const options = {
      scales: {
         yAxes: [
            {
               ticks: {
                  beginAtZero: true,
               }
            }
         ], 
      }
   };
   return (
      <div>
         <Row className='chart__header'>
            <Title level={2} className='chart__title'>{coinName} Price Chart</Title>
            <Col className='price__container'>
               <Title level={5} className='price__change'>{coinHistory?.data?.change}%</Title>
               <Title level={5} className='current__price'>Current {coinName} Price: ${currentPrice}</Title>
            </Col>
         </Row>

         <Line data={data} options={options} />
      </div>
   )
}

export default LineChart