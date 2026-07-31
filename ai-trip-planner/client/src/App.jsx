import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [view, setView] = useState('login'); // 'login', 'register', 'create', 'itinerary', 'history'
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  
  const [formData, setFormData] = useState({ destination: '', days: '', budget: '', travelWith: '' });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [savedTrips, setSavedTrips] = useState([]);

  const budgets = [
    { title: 'Cheap', desc: 'Stay conscious of costs', icon: '💵' },
    { title: 'Moderate', desc: 'Keep cost on the average side', icon: '💰' },
    { title: 'Luxury', desc: 'Dont worry about cost', icon: '💸' }
  ];

  const travelPartners = [
    { title: 'Just Me', desc: 'A sole traveler in exploration', icon: '✈️' },
    { title: 'A Couple', desc: 'Two travelers in tandem', icon: '🥂' },
    { title: 'Family', desc: 'A group of fun loving adventure', icon: '🏡' },
    { title: 'Friends', desc: 'A bunch of thrill-seekers', icon: '⛵' }
  ];

  const handleAuth = async (e, endpoint) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, authForm);
      if (endpoint === 'login') {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setView('create');
      } else {
        alert('Registration successful! Please log in.');
        setView('login');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Authentication failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setView('login');
  };

  const fetchSavedTrips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trips', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedTrips(response.data.trips);
      setView('history');
    } catch (err) {
      setErrorMsg('Failed to load history.');
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      // Ensure days is sent as a proper integer number
      const payload = {
        ...formData,
        days: parseInt(formData.days, 10)
      };

      const response = await axios.post('http://localhost:5000/api/generate-trip', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItinerary(response.data.trip.itinerary);
      setView('itinerary');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrorMsg(err.response.data.errors.map(e => e.msg).join(', '));
      } else {
        setErrorMsg(err.response?.data?.error || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-6 max-w-md mx-auto flex flex-col justify-center font-sans">
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          {view === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
        </h1>
        {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">{errorMsg}</div>}
        <form onSubmit={(e) => handleAuth(e, view)} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full border p-3 rounded-xl"
            value={authForm.email}
            onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border p-3 rounded-xl"
            value={authForm.password}
            onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
            required
          />
          <button type="submit" className="w-full bg-black text-white p-4 rounded-xl font-bold">
            {view === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <button 
          onClick={() => setView(view === 'login' ? 'register' : 'login')} 
          className="mt-4 text-sm text-gray-500 text-center hover:underline"
        >
          {view === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 max-w-xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 font-black text-xl tracking-tight">
          <span className="bg-red-500 text-white p-1.5 rounded-lg text-sm">🔥</span>
          <span>Logoipsum</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setView('create')} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${view === 'create' ? 'bg-gray-100' : ''}`}>+ Create</button>
          <button onClick={fetchSavedTrips} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${view === 'history' ? 'bg-gray-100' : ''}`}>My Trips</button>
          <button onClick={handleLogout} className="px-3 py-1.5 rounded-full text-sm font-semibold text-red-500 hover:bg-red-50">Logout</button>
        </div>
      </div>

      {view === 'create' && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Tell us your travel preferences 🏕️🌴</h1>
          <div className="space-y-2">
            <label className="block font-semibold text-lg">What is destination of choice?</label>
            <input 
              type="text"
              className="w-full border border-gray-300 p-3 rounded-xl"
              placeholder="Select destination..."
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block font-semibold text-lg">How many days are you planning your trip?</label>
            <input 
              type="number"
              className="w-full border border-gray-300 p-3 rounded-xl"
              placeholder="Ex. 3"
              value={formData.days}
              onChange={(e) => setFormData({...formData, days: e.target.value})}
              required
            />
          </div>
          <div className="space-y-3">
            <label className="block font-semibold text-lg">What is Your Budget?</label>
            <div className="grid grid-cols-3 gap-4">
              {budgets.map((b) => (
                <div
                  key={b.title}
                  onClick={() => setFormData({...formData, budget: b.title})}
                  className={`border rounded-2xl p-4 cursor-pointer ${formData.budget === b.title ? 'border-black ring-2 ring-black bg-gray-50' : 'border-gray-200'}`}
                >
                  <span className="text-3xl mb-2">{b.icon}</span>
                  <h3 className="font-bold text-lg">{b.title}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block font-semibold text-lg">Who do you plan on traveling with on your next adventure?</label>
            <div className="grid grid-cols-2 gap-4">
              {travelPartners.map((tp) => (
                <div
                  key={tp.title}
                  onClick={() => setFormData({...formData, travelWith: tp.title})}
                  className={`border rounded-2xl p-4 cursor-pointer ${formData.travelWith === tp.title ? 'border-black ring-2 ring-black bg-gray-50' : 'border-gray-200'}`}
                >
                  <span className="text-3xl mb-2">{tp.icon}</span>
                  <h3 className="font-bold text-lg">{tp.title}</h3>
                </div>
              ))}
            </div>
          </div>
          {errorMsg && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">{errorMsg}</div>}
          <button type="submit" disabled={loading} className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg">
            {loading ? "Generating Trip..." : "Generate Trip"}
          </button>
        </form>
      )}

      {view === 'itinerary' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Your Custom Itinerary ✨</h2>
          <div className="bg-gray-50 p-6 rounded-2xl border whitespace-pre-wrap leading-relaxed text-gray-700">{itinerary}</div>
          <button onClick={() => setView('create')} className="w-full bg-gray-200 text-black p-4 rounded-xl font-bold">Create Another Trip</button>
        </div>
      )}

      {view === 'history' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900">My Saved Trips 🧳</h2>
          {savedTrips.length === 0 ? <p className="text-gray-500">No saved trips found yet.</p> : (
            savedTrips.map((trip) => (
              <div key={trip._id} className="border border-gray-200 p-5 rounded-2xl space-y-2 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">{trip.destination}</h3>
                  <span className="text-xs bg-black text-white px-2 py-1 rounded-full">{trip.budget}</span>
                </div>
                <p className="text-sm text-gray-500">{trip.days} Days • Traveling with {trip.travelWith}</p>
                <button onClick={() => { setItinerary(trip.itinerary); setView('itinerary'); }} className="text-sm font-semibold text-blue-600 hover:underline pt-2 block">
                  View Full Itinerary →
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;