import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  dark: '#1a3a2a', mid: '#2d6a44', light: '#5a9a6e',
  pale: '#a8d5b5', bg: '#f0f4f0', white: '#ffffff',
  warn: '#f57f17', danger: '#c62828', text: '#1a3a2a',
  muted: '#7a9a7a', border: '#e0e8e0',
}

const card = { background: C.white, borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }
const sectionTitle = { margin: '0 0 18px', fontSize: '13px', color: C.dark, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }
const btn = (bg, color) => ({ background: bg, color, border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif' })

const payBadge = { paid: ['#e8f5e9','#2e7d32','Paid ✓'], deposit: ['#fff9c4','#f57f17','Deposit'], balance: ['#fce4ec','#c62828','Balance Due'] }
const statusBadge = { 'in-house': ['#e8f5e9','#2e7d32','In House'], arriving: ['#e3f2fd','#1565c0','Arriving'], 'checked-out': ['#f5f5f5','#9e9e9e','Checked Out'] }
const enqBadge = { new: ['#e3f2fd','#1565c0','● New'], followup: ['#fff9c4','#f57f17','Follow Up'], quoted: ['#f3e5f5','#6a1b9a','Quoted'], confirmed: ['#e8f5e9','#2e7d32','Confirmed ✓'], lost: ['#f5f5f5','#9e9e9e','Lost'] }

const badge = (bg, color, text) => ({
  display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
  fontSize: '10px', fontFamily: 'sans-serif', background: bg, color, letterSpacing: '0.3px'
})

function Avatar({ name, size = 36, photo }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: photo ? 'transparent' : `linear-gradient(135deg, ${C.pale}, ${C.light})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: size * 0.38, fontWeight: 'bold', overflow: 'hidden' }}>
      {photo ? <img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : name?.charAt(0)}
    </div>
  )
}

const navItems = [
  { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
  { id: 'guests', icon: '◉', label: 'Guests' },
  { id: 'enquiries', icon: '✉', label: 'Enquiries' },
  { id: 'booking', icon: '📋', label: 'Booking Report' },
  { id: 'spa', icon: '◈', label: 'Spa Booking' },
  { id: 'classes', icon: '◇', label: 'Classes' },
  { id: 'colema', icon: '⊕', label: 'Colema' },
  { id: 'dailyorder', icon: '⊜', label: 'Daily Order' },
  { id: 'billing', icon: '◎', label: 'Billing' },
]

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else onLogin()
    setLoading(false)
  }

  return (
    <div style={{ height: '100vh', background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '48px', width: '360px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ color: C.pale, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>Santosa</div>
          <div style={{ fontSize: '24px', color: C.dark }}>Back Office</div>
          <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif', marginTop: '4px' }}>Detox & Wellness Center</div>
        </div>
        {error && <div style={{ background: '#fce4ec', color: '#c62828', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontFamily: 'sans-serif', marginBottom: '16px' }}>{error}</div>}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</div>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com"
            style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</div>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: 'white', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', cursor: 'pointer', fontFamily: 'sans-serif' }}>
          {loading ? 'Logging in...' : 'Login →'}
        </button>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ guests, enquiries, bookings, onNav, onSelectGuest }) {
  const inHouse = bookings.filter(b => b.status === 'in-house')
  const arriving = bookings.filter(b => b.status === 'confirmed')
  const balanceDue = bookings.filter(b => b.payment_status === 'balance')
  const newEnq = enquiries.filter(e => e.status === 'new' || e.status === 'followup')
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '22px', color: C.dark }}>Good morning 🌿</div>
        <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif', marginTop: '3px' }}>{today} • Santosa Detox & Wellness Center</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'In House', value: inHouse.length, sub: 'guests today', bg: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, icon: '◉' },
          { label: 'Arriving Soon', value: arriving.length, sub: 'check-ins pending', bg: 'linear-gradient(135deg,#1565c0,#1976d2)', icon: '→' },
          { label: 'Need Attention', value: newEnq.length, sub: 'enquiries', bg: 'linear-gradient(135deg,#bf360c,#e64a19)', icon: '✉' },
          { label: 'Balance Due', value: balanceDue.length, sub: 'guests', bg: 'linear-gradient(135deg,#b71c1c,#e53935)', icon: '◎' },
        ].map((k, i) => (
          <div key={i} style={{ background: k.bg, borderRadius: '16px', padding: '22px', color: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{k.icon}</div>
            <div style={{ fontSize: '40px', fontWeight: 'bold', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>{k.label}</div>
            <div style={{ fontSize: '11px', opacity: 0.6, fontFamily: 'sans-serif' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={sectionTitle}>Current Guests</h3>
            <button style={btn(C.dark, 'white')} onClick={() => onNav('guests')}>View All</button>
          </div>
          {guests.length === 0 && <div style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No guests yet. Add your first guest!</div>}
          {guests.slice(0, 5).map(g => (
            <div key={g.id} onClick={() => onSelectGuest(g)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: '#fafcfa', border: `1px solid ${C.border}`, marginBottom: '8px', cursor: 'pointer' }}>
              <Avatar name={g.full_name} photo={g.photo_url} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: C.dark, fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.full_name}</div>
                <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>{g.nationality} • {g.email}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={sectionTitle}>Enquiries</h3>
              <button style={btn('#e8f5e9', C.dark)} onClick={() => onNav('enquiries')}>View All</button>
            </div>
            {enquiries.length === 0 && <div style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px' }}>No enquiries yet.</div>}
            {enquiries.slice(0, 4).map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', background: '#fafcfa', border: `1px solid ${C.border}`, marginBottom: '6px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: C.dark, fontWeight: 'bold' }}>{e.full_name}</div>
                  <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif' }}>{e.program_interest} • {e.created_at?.slice(0,10)}</div>
                </div>
                {enqBadge[e.status] && <span style={badge(...enqBadge[e.status])}>{enqBadge[e.status][2]}</span>}
              </div>
            ))}
          </div>

          <div style={{ ...card, background: `linear-gradient(135deg, ${C.dark}, ${C.mid})` }}>
            <div style={{ color: C.pale, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Quick Actions</div>
            {[['+ New Enquiry', 'enquiries'], ['+ New Guest', 'guests'], ['Daily Order', 'dailyorder'], ['Colema Sheet', 'colema']].map(([label, nav]) => (
              <button key={nav} onClick={() => onNav(nav)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', cursor: 'pointer', fontFamily: 'sans-serif', marginBottom: '6px' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── GUESTS ───────────────────────────────────────────────────────────────────
function Guests({ guests, bookings, onSelectGuest, onRefresh }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', nationality: '', age: '', gender: 'Female', goals: '', health_notes: '', source: 'Website' })
  const [saving, setSaving] = useState(false)

  const saveGuest = async () => {
    setSaving(true)
    const { error } = await supabase.from('guests').insert([{ ...form, age: parseInt(form.age) || null }])
    if (!error) { setShowForm(false); onRefresh(); setForm({ full_name: '', email: '', phone: '', nationality: '', age: '', gender: 'Female', goals: '', health_notes: '', source: 'Website' }) }
    setSaving(false)
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: C.dark }}>All Guests</h2>
        <button style={btn(C.dark, 'white')} onClick={() => setShowForm(!showForm)}>+ New Guest</button>
      </div>

      {showForm && (
        <div style={{ ...card, marginBottom: '24px', border: `2px solid ${C.pale}` }}>
          <h3 style={sectionTitle}>New Guest</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '16px' }}>
            {[['full_name','Full Name *'],['email','Email'],['phone','Phone / WhatsApp'],['nationality','Nationality'],['age','Age'],['source','Source']].map(([key, label]) => (
              <div key={key}>
                <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
                <input value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))}
                  style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '13px', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            {[['goals','Goals'],['health_notes','Health Notes']].map(([key, label]) => (
              <div key={key}>
                <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
                <textarea value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))} rows={3}
                  style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '13px', fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btn(C.dark, 'white')} onClick={saveGuest} disabled={saving}>{saving ? 'Saving...' : 'Save Guest'}</button>
            <button style={btn('#e8ede8', C.muted)} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '16px' }}>
        {guests.length === 0 && <div style={{ color: C.muted, fontFamily: 'sans-serif', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>No guests yet. Add your first guest!</div>}
        {guests.map(g => {
          const booking = bookings.find(b => b.guest_id === g.id)
          return (
            <div key={g.id} onClick={() => onSelectGuest(g)} style={{ ...card, cursor: 'pointer', border: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                <Avatar name={g.full_name} photo={g.photo_url} size={48} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', color: C.dark, fontWeight: 'bold' }}>{g.full_name}</div>
                  <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>{g.nationality} • {g.email}</div>
                  {booking && <span style={{ ...badge(...payBadge[booking.payment_status]), marginTop: '4px', display: 'inline-block' }}>{payBadge[booking.payment_status][2]}</span>}
                </div>
              </div>
              {booking && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[['Room', booking.room_number||'—'],['Program', booking.program?.slice(0,12)+'...'],['Check In', booking.check_in]].map(([l,v]) => (
                    <div key={l} style={{ background: '#f8fffe', borderRadius: '6px', padding: '7px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: C.muted, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>{l}</div>
                      <div style={{ fontSize: '11px', color: C.dark, fontWeight: 'bold', marginTop: '2px' }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── GUEST PROFILE ────────────────────────────────────────────────────────────
function GuestProfile({ guest, onBack, onRefresh }) {
  const [tab, setTab] = useState('overview')
  const [booking, setBooking] = useState(null)
  const [colema, setColema] = useState([])
  const [extraBill, setExtraBill] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newAmt, setNewAmt] = useState('')
  const [newCat, setNewCat] = useState('other')
  const [checks, setChecks] = useState({ extra_bill_settled: false, final_bmi_done: false, final_colema_done: false, breaking_fast_done: false, room_checked: false, feedback_collected: false })
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingForm, setBookingForm] = useState({ room_number: '', program: '', program_days: '', check_in: '', check_out: '', total_amount: '', deposit_paid: '', payment_method: 'bank_transfer', transport_included: false, transport_amount: 0 })

  useEffect(() => {
    const load = async () => {
      const { data: b } = await supabase.from('bookings').select('*').eq('guest_id', guest.id).order('created_at', { ascending: false }).limit(1)
      if (b?.[0]) {
        setBooking(b[0])
        const { data: c } = await supabase.from('colema_sessions').select('*').eq('booking_id', b[0].id).order('session_date')
        setColema(c || [])
        const { data: e } = await supabase.from('extra_bill_items').select('*').eq('booking_id', b[0].id).order('created_at')
        setExtraBill(e || [])
        const { data: ch } = await supabase.from('checkout_checklist').select('*').eq('booking_id', b[0].id).limit(1)
        if (ch?.[0]) setChecks(ch[0])
      }
    }
    load()
  }, [guest.id])

  const saveBooking = async () => {
    const { error } = await supabase.from('bookings').insert([{ ...bookingForm, guest_id: guest.id, program_days: parseInt(bookingForm.program_days), total_amount: parseFloat(bookingForm.total_amount), deposit_paid: parseFloat(bookingForm.deposit_paid), transport_amount: parseFloat(bookingForm.transport_amount)||0, payment_status: parseFloat(bookingForm.deposit_paid) >= parseFloat(bookingForm.total_amount) ? 'paid' : 'balance', status: 'confirmed' }])
    if (!error) { setShowBookingForm(false); onRefresh() }
  }

  const addExtraItem = async () => {
    if (!newItem || !newAmt || !booking) return
    const { data } = await supabase.from('extra_bill_items').insert([{ booking_id: booking.id, guest_id: guest.id, item_description: newItem, amount: parseFloat(newAmt), category: newCat }]).select()
    if (data) { setExtraBill(p => [...p, data[0]]); setNewItem(''); setNewAmt('') }
  }

  const toggleCheck = async (key) => {
    const newChecks = { ...checks, [key]: !checks[key] }
    setChecks(newChecks)
    if (booking) {
      const { data: existing } = await supabase.from('checkout_checklist').select('id').eq('booking_id', booking.id).limit(1)
      if (existing?.[0]) await supabase.from('checkout_checklist').update(newChecks).eq('booking_id', booking.id)
      else await supabase.from('checkout_checklist').insert([{ ...newChecks, booking_id: booking.id }])
    }
  }

  const bmi = guest.weight_kg && guest.height_cm ? (guest.weight_kg / ((guest.height_cm / 100) ** 2)).toFixed(1) : null
  const extraTotal = extraBill.reduce((s, i) => s + i.amount, 0)
  const balance = booking ? booking.total_amount - booking.deposit_paid : 0

  return (
    <div style={{ padding: '28px 32px' }}>
      <button onClick={onBack} style={{ ...btn('#f0f4f0', C.dark), marginBottom: '20px' }}>← Back</button>

      <div style={{ ...card, marginBottom: '20px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <Avatar name={guest.full_name} photo={guest.photo_url} size={80} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22px', color: C.dark, marginBottom: '8px' }}>{guest.full_name}</div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[['Email', guest.email], ['Phone', guest.phone], ['Nationality', guest.nationality], ['Age', guest.age], ['BMI', bmi || '—'], ['Source', guest.source]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>{l}</div>
                <div style={{ fontSize: '13px', color: C.dark, fontFamily: 'sans-serif', marginTop: '2px' }}>{v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
        {booking && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>Room {booking.room_number} • {booking.program}</div>
            <div style={{ fontSize: '20px', color: C.dark, fontWeight: 'bold', marginTop: '4px' }}>{booking.total_amount?.toLocaleString()} THB</div>
            <div style={{ fontSize: '12px', color: balance > 0 ? '#c62828' : '#2e7d32', fontFamily: 'sans-serif' }}>
              {balance > 0 ? `Balance: ${balance.toLocaleString()} THB` : 'Fully Paid ✓'}
            </div>
            <span style={{ ...badge(...payBadge[booking.payment_status]), marginTop: '6px', display: 'inline-block' }}>{payBadge[booking.payment_status][2]}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        {['overview', 'booking', 'colema', 'extrabill', 'checkout'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={btn(tab === t ? C.dark : '#e8ede8', tab === t ? 'white' : C.muted)}>
            {t === 'extrabill' ? 'Extra Bill' : t === 'checkout' ? 'Check-out' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={card}>
            <h3 style={sectionTitle}>Personal Info</h3>
            {[['Full Name', guest.full_name], ['Email', guest.email], ['Phone', guest.phone], ['Nationality', guest.nationality], ['Age', guest.age], ['Gender', guest.gender], ['Weight', guest.weight_kg ? `${guest.weight_kg} kg` : '—'], ['Height', guest.height_cm ? `${guest.height_cm} cm` : '—'], ['BMI', bmi || '—']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif' }}>{l}</span>
                <span style={{ fontSize: '12px', color: C.dark, fontFamily: 'sans-serif' }}>{v || '—'}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={card}>
              <h3 style={sectionTitle}>Goals & Health</h3>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Goals</div>
                <div style={{ fontSize: '13px', color: C.dark, fontFamily: 'sans-serif', lineHeight: 1.6 }}>{guest.goals || '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Health Notes</div>
                <div style={{ fontSize: '13px', color: C.dark, fontFamily: 'sans-serif', lineHeight: 1.6 }}>{guest.health_notes || 'No issues reported'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING */}
      {tab === 'booking' && (
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={sectionTitle}>Booking Details</h3>
            <button style={btn(C.dark, 'white')} onClick={() => setShowBookingForm(!showBookingForm)}>+ New Booking</button>
          </div>
          {showBookingForm && (
            <div style={{ background: '#f8fffe', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: `1px solid ${C.pale}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '12px' }}>
                {[['room_number','Room'],['program','Program'],['program_days','Days'],['check_in','Check In (date)'],['check_out','Check Out (date)'],['total_amount','Total (THB)'],['deposit_paid','Deposit (THB)']].map(([k,l]) => (
                  <div key={k}>
                    <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '3px', textTransform: 'uppercase' }}>{l}</div>
                    <input value={bookingForm[k]} onChange={e => setBookingForm(p => ({...p, [k]: e.target.value}))} type={k.includes('date')||k.includes('_in')||k.includes('_out') ? 'date' : 'text'}
                      style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '3px', textTransform: 'uppercase' }}>Payment Method</div>
                  <select value={bookingForm.payment_method} onChange={e => setBookingForm(p => ({...p, payment_method: e.target.value}))}
                    style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontFamily: 'sans-serif', outline: 'none' }}>
                    {['cc','paypal','bank_transfer','alipay','cash'].map(m => <option key={m} value={m}>{m.replace('_',' ').toUpperCase()}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={btn(C.dark, 'white')} onClick={saveBooking}>Save Booking</button>
                <button style={btn('#e8ede8', C.muted)} onClick={() => setShowBookingForm(false)}>Cancel</button>
              </div>
            </div>
          )}
          {!booking ? <div style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px' }}>No booking yet. Create one above.</div> : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[['Room', booking.room_number], ['Program', booking.program], ['Days', booking.program_days], ['Check In', booking.check_in], ['Check Out', booking.check_out], ['Total', `${booking.total_amount?.toLocaleString()} THB`], ['Deposit', `${booking.deposit_paid?.toLocaleString()} THB`], ['Balance', `${balance.toLocaleString()} THB`], ['Payment', booking.payment_method], ['Status', booking.status]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fafcfa', borderRadius: '8px' }}>
                  <span style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif' }}>{l}</span>
                  <span style={{ fontSize: '12px', color: C.dark, fontFamily: 'sans-serif', fontWeight: 'bold' }}>{v || '—'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COLEMA */}
      {tab === 'colema' && (
        <div style={card}>
          <h3 style={sectionTitle}>Colema History — {guest.full_name}</h3>
          {colema.length === 0 ? <div style={{ color: C.muted, fontFamily: 'sans-serif', fontSize: '13px' }}>No sessions recorded yet.</div> : (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#f0f8f2' }}>
                      {['Date','Room','AM In','AM Out','AM Loss','PM In','PM Out','PM Loss','Day Total'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'center', color: C.dark, fontSize: '11px', borderBottom: `2px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {colema.map((s, i) => {
                      const amL = s.am_weight_in && s.am_weight_out ? (s.am_weight_in - s.am_weight_out).toFixed(1) : null
                      const pmL = s.pm_weight_in && s.pm_weight_out ? (s.pm_weight_in - s.pm_weight_out).toFixed(1) : null
                      const total = (parseFloat(amL)||0) + (parseFloat(pmL)||0)
                      return (
                        <tr key={i} style={{ background: i%2===0 ? 'white' : '#fafcfa', borderBottom: `1px solid ${C.border}` }}>
                          {[s.session_date, s.colema_room, s.am_weight_in||'—', s.am_weight_out||'—', amL ? `-${amL}kg` : '—', s.pm_weight_in||'—', s.pm_weight_out||'—', pmL ? `-${pmL}kg` : 'Pending', total > 0 ? `-${total.toFixed(1)}kg` : '—'].map((v,j) => (
                            <td key={j} style={{ padding: '10px 12px', textAlign: 'center', color: [4,7,8].includes(j) ? '#c62828' : C.dark, fontWeight: j===8 ? 'bold' : 'normal' }}>{v}</td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {colema.length > 0 && (
                <div style={{ marginTop: '16px', padding: '12px 16px', background: '#f0f8f2', borderRadius: '10px', display: 'flex', gap: '24px' }}>
                  <div><span style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>Start: </span><strong>{colema[0]?.am_weight_in} kg</strong></div>
                  <div><span style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>Current: </span><strong>{colema[colema.length-1]?.am_weight_in} kg</strong></div>
                  {colema[0]?.am_weight_in && colema[colema.length-1]?.am_weight_in && (
                    <div><span style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>Total Loss: </span><strong style={{ color: '#c62828' }}>-{(colema[0].am_weight_in - colema[colema.length-1].am_weight_in).toFixed(1)} kg</strong></div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* EXTRA BILL */}
      {tab === 'extrabill' && (
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={sectionTitle}>Extra Bill — {guest.full_name} {booking ? `— Room ${booking.room_number}` : ''}</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            <thead>
              <tr style={{ background: '#f0f8f2' }}>
                {['#','Item','Category','Amount (THB)',''].map((h,i) => (
                  <th key={i} style={{ padding: '10px 14px', textAlign: i===3?'right':'left', fontSize: '11px', color: C.dark, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {extraBill.map((it, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: '12px 14px', color: C.muted, fontSize: '12px' }}>{i+1}</td>
                  <td style={{ padding: '12px 14px', color: C.dark, fontSize: '13px' }}>{it.item_description}</td>
                  <td style={{ padding: '12px 14px' }}><span style={{ background: '#f0f8f2', color: C.dark, padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontFamily: 'sans-serif' }}>{it.category}</span></td>
                  <td style={{ padding: '12px 14px', color: C.dark, fontSize: '13px', textAlign: 'right', fontWeight: 'bold' }}>{it.amount?.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <button onClick={async () => { await supabase.from('extra_bill_items').delete().eq('id', it.id); setExtraBill(p => p.filter(x => x.id !== it.id)) }} style={{ background: 'none', border: 'none', color: '#c62828', cursor: 'pointer', fontSize: '13px' }}>✕</button>
                  </td>
                </tr>
              ))}
              <tr style={{ background: '#fafcfa' }}>
                <td style={{ padding: '8px 14px', color: C.muted, fontSize: '12px' }}>+</td>
                <td style={{ padding: '6px 14px' }}>
                  <input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Item description..."
                    style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', width: '100%', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                </td>
                <td style={{ padding: '6px 14px' }}>
                  <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontFamily: 'sans-serif', outline: 'none', width: '100%' }}>
                    {['restaurant','spa','transport','laundry','other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </td>
                <td style={{ padding: '6px 14px' }}>
                  <input value={newAmt} onChange={e => setNewAmt(e.target.value)} placeholder="0" type="number"
                    style={{ border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', width: '100%', fontFamily: 'sans-serif', textAlign: 'right', outline: 'none', boxSizing: 'border-box' }} />
                </td>
                <td style={{ padding: '6px 14px', textAlign: 'right' }}>
                  <button onClick={addExtraItem} style={btn(C.dark, 'white')}>Add</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ background: C.dark }}>
                <td colSpan={3} style={{ padding: '14px 16px', color: 'white', fontSize: '14px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>TOTAL</td>
                <td style={{ padding: '14px 16px', color: 'white', fontSize: '18px', fontWeight: 'bold', textAlign: 'right', fontFamily: 'sans-serif' }}>{extraTotal.toLocaleString()} THB</td>
                <td />
              </tr>
            </tfoot>
          </table>
          <div style={{ marginTop: '20px', padding: '20px', background: '#fafcfa', border: `1px solid ${C.border}`, borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '8px' }}>Guest Signature</div>
              <div style={{ width: '200px', height: '40px', borderBottom: `2px solid ${C.dark}` }} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '8px' }}>Date</div>
              <div style={{ width: '140px', height: '40px', borderBottom: `2px solid ${C.dark}` }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>Total to pay</div>
              <div style={{ fontSize: '28px', color: C.dark, fontWeight: 'bold' }}>{extraTotal.toLocaleString()} THB</div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {tab === 'checkout' && (
        <div style={card}>
          <h3 style={sectionTitle}>Check-out Checklist — {guest.full_name}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[['extra_bill_settled','Extra Bill settled & signed by guest'],['final_bmi_done','Final BMI measured (Wellness Manager)'],['final_colema_done','Final Colema completed'],['breaking_fast_done','Breaking the fast done (Wellness Manager)'],['room_checked','Room checked by reception'],['feedback_collected','Feedback / review requested']].map(([key, label]) => (
              <div key={key} onClick={() => toggleCheck(key)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '10px', background: checks[key] ? '#e8f5e9' : '#fafcfa', border: `1px solid ${checks[key] ? '#c8e6c9' : C.border}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: 24, height: 24, borderRadius: '6px', background: checks[key] ? '#2e7d32' : 'white', border: `2px solid ${checks[key] ? '#2e7d32' : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {checks[key] && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                </div>
                <span style={{ fontSize: '14px', color: checks[key] ? '#2e7d32' : C.dark, fontFamily: 'sans-serif' }}>{label}</span>
              </div>
            ))}
          </div>
          {Object.values(checks).filter(Boolean).length === 6 ? (
            <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
              <div style={{ fontSize: '16px', color: '#2e7d32', fontFamily: 'sans-serif', fontWeight: 'bold' }}>Check-out Complete!</div>
            </div>
          ) : (
            <div style={{ padding: '12px 16px', background: '#fff9c4', borderRadius: '10px', fontSize: '12px', color: '#f57f17', fontFamily: 'sans-serif' }}>
              ⚠ {Object.values(checks).filter(Boolean).length}/6 steps completed
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── ENQUIRIES ────────────────────────────────────────────────────────────────
function Enquiries({ enquiries, onRefresh }) {
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [templateType, setTemplateType] = useState('General')
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', program_interest: '', notes: '', source: 'Website' })

  const templates = {
    'Full Fast': `Dear [NAME],\n\nGreetings from Santosa Detox and Wellness Center.\nThanks for your inquiry. My name is Sherryl, nice to meet you here.\n\nThe full fasting program follows a strict diet – 4 rounds of cleansing drinks and detox supplements. Colon cleansing (colema) is performed twice daily. A daily massage, herbal sauna and ice bath are included.\n\nIf the above is agreeable, I will send the official quotation and payment process.\n\nBest Regards,\nSherryl`,
    'Juice Fast': `Dear [NAME],\n\nGreetings from Santosa Detox and Wellness Center.\nThanks for your inquiry. My name is Sherryl, nice to meet you here.\n\nThe juice fasting program includes 5 freshly made juices daily plus 3 rounds of cleansing drinks. Colema twice daily, daily massage, herbal sauna and ice bath included.\n\nBest Regards,\nSherryl`,
    'Yoga Retreat': `Dear [NAME],\n\nGreetings from Santosa Detox and Wellness Center.\nThanks for your inquiry. My name is Sherryl, nice to meet you here.\n\nSantosa Yoga Retreat is tailor-made with a private Yoga Instructor. 3 healthy vegan meals daily, daily massage, and unlimited pool/gym/sauna access.\n\nBest Regards,\nSherryl`,
    'General': `Dear [NAME],\n\nGreetings from Santosa Detox and Wellness Center. My name is Sherryl.\n\nTo recommend the best program, please share:\n- Age?\n- Previous fasting experience?\n- Health issues?\n- Goals for this retreat?\n\nWe offer programs from 3 to 21 days. Feel free to WhatsApp: +66 95 420 8589.\n\nAll the best,\nSherryl`,
  }

  const saveEnquiry = async () => {
    const { error } = await supabase.from('enquiries').insert([{ ...form, status: 'new' }])
    if (!error) { setShowForm(false); onRefresh(); setForm({ full_name: '', email: '', phone: '', program_interest: '', notes: '', source: 'Website' }) }
  }

  const updateStatus = async (id, status) => {
    await supabase.from('enquiries').update({ status, last_contact_at: new Date().toISOString() }).eq('id', id)
    onRefresh()
    if (selected?.id === id) setSelected(p => ({ ...p, status }))
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: C.dark }}>Enquiries Pipeline</h2>
        <button style={btn(C.dark, 'white')} onClick={() => setShowForm(!showForm)}>+ New Enquiry</button>
      </div>

      {showForm && (
        <div style={{ ...card, marginBottom: '20px', border: `2px solid ${C.pale}` }}>
          <h3 style={sectionTitle}>New Enquiry</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '12px' }}>
            {[['full_name','Full Name *'],['email','Email'],['phone','Phone'],['program_interest','Program Interest'],['source','Source']].map(([k,l]) => (
              <div key={k}>
                <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '3px', textTransform: 'uppercase' }}>{l}</div>
                <input value={form[k]} onChange={e => setForm(p => ({...p, [k]: e.target.value}))}
                  style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '3px', textTransform: 'uppercase' }}>Notes</div>
            <textarea value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} rows={3}
              style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={btn(C.dark, 'white')} onClick={saveEnquiry}>Save Enquiry</button>
            <button style={btn('#e8ede8', C.muted)} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {enquiries.length === 0 && <div style={{ color: C.muted, fontFamily: 'sans-serif', textAlign: 'center', padding: '40px' }}>No enquiries yet.</div>}
          {enquiries.map(e => (
            <div key={e.id} onClick={() => setSelected(e)} style={{ ...card, padding: '16px 20px', cursor: 'pointer', border: `1px solid ${selected?.id === e.id ? C.light : C.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar name={e.full_name} size={32} />
                  <div>
                    <div style={{ fontSize: '14px', color: C.dark, fontWeight: 'bold' }}>{e.full_name}</div>
                    <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>{e.email} • {e.created_at?.slice(0,10)}</div>
                  </div>
                </div>
                {enqBadge[e.status] && <span style={badge(...enqBadge[e.status])}>{enqBadge[e.status][2]}</span>}
              </div>
              <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif' }}>{e.program_interest}</div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '18px', color: C.dark }}>{selected.full_name}</div>
                  <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif' }}>{selected.email} • {selected.program_interest}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: '18px' }}>✕</button>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {['new','followup','quoted','confirmed','lost'].map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} style={btn(selected.status === s ? C.dark : '#e8ede8', selected.status === s ? 'white' : C.muted)}>
                    {enqBadge[s]?.[2] || s}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '13px', color: C.dark, fontFamily: 'sans-serif', lineHeight: 1.7, marginBottom: '14px' }}>{selected.notes}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowTemplate(!showTemplate)} style={btn(C.dark, 'white')}>✉ Email Template</button>
              </div>
            </div>
            {showTemplate && (
              <div style={card}>
                <h3 style={sectionTitle}>Email Template</h3>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  {Object.keys(templates).map(t => (
                    <button key={t} onClick={() => setTemplateType(t)} style={btn(templateType === t ? C.dark : '#e8ede8', templateType === t ? 'white' : C.muted)}>{t}</button>
                  ))}
                </div>
                <textarea defaultValue={templates[templateType].replace(/\[NAME\]/g, selected.full_name)}
                  style={{ width: '100%', height: '240px', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px', fontSize: '12px', fontFamily: 'sans-serif', lineHeight: 1.7, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                <button style={{ ...btn(C.dark, 'white'), marginTop: '10px' }}>📋 Copy</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── BOOKING REPORT ───────────────────────────────────────────────────────────
function BookingReport({ bookings, guests, onSelectGuest }) {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.payment_status === filter)

  const getGuest = (id) => guests.find(g => g.id === id)

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: C.dark }}>Booking Report</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all','paid','deposit','balance'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={btn(filter===f ? C.dark : '#e8ede8', filter===f ? 'white' : C.muted)}>
              {f === 'all' ? 'All' : payBadge[f]?.[2] || f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif' }}>
          <thead>
            <tr style={{ background: C.dark }}>
              {['Guest','Room','Program','Check In','Check Out','Total','Deposit','Balance','Status'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: 'white', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: C.muted, fontFamily: 'sans-serif' }}>No bookings found.</td></tr>
            )}
            {filtered.map((b, i) => {
              const g = getGuest(b.guest_id)
              const balance = b.total_amount - b.deposit_paid
              return (
                <tr key={b.id} onClick={() => g && onSelectGuest(g)} style={{ background: i%2===0 ? 'white' : '#fafcfa', cursor: 'pointer', borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar name={g?.full_name} size={28} />
                      <span style={{ fontSize: '13px', color: C.dark, fontWeight: 'bold' }}>{g?.full_name || '—'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: C.muted }}>{b.room_number}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: C.dark, maxWidth: '160px' }}>{b.program}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: C.dark }}>{b.check_in}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: C.dark }}>{b.check_out}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 'bold', textAlign: 'right' }}>{b.total_amount?.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#2e7d32', textAlign: 'right' }}>{b.deposit_paid?.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: balance>0?'#c62828':'#2e7d32', fontWeight: 'bold', textAlign: 'right' }}>{balance>0 ? balance.toLocaleString() : '—'}</td>
                  <td style={{ padding: '12px 14px' }}>{payBadge[b.payment_status] && <span style={badge(...payBadge[b.payment_status])}>{payBadge[b.payment_status][2]}</span>}</td>
                </tr>
              )
            })}
          </tbody>
          {filtered.length > 0 && (
            <tfoot>
              <tr style={{ background: '#f0f8f2', borderTop: `2px solid ${C.border}` }}>
                <td colSpan={5} style={{ padding: '12px 14px', fontSize: '13px', color: C.dark, fontWeight: 'bold', fontFamily: 'sans-serif' }}>TOTALS ({filtered.length} bookings)</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: C.dark, fontWeight: 'bold', textAlign: 'right', fontFamily: 'sans-serif' }}>{filtered.reduce((s,b)=>s+b.total_amount,0).toLocaleString()}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#2e7d32', fontWeight: 'bold', textAlign: 'right', fontFamily: 'sans-serif' }}>{filtered.reduce((s,b)=>s+b.deposit_paid,0).toLocaleString()}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#c62828', fontWeight: 'bold', textAlign: 'right', fontFamily: 'sans-serif' }}>{filtered.reduce((s,b)=>s+(b.total_amount-b.deposit_paid),0).toLocaleString()}</td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

