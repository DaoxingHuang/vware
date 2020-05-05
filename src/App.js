/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import './assets/css/style.scss';
import Excel from './containers/Excel';

const data = [{
  name: 'John',
  location: 'Shanghai',
  office: 'C-103',
  phone: {office: '021-1123456', phone: '15812345678'},
},
{
  name: 'Kevin',
  location: 'ShenZhen',
  office: 'B-106',
  phone: {office: '0571-1123456', phone: '1340982121'},
},
{
  name: 'James',
  location: 'Guangzhou',
  office: 'H-204',
  phone: {office: '0571-1123456', phone: '18168760987'},
},
{
  name: 'Oliva',
  location: 'Beijing',
  office: 'M-3',
  phone: {office: '0571-1123456', phone: '1531876882'},
},
];

// eslint-disable-next-line require-jsdoc
function App() {
  // const formatData = new DataFormat(data);
  return (
    <Excel data={data}></Excel>
  );
}

export default App;
