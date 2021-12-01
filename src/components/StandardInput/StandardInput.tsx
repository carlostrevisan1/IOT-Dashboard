import { Input, Typography  } from 'antd';
import React from 'react';

import './styles.css'

type Props = {
  label: string;
  colour: string;
  withoutLabel?: boolean;
  onChange?:(text:string)=>void;
}

export default function StandardInput({label, colour, withoutLabel = false, onChange}: Props){
  return (
    <div className="field" style={{ display: "flex", flexDirection:"row"}}>
      {!withoutLabel &&  
        <Typography id="label">{label}</Typography>
      }
      <Input id="input" onChange={e=>onChange? onChange(e.target.value) : {}} style={{color: colour, flexGrow: 4}}/>
    </div>
  );
}