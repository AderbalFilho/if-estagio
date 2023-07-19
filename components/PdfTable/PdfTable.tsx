import PdfTableHeader from '@/components/PdfTableHeader';
import PdfTableRow from '@/components/PdfTableRow';
import { IActivity } from '@/interfaces/activities.model';
import { View } from '@react-pdf/renderer';

const PdfTable = ({
  maxRows,
  activities,
}: {
  maxRows: number;
  activities: IActivity[];
}) => {
  return (
    <View>
      <PdfTableHeader />
      {activities.map((activity, i) => (
        <PdfTableRow key={i} activity={activity} />
      ))}
      {[...Array(maxRows - activities.length)].map((_, i) => (
        <PdfTableRow key={i} />
      ))}
    </View>
  );
};

export default PdfTable;
