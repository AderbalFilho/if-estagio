import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

const lato14Center = {
  fontFamily: 'Lato',
  fontSize: 14,
  margin: '2.5mm 0 0',
  textAlign: 'center',
  fontWeight: 'bold',
};

const internshipInfo = {
  flexDirection: 'row',
  fontFamily: 'Lato',
  fontSize: 11,
  fontWeight: 'bold',
  justifyContent: 'space-between',
  margin: '3mm 15mm 0',
};

export default StyleSheet.create({
  logo: {
    height: '19.4mm',
    margin: '10mm 0 0 30mm',
    width: '44.52mm',
  },
  info: lato14Center as Style,
  subinfo: {
    fontFamily: 'Lato',
    fontSize: 12,
    margin: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: lato14Center as Style,
  dontErasure: {
    border: '1px solid #000000',
    fontFamily: 'Lato',
    fontSize: 11,
    fontWeight: 900,
    height: '16mm',
    padding: '1.5mm 1mm 0',
    position: 'absolute',
    right: '15mm',
    textAlign: 'center',
    top: '40.5mm',
    width: '43.5mm',
  },
  internshipName: {
    ...internshipInfo,
    margin: '5mm 15mm 0',
  } as Style,
  internshipInfo: internshipInfo as Style,
});
