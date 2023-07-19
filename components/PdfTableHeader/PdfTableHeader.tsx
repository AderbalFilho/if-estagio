import { Text, View } from '@react-pdf/renderer';

import styles from './styles';

const PdfTableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderItem1}>{`DATA E
          HORÁRIOS`}</Text>
      <Text style={styles.tableHeaderItem2}>ATIVIDADES DIÁRIAS</Text>
      <Text style={styles.tableHeaderItem3}>{`VISTO DO
          SUPERV. ESTÁGIO`}</Text>
    </View>
  );
};

export default PdfTableHeader;
