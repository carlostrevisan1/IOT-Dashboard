import { Input, Typography  } from 'antd';
import React from 'react';

import './styles.css'

type Props = {
  label: string
}

export default function StandardInput({label}: Props){
  return (
    <div className="field">
      <Typography id="label">{label}</Typography>
      <Input id="input" />
    </div>
  );
}