import { useLayoutEffect, useState } from 'react';
import { Page, Document, Font } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import { IActivity, IActivityStringify } from '@/interfaces/activities.model';
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

const PdfDocument = () => {
  const [activities, setActivities] = useState([] as IActivity[]);

  /* Don't know why, but Context is not working here */
  useLayoutEffect(() => {
    const internshipInfoString = localStorage.getItem('internshipInfo');

    if (internshipInfoString) {
      const { activities } = JSON.parse(internshipInfoString);

      if (activities) {
        const newActivities: IActivity[] = activities.map(
          (activity: IActivityStringify): IActivity => {
            return {
              date: activity.date ? dayjs(activity.date) : null,
              hourBegin1: activity.hourBegin1
                ? dayjs(activity.hourBegin1)
                : null,
              hourEnd1: activity.hourEnd1 ? dayjs(activity.hourEnd1) : null,
              hourBegin2: activity.hourBegin2
                ? dayjs(activity.hourBegin2)
                : null,
              hourEnd2: activity.hourEnd2 ? dayjs(activity.hourEnd2) : null,
              description: activity.description,
            };
          }
        );

        setActivities(newActivities);
      }
    }
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader />
        <PdfTable maxRows={6} activities={firstPageActivities(activities)} />
      </Page>
      <Page size="A4" style={styles.page}>
        <PdfHeader hasJustImage />
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
