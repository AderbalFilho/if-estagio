import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

const tableRowItem = {
  height: '100%',
  margin: 0,
};

export default StyleSheet.create({
  tableRow: {
    border: '1px solid #000000',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily: 'Lato',
    fontSize: 12,
    margin: '-0.5mm 15mm 0',
    height: '27.5mm',
  },
  tableRowItem1: {
    ...tableRowItem,
    borderRight: '1px solid #000000',
    justifyContent: 'space-between',
    padding: '0.5mm 0 2.5mm',
    textAlign: 'center',
    width: '19%',
  } as Style,
  tableRowItem2: {
    ...tableRowItem,
    borderRight: '1px solid #000000',
    width: '56%',
  } as Style,
  tableRowItem2WithData: {
    margin: '0.5mm',
  } as Style,
  tableRowItem2NoData: {
    borderBottom: '1px solid #000000',
    height: '5.5mm',
    margin: 0,
    width: '100%',
  } as Style,
  tableRowItem3: {
    ...tableRowItem,
    width: '25%',
  } as Style,
});
