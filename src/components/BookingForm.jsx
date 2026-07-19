import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { services } from '../data/content.js';
import { getSupabaseSetupMessage, isSupabaseConfigured, supabase } from '../lib/supabase.js';

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'];
const today = new Date().toISOString().slice(0, 10);

const bookingSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name.'),
  phone: z.string().min(8, 'Please enter a valid phone number.').max(18, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  selected_service: z.string().min(1, 'Please choose a service.'),
  appointment_date: z.string().refine((value) => value >= today, 'Please choose today or a future date.'),
  appointment_time: z.string().min(1, 'Please choose a time slot.'),
  message: z.string().max(500, 'Message must be under 500 characters.').optional()
});

export default function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const serviceNames = useMemo(() => services.map((service) => service.name), []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      full_name: '',
      phone: '',
      email: '',
      selected_service: '',
      appointment_date: today,
      appointment_time: '',
      message: ''
    }
  });

  const onSubmit = async (values) => {
    if (!isSupabaseConfigured) {
      toast.error(getSupabaseSetupMessage());
      return;
    }

    setSubmitting(true);
    try {
      const { data: available, error: availabilityError } = await supabase.rpc('is_time_slot_available', {
        slot_date: values.appointment_date,
        slot_time: values.appointment_time
      });

      if (availabilityError) throw availabilityError;
      if (available === false) {
        toast.error('That time slot is already booked. Please choose another time.');
        return;
      }

      const { error } = await supabase.from('appointments').insert({
        ...values,
        booking_status: 'Pending'
      });

      if (error) {
        if (error.code === '23505') {
          toast.error('That time slot was just booked. Please choose another time.');
          return;
        }
        throw error;
      }

      const confirmation = `Appointment request received for ${values.selected_service} on ${values.appointment_date} at ${values.appointment_time}.`;
      toast.success(confirmation);
      reset();
    } catch (error) {
      toast.error(error.message || 'Could not submit the appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grid">
        <Field label="Full name" error={errors.full_name?.message}>
          <input {...register('full_name')} autoComplete="name" placeholder="Your full name" />
        </Field>
        <Field label="Phone number" error={errors.phone?.message}>
          <input {...register('phone')} autoComplete="tel" placeholder="+91 98765 43210" />
        </Field>
        <Field label="Email address" error={errors.email?.message}>
          <input {...register('email')} autoComplete="email" placeholder="you@example.com" />
        </Field>
        <Field label="Preferred service" error={errors.selected_service?.message}>
          <select {...register('selected_service')}>
            <option value="">Select a service</option>
            {serviceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Appointment date" error={errors.appointment_date?.message}>
          <input {...register('appointment_date')} type="date" min={today} />
        </Field>
        <Field label="Preferred time" error={errors.appointment_time?.message}>
          <select {...register('appointment_time')}>
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register('message')} rows="4" placeholder="Tell us about your occasion, skin concerns, or styling preferences." />
      </Field>
      {!isSupabaseConfigured && <p className="config-note">{getSupabaseSetupMessage()}</p>}
      <button className="button button--primary" type="submit" disabled={submitting}>
        <CalendarDays size={18} />
        {submitting ? 'Booking...' : 'Book Appointment'}
        <Send size={16} />
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}
