import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

const signatureInfo = {
  fontFamily: 'Lato',
  fontSize: 12,
};

export default StyleSheet.create({
  signatureDate: {
    ...signatureInfo,
    margin: '10mm 15mm 0 35mm',
  } as Style,
  signature: {
    ...signatureInfo,
    margin: '10mm 0 0',
    textAlign: 'center',
  } as Style,
  signatureTeacher: {
    ...signatureInfo,
    margin: 0,
    textAlign: 'center',
  } as Style,
});
