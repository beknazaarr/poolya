import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, Chip
} from '@mui/material';

const OrganizationsPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', activity_type: '', contacts: '' });

  const fetchOrgs = async () => {
    const res = await axios.get('/organizations/');
    setOrgs(res.data);
  };

  useEffect(() => { fetchOrgs(); }, []);

  const handleCreate = async () => {
    await axios.post('/organizations/', form);
    setOpen(false);
    setForm({ name: '', activity_type: '', contacts: '' });
    fetchOrgs();
  };

  const handleBlock = async (id) => {
    await axios.post(`/organizations/${id}/block/`);
    fetchOrgs();
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Организации</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>+ Добавить</Button>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Тип деятельности</TableCell>
              <TableCell>Контакты</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgs.map(org => (
              <TableRow key={org.id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.activity_type}</TableCell>
                <TableCell>{org.contacts}</TableCell>
                <TableCell>
                  <Chip label={org.is_active ? 'Активна' : 'Заблокирована'}
                    color={org.is_active ? 'success' : 'error'} size="small" />
                </TableCell>
                <TableCell>
                  <Button size="small" color={org.is_active ? 'error' : 'success'}
                    onClick={() => handleBlock(org.id)}>
                    {org.is_active ? 'Заблокировать' : 'Разблокировать'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Новая организация</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2, minWidth: 400 }}>
          <TextField label="Название" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField label="Тип деятельности" value={form.activity_type}
            onChange={e => setForm({ ...form, activity_type: e.target.value })} />
          <TextField label="Контакты" value={form.contacts}
            onChange={e => setForm({ ...form, contacts: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleCreate}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrganizationsPage;