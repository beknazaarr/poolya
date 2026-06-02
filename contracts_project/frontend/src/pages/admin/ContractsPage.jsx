import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, Chip, TextField, MenuItem, Select,
  FormControl, InputLabel
} from '@mui/material';

const statusColors = {
  active: 'success', expired: 'error', terminated: 'default', renewal: 'warning'
};
const statusLabels = {
  active: 'Действующий', expired: 'Истёк', terminated: 'Расторгнут', renewal: 'На продлении'
};

const ContractsPage = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const params = {};
    if (user.role === 'manager') params.manager = user.id;
    axios.get('/contracts/', { params }).then(res => setContracts(res.data));
  }, [user]);

  const filtered = contracts.filter(c => {
    const matchSearch = c.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      String(c.id).includes(search);
    const matchStatus = statusFilter ? c.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Договоры</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Поиск" size="small" value={search}
          onChange={e => setSearch(e.target.value)} />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Статус</InputLabel>
          <Select value={statusFilter} label="Статус"
            onChange={e => setStatusFilter(e.target.value)}>
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="active">Действующий</MenuItem>
            <MenuItem value="expired">Истёк</MenuItem>
            <MenuItem value="terminated">Расторгнут</MenuItem>
            <MenuItem value="renewal">На продлении</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Клиент</TableCell>
              <TableCell>Оферта</TableCell>
              <TableCell>Дата подписания</TableCell>
              <TableCell>Дата окончания</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.client_name}</TableCell>
                <TableCell>{c.offer_name}</TableCell>
                <TableCell>{c.signed_date}</TableCell>
                <TableCell>{c.end_date}</TableCell>
                <TableCell>
                  <Chip label={statusLabels[c.status]} color={statusColors[c.status]} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ContractsPage;