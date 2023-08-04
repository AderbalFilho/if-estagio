import { Page, Document, Font } from '@react-pdf/renderer';

import { IActivity } from '@/interfaces/activities.model';
import { IUser } from '@/interfaces/user.model';
import PdfHeader from '@/components/PdfHeader';
import PdfTable from '@/components/PdfTable';
import PdfSignature from '@/components/PdfSignature';

import styles from './styles';

Font.register({
  family: 'Lato',
  fonts: [
    {
      src: 'https://fonts.cdnfonts.com/s/14882/Lato-Regular.woff',
    },
    {
      src: 'https://fonts.cdnfonts.com/s/14882/Lato-Bold.woff',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.cdnfonts.com/s/14882/Lato-Black.woff',
      fontWeight: 900,
    },
  ],
});

const PdfDocument = ({
  activities,
  user,
}: {
  activities: IActivity[];
  user: IUser;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader user={user} />
        <PdfTable maxRows={6} activities={firstPageActivities(activities)} />
      </Page>
      <Page size="A4" style={styles.page}>
        <PdfHeader user={user} hasJustImage />
        <PdfTable maxRows={7} activities={secondPageActivities(activities)} />
        <PdfSignature />
      </Page>
    </Document>
  );
};

function firstPageActivities(activities: IActivity[]): IActivity[] {
  if (!activities.length) {
    return [];
  }

  if (activities.length <= 6) {
    return activities;
  }

  return activities.slice(0, 6);
}

function secondPageActivities(activities: IActivity[]): IActivity[] {
  if (!activities.length || activities.length <= 6) {
    return [];
  }

  const maxArrayLength = activities.length <= 13 ? 13 : activities.length;

  return activities.slice(6, maxArrayLength);
}

export default PdfDocument;
