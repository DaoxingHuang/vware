/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import './assets/css/App.scss';
import Excel from './components/Excel';

const data = [{
  id: 1,
  name: 'John',
  location: 'shanghai',
  office: 'C-103',
  phone: {office: '021-1123456', phone: '15812345678'},
},
{
  id: 2,
  name: 'Kevin',
  location: 'ShenZhen',
  office: 'B-106',
  phone: {office: '0571-1123456', phone: '1340982121'},
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
