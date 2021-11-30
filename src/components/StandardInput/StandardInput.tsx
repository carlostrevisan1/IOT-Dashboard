import { Input, Typography  } from 'antd';
import React from 'react';

import './styles.css'

type Props = {
  label: string;
  colour: string;
}

export default function StandardInput({label, colour}: Props){
  return (
    <div className="field" style={{ display: "flex", flexDirection:"row"}}>
      {/* <Typography id="label">{label}</Typography> */}
      <Input id="input" style={{color: colour, flexGrow: 4}}/>
    </div>
  );
}