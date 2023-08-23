import React from 'react';
import QRCode from 'qrcode.react';

interface PropTypes {
  value: string;
}

function BarcodeGenerator({ value }: PropTypes) {
  return (
    <div>
      <QRCode value={value} width="100%" />
    </div>
  );
}

export default BarcodeGenerator;
