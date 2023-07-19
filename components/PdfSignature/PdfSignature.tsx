import { Text, View } from '@react-pdf/renderer';

import styles from './styles';

const PdfSignature = () => {
  return (
    <>
      <View style={styles.signatureDate}>
        <Text>________________________, ________/_________/____________</Text>
      </View>
      <View style={styles.signature}>
        <Text>
          ________________________________________________________________
        </Text>
      </View>
      <View style={styles.signatureTeacher}>
        <Text>Professor Orientador</Text>
      </View>
    </>
  );
};

export default PdfSignature;
