import { Download, LogOut, RefreshCcw, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { services } from '../data/content.js';
import { getSupabaseSetupMessage, isSupabaseConfigured, supabase } from '../lib/supabase.js';

const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const emptyFilters = { search: '', service: '', status: '', date: '' };

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = useCallback(async () => {
    if (!isSupabaseConfigured) return;

    setLoading(true);
    let query = supabase.from('appointments').select('*').order('appointment_date', { ascending: false }).order('appointment_time');

    if (filters.service) query = query.eq('selected_service', filters.service);
    if (filters.status) query = query.eq('booking_status', filters.status);
    if (filters.date) query = query.eq('appointment_date', filters.date);

    const { data, error } = await query;
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setAppointments(data || []);
  }, [filters.date, filters.service, filters.status]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const visibleAppointments = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    if (!term) return appointments;

    return appointments.filter((appointment) =>
      [appointment.full_name, appointment.phone, appointment.email, appointment.selected_service]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [appointments, filters.search]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const currentMonth = today.slice(0, 7);
    const serviceCounts = appointments.reduce((acc, appointment) => {
      acc[appointment.selected_service] = (acc[appointment.selected_service] || 0) + 1;
      return acc;
    }, {});
    const popularService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No bookings yet';

    return [
      ['Today', appointments.filter((item) => item.appointment_date === today).length],
      ['This month', appointments.filter((item) => item.appointment_date?.startsWith(currentMonth)).length],
      ['Completed', appointments.filter((item) => item.booking_status === 'Completed').length],
      ['Pending', appointments.filter((item) => item.booking_status === 'Pending').length],
      ['Popular', popularService]
    ];
  }, [appointments]);

  const updateStatus = async (id, booking_status) => {
    const { error } = await supabase.from('appointments').update({ booking_status }).eq('id', id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Appointment updated.');
    fetchAppointments();
  };

  const deleteAppointment = async (id) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Appointment deleted.');
    fetchAppointments();
  };

  const exportCsv = () => {
    const headers = ['Full name', 'Phone', 'Email', 'Service', 'Date', 'Time', 'Status', 'Message', 'Created at'];
    const rows = visibleAppointments.map((appointment) => [
      appointment.full_name,
      appointment.phone,
      appointment.email,
      appointment.selected_service,
      appointment.appointment_date,
      appointment.appointment_time,
      appointment.booking_status,
      appointment.message || '',
      appointment.created_at
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell || '').replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shreya-appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out.');
  };

  return (
    <main className="admin-page">
      <section className="container admin-shell">
        <div className="admin-topbar">
          <div>
            <p className="eyebrow">Admin dashboard</p>
            <h1>Appointments</h1>
          </div>
          <div className="admin-actions">
            <button className="button button--soft" type="button" onClick={fetchAppointments}>
              <RefreshCcw size={17} />
              Refresh
            </button>
            <button className="button button--soft" type="button" onClick={exportCsv} disabled={!visibleAppointments.length}>
              <Download size={17} />
              Export CSV
            </button>
            <button className="icon-button" type="button" aria-label="Sign out" onClick={signOut}>
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {!isSupabaseConfigured && <p className="config-note">{getSupabaseSetupMessage()}</p>}

        <div className="stat-grid">
          {stats.map(([label, value]) => (
            <article className="stat-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>

        <div className="admin-filters">
          <label className="search-field">
            <Search size={18} />
            <input
              value={filters.search}
              placeholder="Search name, phone, email, service"
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
            />
          </label>
          <select value={filters.service} onChange={(event) => setFilters((current) => ({ ...current, service: event.target.value }))}>
            <option value="">All services</option>
            {services.map((service) => (
              <option key={service.name} value={service.name}>{service.name}</option>
            ))}
          </select>
          <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <input type="date" value={filters.date} onChange={(event) => setFilters((current) => ({ ...current, date: event.target.value }))} />
          <button className="button button--soft" type="button" onClick={() => setFilters(emptyFilters)}>Clear</button>
        </div>

        <div className="table-wrap">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Message</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {visibleAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <strong>{appointment.full_name}</strong>
                    <span>{appointment.phone}</span>
                    <span>{appointment.email}</span>
                  </td>
                  <td>{appointment.selected_service}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>
                    <select value={appointment.booking_status} onChange={(event) => updateStatus(appointment.id, event.target.value)}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>{appointment.message || 'None'}</td>
                  <td>
                    <button className="icon-button icon-button--danger" type="button" aria-label="Delete appointment" onClick={() => deleteAppointment(appointment.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && visibleAppointments.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-table">No appointments match the current filters.</td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan="7" className="empty-table">Loading appointments...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
