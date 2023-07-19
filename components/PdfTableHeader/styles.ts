import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

const tableHeaderItem = {
  margin: 0,
  textAlign: 'center',
};

export default StyleSheet.create({
  tableHeader: {
    border: '1px solid #000000',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily: 'Lato',
    fontSize: 11,
    fontWeight: 'bold',
    margin: '3mm 15mm 0',
  },
  tableHeaderItem1: {
    ...tableHeaderItem,
    borderRight: '1px solid #000000',
    width: '19%',
  } as Style,
  tableHeaderItem2: {
    ...tableHeaderItem,
    borderRight: '1px solid #000000',
    width: '56%',
  } as Style,
  tableHeaderItem3: {
    ...tableHeaderItem,
    width: '25%',
  } as Style,
});
