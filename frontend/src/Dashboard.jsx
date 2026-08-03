import React, { useState } from 'react';
import { 
  LogOut, Users, AlertCircle, Plus, Download, Trash2,
  LayoutDashboard, Wrench, Utensils, Bell, CreditCard,
  FileCheck, Package, Key, UserCheck, Lock, Mail, Check,
  Zap, Stethoscope, DollarSign, Search, ShieldAlert,
  ChevronLeft, ChevronRight, Menu, X, Filter, BarChart3,
  UserCheck2, CheckCircle2, XCircle, Clock, ShieldCheck,
  Building, UserCog, Calendar, FileText, Edit2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');
  const [credentials, setCredentials] = useState({ email: 'admin@hostelos.com', password: '' });

  // Navigation State
  const [activeTab, setActiveTab] = useState('overview'); 
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals Control
  const [activeModal, setActiveModal] = useState(null); // 'add_student' | 'add_visitor' | 'add_notice' | 'edit_mess' | 'add_sick' | 'add_ticket'

  // --- DYNAMIC DATA STATES ---
  const [students, setStudents] = useState([
    { id: 101, name: 'Aarav Sharma', room: '101', phone: '9876543210', feeStatus: 'Paid', fine: 0 },
    { id: 102, name: 'Rohan Verma', room: '102', phone: '9876543211', feeStatus: 'Pending', fine: 500 },
    { id: 103, name: 'Priya Singh', room: '201', phone: '9876543212', feeStatus: 'Paid', fine: 0 },
    { id: 104, name: 'Neha Gupta', room: '202', phone: '9876543213', feeStatus: 'Pending', fine: 200 },
    { id: 105, name: 'Vikram Malhotra', room: '301', phone: '9876543214', feeStatus: 'Paid', fine: 0 }
  ]);

  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Suresh Kumar', relation: 'Parent', studentName: 'Aarav Sharma', room: '101', inTime: '11:30 AM', status: 'In Campus' }
  ]);

  const [outpassRequests, setOutpassRequests] = useState([
    { id: 1, studentName: 'Rohan Verma', room: '102', reason: 'Medical Checkup', status: 'Pending', parentPhone: '9876543211' },
    { id: 2, studentName: 'Aarav Sharma', room: '101', reason: 'Weekend Home Visit', status: 'Approved', parentPhone: '9876543210' }
  ]);

  const [parcels, setParcels] = useState([
    { id: 1, trackingNo: 'AMZ-9823', studentName: 'Neha Gupta', room: '202', status: 'Pending Pickup' }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1, room: '102', issue: 'Loud Music at Late Night', status: 'Open' },
    { id: 2, room: '201', issue: 'Plumbing Leakage in Bathroom', status: 'Resolved' }
  ]);

  const [sickLogs, setSickLogs] = useState([
    { id: 1, studentName: 'Priya Singh', room: '201', issue: 'Fever & Cold', status: 'Under Observation', doctorVisited: 'Yes' }
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Annual Hostel Inspection', date: '05 Aug 2026', type: 'Urgent', content: 'Rooms must be clean before 10 AM.' }
  ]);

  const [messSchedule, setMessSchedule] = useState({
    breakfast: 'Poha, Tea, Boiled Eggs',
    lunch: 'Paneer Curry, Roti, Rice, Dal',
    snacks: 'Samosa, Black Tea',
    dinner: 'Mix Veg, Chapati, Kheer'
  });

  const [nightAttendance, setNightAttendance] = useState([
    { id: 101, name: 'Aarav Sharma', room: '101', status: 'Present' },
    { id: 102, name: 'Rohan Verma', room: '102', status: 'Absent' },
    { id: 103, name: 'Priya Singh', room: '201', status: 'On Leave' }
  ]);

  // --- FORM INPUT TEMPORARY STATES ---
  const [newStudent, setNewStudent] = useState({ name: '', room: '', phone: '', feeStatus: 'Paid' });
  const [newVisitor, setNewVisitor] = useState({ name: '', relation: '', studentName: '', room: '' });
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'General' });
  const [newSickLog, setNewSickLog] = useState({ studentName: '', room: '', issue: '' });
  const [newTicket, setNewTicket] = useState({ room: '', issue: '' });

  // --- HANDLER FUNCTIONS FOR BUTTONS ---

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return toast.error('Please enter email & password!');
    }
    setIsAuthenticated(true);
    setActiveTab(selectedRole === 'admin' ? 'overview' : 'warden_outpasses');
    toast.success(`Welcome back! Logged in as ${selectedRole.toUpperCase()}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // Student Actions
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.room) return toast.error('Please enter all fields!');
    const studentObj = {
      id: Date.now(),
      name: newStudent.name,
      room: newStudent.room,
      phone: newStudent.phone || '9876500000',
      feeStatus: newStudent.feeStatus,
      fine: 0
    };
    setStudents([...students, studentObj]);
    setNewStudent({ name: '', room: '', phone: '', feeStatus: 'Paid' });
    setActiveModal(null);
    toast.success('Student Added Successfully!');
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success('Student record removed.');
  };

  // Visitor Actions
  const handleAddVisitor = (e) => {
    e.preventDefault();
    if (!newVisitor.name || !newVisitor.room) return toast.error('Fill visitor details!');
    setVisitors([...visitors, {
      id: Date.now(),
      ...newVisitor,
      inTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'In Campus'
    }]);
    setNewVisitor({ name: '', relation: '', studentName: '', room: '' });
    setActiveModal(null);
    toast.success('Visitor Checked IN!');
  };

  const handleCheckoutVisitor = (id) => {
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: 'Checked Out' } : v));
    toast.success('Visitor Checked OUT!');
  };

  // Outpass Actions
  const handleOutpassAction = (id, newStatus) => {
    setOutpassRequests(outpassRequests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (newStatus === 'Approved') toast.success('Outpass Request Approved');
    else toast.error('Outpass Request Rejected');
  };

  // Parcel Actions
  const handleMarkParcelCollected = (id) => {
    setParcels(parcels.map(p => p.id === id ? { ...p, status: 'Handed Over' } : p));
    toast.success('Parcel handed over to student!');
  };

  // Ticket Maintenance Actions
  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!newTicket.room || !newTicket.issue) return toast.error('Enter room and issue!');
    setComplaints([...complaints, { id: Date.now(), ...newTicket, status: 'Open' }]);
    setNewTicket({ room: '', issue: '' });
    setActiveModal(null);
    toast.success('Maintenance Ticket Created!');
  };

  const handleResolveTicket = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
    toast.success('Ticket Marked Resolved!');
  };

  // Sick Bay Actions
  const handleAddSickLog = (e) => {
    e.preventDefault();
    if (!newSickLog.studentName) return toast.error('Enter student name!');
    setSickLogs([...sickLogs, { id: Date.now(), ...newSickLog, status: 'Admitted', doctorVisited: 'Yes' }]);
    setNewSickLog({ studentName: '', room: '', issue: '' });
    setActiveModal(null);
    toast.success('Sick Bay Entry Logged!');
  };

  // Notice Actions
  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title) return toast.error('Enter Notice Title!');
    setNotices([...notices, { id: Date.now(), ...newNotice, date: 'Today' }]);
    setNewNotice({ title: '', content: '', type: 'General' });
    setActiveModal(null);
    toast.success('Notice Broadcasted!');
  };

  // Attendance Actions
  const toggleAttendance = (id, newStatus) => {
    setNightAttendance(nightAttendance.map(a => a.id === id ? { ...a, status: newStatus } : a));
    toast.success('Roll call updated!');
  };

  const handleImposeFine = (studentId) => {
    const amount = prompt('Enter Fine Amount (₹):', '200');
    if (amount && !isNaN(amount)) {
      setStudents(students.map(s => s.id === studentId ? { ...s, fine: s.fine + parseInt(amount) } : s));
      toast.success(`₹${amount} fine updated!`);
    }
  };

  // NAVIGATION CONFIGURATION
  const adminNavItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Charts & Analytics', icon: BarChart3 },
    { id: 'students', label: 'Students Directory', icon: Users, badge: students.length },
    { id: 'visitors', label: 'Visitor Register', icon: UserCheck, badge: visitors.filter(v => v.status === 'In Campus').length },
    { id: 'outpass', label: 'Outpass Control', icon: Key, badge: outpassRequests.filter(r => r.status === 'Pending').length },
    { id: 'parcels', label: 'Gate Parcels', icon: Package, badge: parcels.filter(p => p.status === 'Pending Pickup').length },
    { id: 'utilities', label: 'Utility Meters', icon: Zap },
    { id: 'maintenance', label: 'Maintenance Tasks', icon: Wrench, badge: complaints.filter(c => c.status === 'Open').length },
    { id: 'sickbay', label: 'Sick Bay Logs', icon: Stethoscope, badge: sickLogs.length },
    { id: 'notices', label: 'Notices & Alerts', icon: Bell, badge: notices.length },
    { id: 'mess', label: 'Mess Schedule', icon: Utensils }
  ];

  const wardenNavItems = [
    { id: 'warden_outpasses', label: 'Outpass Approval', icon: Key, badge: outpassRequests.filter(r => r.status === 'Pending').length },
    { id: 'warden_attendance', label: 'Night Roll Call', icon: UserCheck2 },
    { id: 'warden_discipline', label: 'Discipline & Fines', icon: AlertCircle },
    { id: 'warden_complaints', label: 'Incident Reports', icon: ShieldAlert }
  ];

  const currentNavItems = selectedRole === 'admin' ? adminNavItems : wardenNavItems;

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg ${
              selectedRole === 'admin' ? 'bg-indigo-600 shadow-indigo-500/30' : 'bg-amber-600 shadow-amber-500/30'
            }`}>
              {selectedRole === 'admin' ? <Building size={28} /> : <UserCog size={28} />}
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-3">Hostel OS Portal</h2>
            <p className="text-xs text-slate-400 mt-1">Select role and sign in</p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setSelectedRole('admin'); setCredentials({ email: 'admin@hostelos.com', password: '' }); }}
              className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                selectedRole === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <Building size={15} /> Admin
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole('warden'); setCredentials({ email: 'warden@hostelos.com', password: '' }); }}
              className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                selectedRole === 'warden' ? 'bg-amber-600 text-white' : 'text-slate-400'
              }`}
            >
              <UserCog size={15} /> Warden
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Email Address</label>
              <input 
                type="email" 
                value={credentials.email} 
                onChange={e => setCredentials({...credentials, email: e.target.value})} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" 
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Password</label>
              <input 
                type="password" 
                value={credentials.password} 
                onChange={e => setCredentials({...credentials, password: e.target.value})} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" 
                placeholder="••••••••" 
                required
              />
            </div>
            <button 
              type="submit" 
              className={`w-full text-white py-2.5 rounded-xl font-semibold text-xs cursor-pointer shadow-lg ${
                selectedRole === 'admin' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-amber-600 hover:bg-amber-500'
              }`}
            >
              Sign In as {selectedRole.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <aside className={`bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${selectedRole === 'admin' ? 'bg-indigo-600' : 'bg-amber-600'}`}>
                {selectedRole === 'admin' ? 'A' : 'W'}
              </div>
              <div>
                <h1 className="font-bold text-sm text-white">HostelOS</h1>
                <p className={`text-[10px] uppercase font-bold ${selectedRole === 'admin' ? 'text-indigo-400' : 'text-amber-400'}`}>
                  {selectedRole} Mode
                </p>
              </div>
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white mx-auto ${selectedRole === 'admin' ? 'bg-indigo-600' : 'bg-amber-600'}`}>
              {selectedRole === 'admin' ? 'A' : 'W'}
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {currentNavItems.map(item => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            const activeBg = selectedRole === 'admin' ? 'bg-indigo-600' : 'bg-amber-600';

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition ${
                  isActive ? `${activeBg} text-white font-semibold` : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IconComponent size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </div>
                {sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 text-slate-400 hover:text-rose-400 cursor-pointer text-xs font-semibold">
            <LogOut size={16} /> {sidebarOpen && <span>Logout ({selectedRole})</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/50 overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className={selectedRole === 'admin' ? 'text-indigo-500' : 'text-amber-500'} size={20} />
            <h2 className="text-sm font-bold text-slate-200">
              {selectedRole === 'admin' ? 'Admin Executive Control' : 'Warden Executive Control'}
            </h2>
          </div>

          <button 
            onClick={() => {
              setEmergencyMode(!emergencyMode);
              toast(emergencyMode ? 'Lockdown Deactivated' : 'LOCKDOWN ACTIVATED AT MAIN GATE!', { icon: '🚨' });
            }} 
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer border transition ${
              emergencyMode ? 'bg-rose-600 border-rose-500 text-white animate-pulse' : 'bg-slate-900 border-slate-800 text-rose-400 hover:bg-rose-950/30'
            }`}
          >
            <ShieldAlert size={15} />
            <span>{emergencyMode ? 'LOCKDOWN ACTIVE' : 'Trigger Gate Lockdown'}</span>
          </button>
        </header>

        {/* MAIN TABS DISPLAY */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">

          {/* ADMIN TABS */}
          {selectedRole === 'admin' && (
            <>
              {/* OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <p className="text-slate-400 text-xs">Total Registered Students</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{students.length}</h3>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <p className="text-slate-400 text-xs">Active Outpasses</p>
                      <h3 className="text-2xl font-bold text-amber-400 mt-1">{outpassRequests.filter(r => r.status === 'Pending').length}</h3>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <p className="text-slate-400 text-xs">Visitors In Campus</p>
                      <h3 className="text-2xl font-bold text-indigo-400 mt-1">{visitors.filter(v => v.status === 'In Campus').length}</h3>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <p className="text-slate-400 text-xs">Pending Maintenance</p>
                      <h3 className="text-2xl font-bold text-rose-400 mt-1">{complaints.filter(c => c.status === 'Open').length}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Charts & System Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Hostel Occupancy</p>
                      <p className="text-xl font-bold text-emerald-400 mt-1">92.4% Full</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Total Fees Collected</p>
                      <p className="text-xl font-bold text-indigo-400 mt-1">₹ 4,50,000</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Power Consumption</p>
                      <p className="text-xl font-bold text-amber-400 mt-1">420 kWh Today</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STUDENTS DIRECTORY */}
              {activeTab === 'students' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-100">Students Directory ({students.length})</h3>
                    <button onClick={() => setActiveModal('add_student')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer">
                      <Plus size={15} /> Add New Student
                    </button>
                  </div>
                  <div className="divide-y divide-slate-800">
                    {students.map(s => (
                      <div key={s.id} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-200">{s.name}</p>
                          <p className="text-slate-500 font-mono">Room: {s.room} | Phone: {s.phone} | Fine: ₹{s.fine}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${s.feeStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {s.feeStatus}
                          </span>
                          <button onClick={() => handleDeleteStudent(s.id)} className="text-slate-500 hover:text-rose-400 cursor-pointer">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VISITOR REGISTER */}
              {activeTab === 'visitors' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-100">Visitor Gate Register</h3>
                    <button onClick={() => setActiveModal('add_visitor')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer">
                      <Plus size={15} /> New Visitor Check-In
                    </button>
                  </div>
                  <div className="space-y-2">
                    {visitors.map(v => (
                      <div key={v.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-200">{v.name} ({v.relation})</p>
                          <p className="text-slate-500">Meeting: {v.studentName} (Room {v.room}) | Entry: {v.inTime}</p>
                        </div>
                        {v.status === 'In Campus' ? (
                          <button onClick={() => handleCheckoutVisitor(v.id)} className="bg-rose-600/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-lg font-bold hover:bg-rose-600 hover:text-white transition cursor-pointer">
                            Check Out
                          </button>
                        ) : (
                          <span className="text-slate-500 font-bold">Checked Out</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OUTPASS CONTROL */}
              {activeTab === 'outpass' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Outpass Control Terminal</h3>
                  <div className="space-y-2">
                    {outpassRequests.map(r => (
                      <div key={r.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-200">{r.studentName} (Room {r.room})</p>
                          <p className="text-slate-400">Reason: {r.reason}</p>
                        </div>
                        {r.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleOutpassAction(r.id, 'Approved')} className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">Approve</button>
                            <button onClick={() => handleOutpassAction(r.id, 'Rejected')} className="bg-rose-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">Reject</button>
                          </div>
                        ) : (
                          <span className={`font-bold ${r.status === 'Approved' ? 'text-emerald-400' : 'text-rose-400'}`}>{r.status}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GATE PARCELS */}
              {activeTab === 'parcels' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Gate Parcels & Courier Logs</h3>
                  <div className="space-y-2">
                    {parcels.map(p => (
                      <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-200">Tracking ID: {p.trackingNo}</p>
                          <p className="text-slate-500">For: {p.studentName} (Room {p.room})</p>
                        </div>
                        {p.status === 'Pending Pickup' ? (
                          <button onClick={() => handleMarkParcelCollected(p.id)} className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">
                            Mark Handed Over
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold">Collected</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* UTILITY METERS */}
              {activeTab === 'utilities' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Utility Consumption Meters</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="font-bold text-amber-400">Block A Electricity</p>
                      <p className="text-xl font-mono text-slate-200 mt-2">1,420 kWh</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="font-bold text-indigo-400">Block B Water Tank</p>
                      <p className="text-xl font-mono text-slate-200 mt-2">3,200 Liters</p>
                    </div>
                  </div>
                </div>
              )}

              {/* MAINTENANCE */}
              {activeTab === 'maintenance' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-100">Maintenance & Complaints</h3>
                    <button onClick={() => setActiveModal('add_ticket')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer">
                      <Plus size={15} /> Log New Ticket
                    </button>
                  </div>
                  <div className="space-y-2">
                    {complaints.map(c => (
                      <div key={c.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-200">Room {c.room}</p>
                          <p className="text-slate-400">{c.issue}</p>
                        </div>
                        {c.status === 'Open' ? (
                          <button onClick={() => handleResolveTicket(c.id)} className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">
                            Mark Resolved
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold">Resolved</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SICK BAY LOGS */}
              {activeTab === 'sickbay' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-100">Sick Bay Register</h3>
                    <button onClick={() => setActiveModal('add_sick')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer">
                      <Plus size={15} /> Log Medical Entry
                    </button>
                  </div>
                  <div className="space-y-2">
                    {sickLogs.map(s => (
                      <div key={s.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-200">{s.studentName} (Room {s.room})</p>
                          <p className="text-slate-400">Issue: {s.issue}</p>
                        </div>
                        <span className="text-amber-400 font-bold">{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTICES & ALERTS */}
              {activeTab === 'notices' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-100">Notices & Digital Announcements</h3>
                    <button onClick={() => setActiveModal('add_notice')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer">
                      <Plus size={15} /> Publish Notice
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notices.map(n => (
                      <div key={n.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-bold text-indigo-400">{n.title}</p>
                          <span className="text-slate-500">{n.date}</span>
                        </div>
                        <p className="text-slate-300">{n.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MESS SCHEDULE */}
              {activeTab === 'mess' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-100">Daily Mess Schedule</h3>
                    <button onClick={() => toast.success('Edit Mess Menu Option Clicked')} className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer">
                      <Edit2 size={14} /> Update Menu
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="font-bold text-indigo-400">Breakfast</p>
                      <p className="text-slate-300 mt-2">{messSchedule.breakfast}</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="font-bold text-indigo-400">Lunch</p>
                      <p className="text-slate-300 mt-2">{messSchedule.lunch}</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="font-bold text-indigo-400">Snacks</p>
                      <p className="text-slate-300 mt-2">{messSchedule.snacks}</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="font-bold text-indigo-400">Dinner</p>
                      <p className="text-slate-300 mt-2">{messSchedule.dinner}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* WARDEN TABS */}
          {selectedRole === 'warden' && (
            <>
              {activeTab === 'warden_outpasses' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Warden Outpass Approvals</h3>
                  {outpassRequests.map(req => (
                    <div key={req.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-200">{req.studentName} (Room {req.room})</p>
                        <p className="text-slate-400">{req.reason}</p>
                      </div>
                      {req.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleOutpassAction(req.id, 'Approved')} className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">Approve</button>
                          <button onClick={() => handleOutpassAction(req.id, 'Rejected')} className="bg-rose-600 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">Reject</button>
                        </div>
                      ) : (
                        <span className={`font-bold ${req.status === 'Approved' ? 'text-emerald-400' : 'text-rose-400'}`}>{req.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'warden_attendance' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Night Attendance Roll Call</h3>
                  <div className="space-y-2">
                    {nightAttendance.map(item => (
                      <div key={item.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <p className="font-bold text-slate-200">{item.name} (Room {item.room})</p>
                        <div className="flex gap-1">
                          {['Present', 'Absent', 'On Leave'].map((st) => (
                            <button 
                              key={st} 
                              onClick={() => toggleAttendance(item.id, st)} 
                              className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer text-[10px] ${
                                item.status === st ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'warden_discipline' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Discipline & Fine Register</h3>
                  {students.map(s => (
                    <div key={s.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <p className="font-bold text-slate-200">{s.name} - Current Fine: ₹{s.fine}</p>
                      <button onClick={() => handleImposeFine(s.id)} className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-lg font-semibold cursor-pointer">
                        + Add Fine
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'warden_complaints' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Incident Reports Log</h3>
                  {complaints.map(c => (
                    <div key={c.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                      <p className="text-amber-400 font-bold">Room {c.room}</p>
                      <p className="text-slate-300">{c.issue}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </main>
      </div>

      {/* --- MODALS FOR BUTTON DIALOGS --- */}

      {/* ADD STUDENT MODAL */}
      {activeModal === 'add_student' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <input type="text" placeholder="Student Full Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Room Number (e.g. 104)" value={newStudent.room} onChange={e => setNewStudent({...newStudent, room: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Mobile Number" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VISITOR MODAL */}
      {activeModal === 'add_visitor' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">New Visitor Check-In</h3>
            <form onSubmit={handleAddVisitor} className="space-y-3 text-xs">
              <input type="text" placeholder="Visitor Name" value={newVisitor.name} onChange={e => setNewVisitor({...newVisitor, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Relation (Parent, Friend, etc.)" value={newVisitor.relation} onChange={e => setNewVisitor({...newVisitor, relation: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Student Name to Visit" value={newVisitor.studentName} onChange={e => setNewVisitor({...newVisitor, studentName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Room Number" value={newVisitor.room} onChange={e => setNewVisitor({...newVisitor, room: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold">Check-In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLISH NOTICE MODAL */}
      {activeModal === 'add_notice' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Broadcast Digital Notice</h3>
            <form onSubmit={handleAddNotice} className="space-y-3 text-xs">
              <input type="text" placeholder="Notice Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <textarea placeholder="Notice Description/Content" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200 h-24" required />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold">Publish Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOG TICKET MODAL */}
      {activeModal === 'add_ticket' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Log Maintenance Ticket</h3>
            <form onSubmit={handleAddTicket} className="space-y-3 text-xs">
              <input type="text" placeholder="Room Number" value={newTicket.room} onChange={e => setNewTicket({...newTicket, room: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Describe Issue" value={newTicket.issue} onChange={e => setNewTicket({...newTicket, issue: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold">Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SICK BAY MODAL */}
      {activeModal === 'add_sick' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Medical Register Entry</h3>
            <form onSubmit={handleAddSickLog} className="space-y-3 text-xs">
              <input type="text" placeholder="Student Name" value={newSickLog.studentName} onChange={e => setNewSickLog({...newSickLog, studentName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Room Number" value={newSickLog.room} onChange={e => setNewSickLog({...newSickLog, room: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <input type="text" placeholder="Health Issue/Symptoms" value={newSickLog.issue} onChange={e => setNewSickLog({...newSickLog, issue: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-slate-200" required />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold">Log Medical Case</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}