/* eslint-disable jsx-a11y/alt-text */
import { useState, useLayoutEffect } from 'react';
import { Page, Text, View, Document, Image, Font } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import ifceLogo from '@/assets/ifce-logo.jpg';
import {
  IActivity,
  IActivityLocalStorage,
} from '@/interfaces/activities.model';
import { IUser } from '@/interfaces/user.model';
import { configDate } from '@/shared/config-date';

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
  ],
});

const PdfDocument = () => {
  const [user, setUser] = useState({} as IUser);
  const [activities, setActivities] = useState([] as IActivity[]);

  useLayoutEffect(() => {
    const internshipInfoString = localStorage.getItem('internshipInfo');

    console.log(activities);
    if (internshipInfoString) {
      const { user, activities } = JSON.parse(internshipInfoString);

      if (user) {
        setUser({
          ...user,
          internshipBegin: user.internshipBegin
            ? dayjs(user.internshipBegin)
            : null,
          internshipEnd: user.internshipEnd ? dayjs(user.internshipEnd) : null,
        });
      }

      if (activities) {
        const newActivities: IActivity[] = activities.map(
          (activity: IActivityLocalStorage): IActivity => {
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
        <Image src={ifceLogo.src} style={styles.logo} />
        <View style={styles.info}>
          <Text>COORDENADORIA DE INTEGRAÇÃO ESCOLA SOCIEDADE - CIES</Text>
          <Text>SETOR DE ESTÁGIO</Text>
        </View>
        <View style={styles.subinfo}>
          <Text>ESTÁGIO REMOTO</Text>
        </View>
        <View style={styles.title}>
          <Text>RELATÓRIO DIÁRIO DE ESTÁGIO</Text>
        </View>
        <View style={styles.dontErasure}>
          <Text>NÃO PODE CONTER RASURAS</Text>
        </View>
        <View style={styles.internshipName}>
          <Text>
            NOME DO ESTAGIÁRIO:{' '}
            {user?.name ||
              '_________________________________________________________________________________________'}
          </Text>
        </View>
        <View style={styles.internshipInfo}>
          <Text>
            CURSO:{' '}
            {user?.course || '_______________________________________________'}
          </Text>
          <Text>SÉRIE/SEMESTRE: {user?.semester || '_____________'}</Text>
          <Text>TURMA: {user?.class || '_____________'}</Text>
        </View>
        <View style={styles.internshipInfo}>
          <Text>
            EMPRESA:{' '}
            {user?.company ||
              '_________________________________________________________________________________________________________'}
          </Text>
        </View>
        <View style={styles.internshipInfo}>
          <Text>
            PERÍODO DO ESTÁGIO: DE{' '}
            {configDate(user?.internshipBegin) || '______/______/___________'} A{' '}
            {configDate(user?.internshipEnd) || '______/______/___________'}
          </Text>
          <Text>
            C.H:{' '}
            {user?.workload && user?.workload !== '0'
              ? user?.workload
              : '_________________'}{' '}
            HORAS
          </Text>
        </View>
        <View style={styles.internshipInfo}>
          <Text>
            ÁREA DE ESTÁGIO:{' '}
            {user?.internshipArea ||
              '_______________________________________________________________________________________________'}
          </Text>
        </View>
        <View style={styles.internshipInfo}>
          <Text>
            PROFESSOR ORIENTADOR:{' '}
            {user?.teacherAdvisor ||
              '_____________________________________________________________________________________'}
          </Text>
        </View>
        <View style={styles.internshipInfo}>
          <Text>
            SUPERVISOR DO ESTÁGIO:{' '}
            {user?.internshipSupervisor ||
              '______________________________________________________________________________________'}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
