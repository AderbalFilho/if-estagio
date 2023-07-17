'use client';

import { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import PdfDocument from '@/components/PdfDocument';

const Prev = () => (
  <PDFViewer style={{ height: '100vh', width: '100%' }}>
    <PdfDocument />
  </PDFViewer>
);

const Preview = () => {
  useLayoutEffect(() => {
    ReactDOM.render(<Prev />, document.getElementById('preview-pdf'));
  }, []);

  return <div id="preview-pdf"></div>;
};

export default Preview;
