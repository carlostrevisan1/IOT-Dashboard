import { Typography } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import StandardCard from '../../components/StandardCard/StandardCard';
import './styles.css'

type LoginObj = {
  password: string,
  username: string,
}

export default function Dashboard() {
  let hist = useHistory();
  
  

  return (
    <div className="dashboard">
      <StandardCard deviceTitle={"Testando"}/>
      <StandardCard deviceTitle={"aaa"}/>
    </div>
  );
}

