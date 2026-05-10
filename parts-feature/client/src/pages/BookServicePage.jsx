import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import axios from 'axios'

const serviceTypes = [
  { key: 'General', label: 'General Service' },
  { key: 'Engine', label: 'Engine Work' },
  { key: 'Brakes', label: 'Brake Service' },
  { key: 'Full', label: 'Full Service' },
]

const bikes = ['Honda Activa', 'Hero Splendor', 'Royal Enfield', 'Bajaj Pulsar', 'TVS Jupiter']

const BookServicePage = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    customerName: '', phone: '', bikeModel: '', serviceType: '', preferredDate: '', notes: ''
  })

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.customerName.trim()) e.customerName = 'Name is required'
    if (!form.phone.match(/^\d{10}$/)) e.phone = 'Enter valid 10-digit phone'
    if (!form.bikeModel) e.bikeModel = 'Select a bike model'
    if (!form.serviceType) e.serviceType = 'Select a service type'
    if (!form.preferredDate) e.preferredDate = 'Select a date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await axios.post('/api/bookings', form)
      setSubmitted(true)
      addToast('Service booked successfully', 'success')
    } catch {
      addToast('Failed to book service. Please try again.', 'error')
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <div className="booking-success">
          <h2>Service Booked</h2>
          <p>We will confirm your appointment for {form.preferredDate} shortly.</p>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Parts</button>
            <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setForm({ customerName: '', phone: '', bikeModel: '', serviceType: '', preferredDate: '', notes: '' }) }}>
              Book Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Book a Service</h1>
        <p>Schedule your bike service with our expert mechanics</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input value={form.customerName} onChange={e => update('customerName', e.target.value)} placeholder="Enter your full name" />
          {errors.customerName && <div className="form-error">{errors.customerName}</div>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="10-digit phone number" />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Bike Model</label>
          <select value={form.bikeModel} onChange={e => update('bikeModel', e.target.value)}>
            <option value="">Select bike model</option>
            {bikes.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.bikeModel && <div className="form-error">{errors.bikeModel}</div>}
        </div>

        <div className="form-group">
          <label>Service Type</label>
          <div className="service-type-cards">
            {serviceTypes.map(s => (
              <div key={s.key}
                className={`service-type-card ${form.serviceType === s.key ? 'service-type-card--active' : ''}`}
                onClick={() => update('serviceType', s.key)}>
                <div className="service-type-card__name">{s.label}</div>
              </div>
            ))}
          </div>
          {errors.serviceType && <div className="form-error">{errors.serviceType}</div>}
        </div>

        <div className="form-group">
          <label>Preferred Date</label>
          <input type="date" value={form.preferredDate} onChange={e => update('preferredDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]} />
          {errors.preferredDate && <div className="form-error">{errors.preferredDate}</div>}
        </div>

        <div className="form-group">
          <label>Additional Notes (optional)</label>
          <textarea value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Describe any specific issues..." />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }}>
          Book Service
        </button>
      </form>
    </div>
  )
}

export default BookServicePage