// ─── COLEMA MODULE ────────────────────────────────────────────────────────────
function Colema({ guests, bookings }) {
  const [sessions, setSessions] = useState({})
  const today = new Date().toISOString().slice(0,10)
  const detoxBookings = bookings.filter(b => b.status === 'in-house' && b.program?.toLowerCase().includes('fast'))

  const update = (room, field, value) => setSessions(p => ({ ...p, [`${room}-${field}`]: value }))

  const saveSession = async (room, guestId, bookingId) => {
    const s = sessions
    await supabase.from('colema_sessions').upsert([{
      session_date: today, colema_room: room, guest_id: guestId, booking_id: bookingId,
      am_weight_in: parseFloat(s[`${room}-am-in`])||null, am_weight_out: parseFloat(s[`${room}-am-out`])||null,
      pm_weight_in: parseFloat(s[`${room}-pm-in`])||null, pm_weight_out: parseFloat(s[`${room}-pm-out`])||null,
    }], { onConflict: 'session_date,colema_room' })
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', color: C.dark }}>Colema Monitoring</h2>
          <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif', marginTop: '3px' }}>{today} • 8 rooms</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
        {Array.from({length:8},(_,i)=>i+1).map(room => {
          const booking = detoxBookings[room-1]
          const guest = guests.find(g => g.id === booking?.guest_id)
          const amLoss = sessions[`${room}-am-in`] && sessions[`${room}-am-out`] ? (parseFloat(sessions[`${room}-am-in`]) - parseFloat(sessions[`${room}-am-out`])).toFixed(1) : null
          const pmLoss = sessions[`${room}-pm-in`] && sessions[`${room}-pm-out`] ? (parseFloat(sessions[`${room}-pm-in`]) - parseFloat(sessions[`${room}-pm-out`])).toFixed(1) : null

          return (
            <div key={room} style={{ ...card, border: guest ? `1px solid ${C.border}` : '1px dashed #ddd' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: guest ? C.dark : '#e0e0e0', color: 'white', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Room {room}</div>
                {guest ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar name={guest.full_name} size={28} />
                    <div>
                      <div style={{ fontSize: '13px', color: C.dark, fontWeight: 'bold' }}>{guest.full_name}</div>
                      <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>{booking?.program}</div>
                    </div>
                  </div>
                ) : <div style={{ fontSize: '12px', color: '#bbb', fontFamily: 'sans-serif' }}>— Available —</div>}
              </div>
              {guest && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                    {[['AM Session','am',amLoss],['PM Session','pm',pmLoss]].map(([label,prefix,loss]) => (
                      <div key={prefix} style={{ background: '#f8fffe', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          {['in','out'].map(dir => (
                            <div key={dir}>
                              <div style={{ fontSize: '10px', color: C.muted, fontFamily: 'sans-serif', marginBottom: '3px' }}>{dir.toUpperCase()} kg</div>
                              <input value={sessions[`${room}-${prefix}-${dir}`]||''} onChange={e => update(room, `${prefix}-${dir}`, e.target.value)} type="number"
                                style={{ width: '100%', border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 8px', fontSize: '13px', fontFamily: 'sans-serif', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                          ))}
                        </div>
                        {loss && <div style={{ marginTop: '6px', padding: '4px 8px', background: '#e8f5e9', borderRadius: '6px', fontSize: '11px', color: '#2e7d32', fontFamily: 'sans-serif', textAlign: 'center' }}>Loss: -{loss} kg</div>}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => saveSession(room, guest.id, booking.id)} style={{ ...btn(C.dark, 'white'), width: '100%' }}>💾 Save</button>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── DAILY ORDER ─────────────────────────────────────────────────────────────
function DailyOrder({ bookings, guests }) {
  const inHouse = bookings.filter(b => b.status === 'in-house')
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  const getItems = (program) => {
    const p = (program||'').toLowerCase()
    if (p.includes('full fast')) return { ginger:1,coconut:2,skinRej:1,rootGround:1,veggiePower:0,lunch:0,bloodSugar:1,byeBye:1,liverCleanse:1,broth:1,dinner:0 }
    if (p.includes('juice fast')) return { ginger:1,coconut:2,skinRej:1,rootGround:1,veggiePower:1,lunch:0,bloodSugar:1,byeBye:1,liverCleanse:1,broth:1,dinner:0 }
    if (p.includes('raw fast')) return { ginger:1,coconut:1,skinRej:0,rootGround:0,veggiePower:0,lunch:1,bloodSugar:0,byeBye:0,liverCleanse:1,broth:0,dinner:1 }
    return { ginger:1,coconut:0,skinRej:0,rootGround:0,veggiePower:0,lunch:1,bloodSugar:0,byeBye:0,liverCleanse:0,broth:0,dinner:1 }
  }

  const cols = [
    {key:'ginger',label:'Ginger',time:'8:30am'},
    {key:'coconut',label:'Coconut',time:'8:30am'},
    {key:'skinRej',label:'Skin Rejuv.',time:'8:30am'},
    {key:'rootGround',label:'Root Ground',time:'11am'},
    {key:'veggiePower',label:'Veggie Power',time:'11am'},
    {key:'lunch',label:'Lunch',time:'12-14',green:true},
    {key:'bloodSugar',label:'Blood Sugar',time:'14pm'},
    {key:'byeBye',label:'Bye Bye Bloat',time:'14pm'},
    {key:'liverCleanse',label:'Liver Cleanse',time:'17:00',red:true},
    {key:'broth',label:'Broth',time:'16:00'},
    {key:'dinner',label:'Dinner',time:'18-20',green:true},
  ]

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', color: C.dark }}>Daily Order — Restaurant</h2>
          <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif', marginTop: '3px' }}>{today} • Ordered by: Sherryl</div>
        </div>
        <button style={btn(C.dark, 'white')}>🖨 Print for Kitchen</button>
      </div>
      <div style={{ ...card, overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `50px 150px 60px 160px ${cols.map(()=>'80px').join(' ')}`, gap: '4px', minWidth: '1300px' }}>
          <div style={{ padding: '10px', background: '#ffff00', borderRadius: '6px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold' }}>No.</div>
          <div style={{ padding: '10px', background: '#ffff00', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Name</div>
          <div style={{ padding: '10px', background: '#ffff00', borderRadius: '6px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold' }}>Days</div>
          <div style={{ padding: '10px', background: '#ffff00', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Program</div>
          {cols.map(c => (
            <div key={c.key} style={{ padding: '8px 4px', background: c.green?'#c8e6c9':c.red?'#ffcdd2':'#e3f2fd', borderRadius: '6px', textAlign: 'center', fontSize: '10px', fontFamily: 'sans-serif', lineHeight: 1.3 }}>
              <div style={{ fontWeight: 'bold' }}>{c.label}</div>
              <div style={{ fontSize: '9px', opacity: 0.7 }}>{c.time}</div>
            </div>
          ))}
          {inHouse.length === 0 && (
            <div style={{ gridColumn: '1/-1', padding: '40px', textAlign: 'center', color: C.muted, fontFamily: 'sans-serif' }}>No guests in house today.</div>
          )}
          {inHouse.map((b, i) => {
            const g = guests.find(x => x.id === b.guest_id)
            const items = getItems(b.program)
            return [
              <div key={`n-${b.id}`} style={{ padding: '10px', background: '#fafcfa', borderRadius: '6px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold', color: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i+1}</div>,
              <div key={`nm-${b.id}`} style={{ padding: '10px', background: '#fafcfa', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', color: C.dark, display: 'flex', alignItems: 'center' }}>{g?.full_name?.split(' ')[0]||'—'}</div>,
              <div key={`d-${b.id}`} style={{ padding: '10px', background: '#fafcfa', borderRadius: '6px', textAlign: 'center', fontSize: '12px', color: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>{b.program_days||'—'}</div>,
              <div key={`p-${b.id}`} style={{ padding: '8px 10px', background: '#fafcfa', borderRadius: '6px', fontSize: '11px', color: C.dark, display: 'flex', alignItems: 'center', fontFamily: 'sans-serif' }}>{b.program}</div>,
              ...cols.map(c => (
                <div key={`${b.id}-${c.key}`} style={{ padding: '8px', background: items[c.key]?(c.green?'#e8f5e9':c.red?'#ffebee':'#e3f2fd'):'#f9f9f9', borderRadius: '6px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: items[c.key]?(c.red?'#c62828':C.dark):'#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {items[c.key]||'—'}
                </div>
              ))
            ]
          })}
        </div>
      </div>
    </div>
  )
}

// ─── BILLING ─────────────────────────────────────────────────────────────────
function Billing({ bookings, guests, onSelectGuest }) {
  const totalRevenue = bookings.reduce((s,b)=>s+b.deposit_paid,0)
  const totalOutstanding = bookings.reduce((s,b)=>s+(b.total_amount-b.deposit_paid),0)
  const fullyPaid = bookings.filter(b=>b.payment_status==='paid').length

  return (
    <div style={{ padding: '28px 32px' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '20px', color: C.dark }}>Billing Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Collected', value: `${totalRevenue.toLocaleString()} THB`, color: C.dark },
          { label: 'Outstanding', value: `${totalOutstanding.toLocaleString()} THB`, color: '#c62828' },
          { label: 'Fully Paid', value: `${fullyPaid} guests`, color: '#2e7d32' },
        ].map((k,i) => (
          <div key={i} style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{k.label}</div>
            <div style={{ fontSize: '26px', color: k.color, fontWeight: 'bold' }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bookings.length === 0 && <div style={{ color: C.muted, fontFamily: 'sans-serif', textAlign: 'center', padding: '40px' }}>No bookings yet.</div>}
        {bookings.map(b => {
          const g = guests.find(x => x.id === b.guest_id)
          const balance = b.total_amount - b.deposit_paid
          return (
            <div key={b.id} onClick={() => g && onSelectGuest(g)} style={{ ...card, display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', padding: '16px 20px' }}>
              <Avatar name={g?.full_name} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: C.dark, fontWeight: 'bold' }}>{g?.full_name||'—'}</div>
                <div style={{ fontSize: '11px', color: C.muted, fontFamily: 'sans-serif' }}>Room {b.room_number} • {b.program}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: C.muted, fontFamily: 'sans-serif' }}>Total: {b.total_amount?.toLocaleString()} THB</div>
                <div style={{ fontSize: '12px', color: '#2e7d32', fontFamily: 'sans-serif' }}>Paid: {b.deposit_paid?.toLocaleString()} THB</div>
                <div style={{ fontSize: '13px', color: balance>0?'#c62828':'#2e7d32', fontWeight: 'bold' }}>
                  {balance>0 ? `Due: ${balance.toLocaleString()} THB` : '✓ Settled'}
                </div>
              </div>
              {payBadge[b.payment_status] && <span style={badge(...payBadge[b.payment_status])}>{payBadge[b.payment_status][2]}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [guests, setGuests] = useState([])
  const [bookings, setBookings] = useState([])
  const [enquiries, setEnquiries] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false) })
    supabase.auth.onAuthStateChange((_event, session) => setSession(session))
  }, [])

  const loadData = async () => {
    const [{ data: g }, { data: b }, { data: e }] = await Promise.all([
      supabase.from('guests').select('*').order('created_at', { ascending: false }),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('enquiries').select('*').order('created_at', { ascending: false }),
    ])
    setGuests(g || [])
    setBookings(b || [])
    setEnquiries(e || [])
  }

  useEffect(() => { if (session) loadData() }, [session])

  const handleSelectGuest = (g) => { setSelectedGuest(g); setActiveNav('guestprofile') }
  const handleBack = () => { setSelectedGuest(null); setActiveNav('guests') }

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, color: C.dark, fontSize: '18px' }}>Loading...</div>
  if (!session) return <Login onLogin={() => supabase.auth.getSession().then(({ data: { session } }) => setSession(session))} />

  const renderContent = () => {
    if (activeNav === 'guestprofile' && selectedGuest) return <GuestProfile guest={selectedGuest} onBack={handleBack} onRefresh={loadData} />
    switch(activeNav) {
      case 'dashboard': return <Dashboard guests={guests} enquiries={enquiries} bookings={bookings} onNav={setActiveNav} onSelectGuest={handleSelectGuest} />
      case 'guests': return <Guests guests={guests} bookings={bookings} onSelectGuest={handleSelectGuest} onRefresh={loadData} />
      case 'enquiries': return <Enquiries enquiries={enquiries} onRefresh={loadData} />
      case 'booking': return <BookingReport bookings={bookings} guests={guests} onSelectGuest={handleSelectGuest} />
      case 'spa': return <div style={{padding:'28px 32px'}}><h2 style={{color:C.dark}}>Spa Booking — coming soon</h2></div>
      case 'classes': return <div style={{padding:'28px 32px'}}><h2 style={{color:C.dark}}>Classes — coming soon</h2></div>
      case 'colema': return <Colema guests={guests} bookings={bookings} />
      case 'dailyorder': return <DailyOrder bookings={bookings} guests={guests} />
      case 'billing': return <Billing bookings={bookings} guests={guests} onSelectGuest={handleSelectGuest} />
      default: return null
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: C.bg, fontFamily: 'Georgia, serif', overflow: 'hidden' }}>
      <div style={{ width: '220px', minWidth: '220px', background: 'linear-gradient(180deg,#1a3a2a 0%,#0f2419 100%)', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 20px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ color: C.pale, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>Santosa</div>
          <div style={{ color: 'white', fontSize: '16px', letterSpacing: '1px' }}>Back Office</div>
          <div style={{ color: '#5a9a6e', fontSize: '10px', marginTop: '4px' }}>Detox & Wellness Center</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 24px', border: 'none', cursor: 'pointer', textAlign: 'left', background: activeNav === item.id ? 'rgba(168,213,181,0.15)' : 'transparent', borderLeft: activeNav === item.id ? '3px solid #a8d5b5' : '3px solid transparent', color: activeNav === item.id ? '#a8d5b5' : 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '0.5px', transition: 'all 0.2s' }}>
              <span style={{ fontSize: '15px' }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {[{l:'In House',v:bookings.filter(b=>b.status==='in-house').length,c:'#a8d5b5'},{l:'Arriving',v:bookings.filter(b=>b.status==='confirmed').length,c:'#90caf9'},{l:'Balance Due',v:bookings.filter(b=>b.payment_status==='balance').length,c:'#ef9a9a'}].map((s,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif' }}>{s.l}</span>
              <span style={{ fontSize: '11px', color: s.c, fontWeight: 'bold', fontFamily: 'sans-serif' }}>{s.v}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 24px' }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '1px', fontFamily: 'sans-serif' }}>LOGGED IN AS</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '4px', fontFamily: 'sans-serif' }}>{session.user.email}</div>
          <button onClick={() => supabase.auth.signOut()} style={{ marginTop: '8px', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', fontFamily: 'sans-serif' }}>Logout</button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: 'white', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ fontSize: '14px', color: C.dark }}>{navItems.find(n=>n.id===activeNav)?.label || selectedGuest?.full_name || ''}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ background: '#e3f2fd', color: '#1565c0', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontFamily: 'sans-serif' }}>{new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontFamily: 'sans-serif' }}>{bookings.filter(b=>b.status==='in-house').length} in house</div>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  )
}
