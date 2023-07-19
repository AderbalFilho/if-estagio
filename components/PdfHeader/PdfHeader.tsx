/* eslint-disable jsx-a11y/alt-text */
import { useLayoutEffect, useState } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import ifceLogo from '@/assets/ifce-logo.jpg';
import { IUser } from '@/interfaces/user.model';
import { configDate } from '@/shared/config-date';

import styles from './styles';

const PdfHeader = ({ hasJustImage }: { hasJustImage?: boolean }) => {
  const [user, setUser] = useState({} as IUser);

  /* Don't know why, but Context is not working here */
  useLayoutEffect(() => {
    const internshipInfoString = localStorage.getItem('internshipInfo');

    if (internshipInfoString) {
      const { user } = JSON.parse(internshipInfoString);

      if (user) {
        setUser({
          ...user,
          internshipBegin: user.internshipBegin
            ? dayjs(user.internshipBegin)
            : null,
          internshipEnd: user.internshipEnd ? dayjs(user.internshipEnd) : null,
        });
      }
    }
  }, []);

  return (
    <>
      <Image src={ifceLogo.src} style={styles.logo} />
      {!hasJustImage && (
        <>
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
              {user?.course ||
                '_______________________________________________'}
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
              {configDate(user?.internshipBegin) || '______/______/___________'}{' '}
              A {configDate(user?.internshipEnd) || '______/______/___________'}
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
        </>
      )}
    </>
  );
};

export default PdfHeader;
