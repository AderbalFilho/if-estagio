import { Text, View } from '@react-pdf/renderer';
import { IActivity } from '@/interfaces/activities.model';

import { configDate, configHourFromTo } from '@/shared/config-date';

import styles from './styles';

const PdfTableRow = ({ activity }: { activity?: IActivity }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableRowItem1}>
        <Text>
          {activity?.date ? configDate(activity.date) : '_______/_______'}
        </Text>
        <Text>
          {configHourFromTo(
            activity?.hourBegin1,
            activity?.hourEnd1,
            activity?.hourBegin2,
            activity?.hourEnd2
          )}
        </Text>
      </View>
      <View style={styles.tableRowItem2}>
        {activity?.description ? (
          <Text style={styles.tableRowItem2WithData}>
            {activity?.description}
          </Text>
        ) : (
          <>
            <Text style={styles.tableRowItem2NoData}></Text>
            <Text style={styles.tableRowItem2NoData}></Text>
            <Text style={styles.tableRowItem2NoData}></Text>
            <Text style={styles.tableRowItem2NoData}></Text>
          </>
        )}
      </View>
      <View style={styles.tableRowItem3}></View>
    </View>
  );
};

export default PdfTableRow;
