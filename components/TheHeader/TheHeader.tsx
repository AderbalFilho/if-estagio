import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';

import PdfDocument from '@/components/PdfDocument';

import { IUser } from '@/interfaces/user.model';
import {
  IActivity,
  IActivityLocalStorage,
} from '@/interfaces/activities.model';
import { MainContext } from '@/contexts/MainContext';

import * as S from './styles';
import dayjs from 'dayjs';

const TheHeader = () => {
  const { updateActivities, updateUser } = useContext(MainContext);
  const [internshipInfo, setInternshipInfo] = useState('');
  const inputUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternshipInfo(localStorage?.getItem('internshipInfo') || '');
  }, []);

  function handleImportClick() {
    if (inputUploadRef.current != null) {
      inputUploadRef.current.click();
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader();

    fileReader.readAsText(e?.target?.files?.[0] || new Blob([]), 'UTF-8');
    fileReader.onload = (e) => {
      const { user, activities } = JSON.parse(
        (e?.target?.result as string | null) || '{}'
      ) as { user: IUser; activities: IActivityLocalStorage[] };

      const newActivities: IActivity[] = activities.map(
        (activity: IActivityLocalStorage): IActivity => {
          return {
            date: activity.date ? dayjs(activity.date) : null,
            hourBegin1: activity.hourBegin1 ? dayjs(activity.hourBegin1) : null,
            hourEnd1: activity.hourEnd1 ? dayjs(activity.hourEnd1) : null,
            hourBegin2: activity.hourBegin2 ? dayjs(activity.hourBegin2) : null,
            hourEnd2: activity.hourEnd2 ? dayjs(activity.hourEnd2) : null,
            description: activity.description,
          };
        }
      );

      updateUser({
        ...user,
        internshipBegin: user.internshipBegin
          ? dayjs(user.internshipBegin)
          : null,
        internshipEnd: user.internshipEnd ? dayjs(user.internshipEnd) : null,
      });
      updateActivities(newActivities);
    };
  }

  return (
    <S.Header>
      <Typography variant="h2" component="h1">
        IF Estágio
      </Typography>
      <S.ActionButtons>
        <S.ActionButton>
          <Button variant="contained" onClick={handleImportClick}>
            Importar JSON
          </Button>
        </S.ActionButton>
        <S.InputUpload
          ref={inputUploadRef}
          type="file"
          accept=".json"
          onChange={handleImport}
        />
        <S.ActionButton>
          <Button
            href={`data:text/json;charset=utf-8,${internshipInfo}`}
            download="relatorio-diario.json"
            variant="contained"
          >
            Exportar como JSON
          </Button>
        </S.ActionButton>
        <PDFDownloadLink
          document={<PdfDocument />}
          fileName="relatorio-diario.pdf"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ blob, url, loading, error }) =>
              loading ? (
                <S.ActionButton>
                  <Button variant="contained">Carregando...</Button>
                </S.ActionButton>
              ) : (
                <S.ActionButton>
                  <Button variant="contained">Download do pdf</Button>
                </S.ActionButton>
              )
          }
        </PDFDownloadLink>
      </S.ActionButtons>
    </S.Header>
  );
};

export default TheHeader;
