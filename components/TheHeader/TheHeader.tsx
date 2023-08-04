'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  Alert,
  AppBar,
  Button,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRouter } from 'next/navigation';
import PdfDocument from '@/components/PdfDocument';
import signOut from '@/firebase/auth/signout';
import { addActivities, addUser } from '@/firebase/firestore/addData';
import { MainContext } from '@/contexts/MainContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { IUser } from '@/interfaces/user.model';
import { IActivity, IActivityStringify } from '@/interfaces/activities.model';

import * as S from './styles';

const TheHeader = () => {
  const {
    activities: activitiesContext,
    updateActivities,
    user: userContext,
    updateUser,
  } = useContext(MainContext);
  const { user: firebaseUser } = useAuthContext();
  const [internshipInfo, setInternshipInfo] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<Error>();
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setInternshipInfo(
      JSON.stringify({ user: userContext, activities: activitiesContext }) || ''
    );
  }, [userContext, activitiesContext]);

  function handleResize() {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  function handleImportClick() {
    if (inputUploadRef.current != null) {
      inputUploadRef.current.click();
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader();
    setErr(undefined);

    fileReader.readAsText(e?.target?.files?.[0] || new Blob([]), 'UTF-8');
    fileReader.onload = async (e) => {
      const { user, activities } = JSON.parse(
        (e?.target?.result as string | null) || '{}'
      ) as { user: IUser; activities: IActivityStringify[] };

      const newActivities: IActivity[] = activities?.map(
        (activity: IActivityStringify): IActivity => {
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

      const userFormated = {
        ...user,
        internshipBegin: user?.internshipBegin
          ? dayjs(user.internshipBegin)
          : null,
        internshipEnd: user?.internshipEnd ? dayjs(user.internshipEnd) : null,
      };

      updateUser(userFormated || null);

      const { error } = await addUser(
        (firebaseUser as { uid: string })?.uid || '',
        userFormated
      );

      if (error) {
        setErr(error as Error);
      }

      updateActivities(newActivities);

      const { error: errorActivities } = await addActivities(
        (firebaseUser as { uid: string })?.uid || '',
        { activities: JSON.stringify(newActivities) || '[]' }
      );

      if (errorActivities) {
        setErr(errorActivities as Error);
      }

      setOpen(true);
    };
  }

  async function handleSignout() {
    const { error } = await signOut();

    if (error) {
      setErr(error as Error);
      setOpen(true);
      return;
    }

    router.push('/login');
  }

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid #d3d3d3' }}
    >
      <Toolbar
        sx={isMobile ? { flexDirection: 'column' } : { flexWrap: 'wrap' }}
      >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, color: '#19882c' }}
        >
          Sistema de Apoio ao Estagiário
        </Typography>
        <nav>
          <Button
            sx={{ my: 1, mx: 1, color: '#19882c' }}
            onClick={handleImportClick}
          >
            Importar
          </Button>
          <S.InputUpload
            ref={inputUploadRef}
            type="file"
            accept=".json"
            onChange={handleImport}
          />
          <Button
            sx={{ my: 1, mx: 1, color: '#19882c' }}
            href={`data:text/json;charset=utf-8,${internshipInfo}`}
            download="relatorio-diario.json"
          >
            Exportar
          </Button>
          {isClient && (
            <PDFDownloadLink
              document={
                <PdfDocument
                  activities={activitiesContext}
                  user={userContext}
                />
              }
              fileName="relatorio-diario.pdf"
            >
              {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ({ blob, url, loading, error }) =>
                  loading ? (
                    <Button sx={{ my: 1, mx: 1, color: '#19882c' }}>
                      Aguarde...
                    </Button>
                  ) : (
                    <Button sx={{ my: 1, mx: 1, color: '#19882c' }}>
                      Criar pdf
                    </Button>
                  )
              }
            </PDFDownloadLink>
          )}
        </nav>
        <Button
          href="#"
          variant="outlined"
          color="error"
          sx={{ my: 1, mx: 1 }}
          onClick={handleSignout}
        >
          Logout
        </Button>
      </Toolbar>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={err ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {err?.toString() || 'Dados salvos com sucesso!'}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default TheHeader;
