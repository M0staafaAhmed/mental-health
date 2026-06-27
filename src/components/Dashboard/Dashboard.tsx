import { Link, NavLink, Outlet } from 'react-router-dom'
// استيراد الأيقونات من مكتبة react-icons (حزمة Material Design)
import {
  MdHome,
  MdQuiz,
  MdChat,
  MdMedicalServices,
  MdAssignment,
  MdPerson,
  MdSettings,
  MdLogout,
} from 'react-icons/md';
import type { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../redux/slices/userInfoSlice';

export default function Dashboard() {
  const userName = useSelector((state: RootState) => state.userInfo.user.name);
  const dispatch = useDispatch(); // استرجاع اسم المستخدم من الـ Redux store


  return (
    <>
      <div className="min-h-screen bg-surface text-on-surface">

        {/* --- Sidebar Navigation (Desktop) --- */}
        <aside className="fixed left-0 top-0 h-full w-64 hidden md:flex flex-col bg-white border-r border-outline-variant z-40">
          <div className="px-6 py-8">
            <h1 className="text-primary text-2xl font-bold tracking-tight">Safe Space</h1>
            <p className="text-on-surface-variant text-sm">Mental Wellness</p>
          </div>

          <SidebarNavigation />

          {/* روابط الـ Profile والـ Settings تحت */}
          <div className="px-4 py-6 border-t border-outline-variant space-y-1">
            <NavLink
              to="profile"
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 group 
            ${isActive ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary' : 'text-on-surface-variant hover:bg-slate-50'}`}
            // className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 group ${activeTab === 'profile' ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary' : 'text-on-surface-variant hover:bg-slate-50'}`}
            >
              <MdPerson size={22} className="group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Profile</span>
            </NavLink>
            <NavLink
              to="settings"
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 group ${isActive ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary' : 'text-on-surface-variant hover:bg-slate-50'}`}
            // className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 group ${activeTab === 'settings' ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary' : 'text-on-surface-variant hover:bg-slate-50'}`}
            >
              <MdSettings size={22} className="group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Settings</span>
            </NavLink>
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <div className="md:ml-64 flex flex-col min-h-screen">

          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md h-16 border-b border-outline-variant flex items-center justify-between px-6 md:px-12 w-full">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-primary md:hidden">Safe Space</h2>
              <div className="hidden md:block">
                <span className="text-lg text-on-surface font-semibold">Welcome back, {userName} 👋</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-outline-variant">
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWddl1TLgQK2OsbQTKb3WdkFg_Ya0S1wXhkfLOCvlGmPjnxcijMr93DcQOR6zl3_HcJmV_eIN9IAt-k-ABY3LHNbc_ddLdf_fWbSbZaxCdRThvuneNv1JpqBwlFIKF9AcWJOIe27DF6kELm2ysnK5pzkO2GWZXvZZzXu4584vUSs1UUwP6P3_0eh4Ok-z1lw_wZSJH5gySSNgJdly2GOjcJn5h0v7b5A2PJbLLT9T3WQIxw26GKxRk3E9ye44eqPLrNNp1KB58v4l2"
                />
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="logout" onClick={() => dispatch(clearUserInfo())}>
                <MdLogout size={24} />
              </button>
            </div>
          </header>

          {/* Page Canvas */}
          <Outlet />

          {/* Footer Shell */}
          <footer className="mt-auto bg-slate-50 py-3 border-t border-outline-variant">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <h5 className="text-lg font-semibold text-on-surface">Safe Space</h5>
                <p className="text-sm text-on-surface-variant">© 2026 Safe Space. All rights reserved.</p>
              </div>
              <div className="flex gap-6 text-sm text-on-surface-variant">
                <Link className="hover:text-primary transition-colors font-semibold text-sm" to="/about">
                  About
                </Link>
                <Link className="hover:text-primary transition-colors font-semibold text-sm" to="/privacy">
                  Privacy
                </Link>
                <Link className="hover:text-primary transition-colors font-semibold text-sm" to="/terms">
                  Terms
                </Link>
              </div>
            </div>
          </footer>
        </div>

        {/* --- Mobile Navigation Bar (Bottom) --- */}
        <nav className="fixed bottom-4 left-4 right-4 rounded-4xl bg-white border border-outline-variant flex items-center justify-between overflow-hidden md:hidden z-50">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 py-2 ${isActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant'}`}
          >
            <MdHome size={22} />
            <span className="text-[10px] font-bold">Home</span>
          </NavLink>
          <NavLink
            to="tests"
            className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 py-2 ${isActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant'}`}
          >
            <MdQuiz size={22} />
            <span className="text-[10px] font-bold">Tests</span>
          </NavLink>
          <NavLink
            to="chat"
            className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 py-2 ${isActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant'}`}
          >
            <MdChat size={22} />
            <span className="text-[10px] font-bold">Chat</span>
          </NavLink>
          <NavLink
            to="doctors"
            className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 py-2 ${isActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant'}`}
          >
            <MdMedicalServices size={22} />
            <span className="text-[10px] font-bold">Doctors</span>
          </NavLink>
          <NavLink
            to="results"
            className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 py-2 ${isActive ? 'text-primary bg-primary/10' : 'text-on-surface-variant'}`}
          >
            <MdAssignment size={22} />
            <span className="text-[10px] font-bold">My Results</span>
          </NavLink>
        </nav>

      </div>
    </>
  )
}



function SidebarNavigation() {
  // 1. تجميع بيانات اللينكات كلها في مكان واحد نظيف
  const navLinks = [
    { to: "/dashboard", label: "Home", icon: MdHome, end: true },
    { to: "tests", label: "Tests", icon: MdQuiz },
    { to: "chat", label: "Chat", icon: MdChat },
    { to: "doctors", label: "Doctors", icon: MdMedicalServices },
    { to: "results", label: "My Results", icon: MdAssignment },
  ];

  return (
    <nav className="flex-1 px-4 space-y-1">
      {/* 2. رندر اللينكات كلها بلفة واحدة ذكية */}
      {navLinks.map((link, index) => {
        const IconComponent = link.icon;

        return (
          <NavLink
            key={index}
            to={link.to}
            end={link.end} // لتحديد إذا كان اللينك يحتاج أن يكون "end" أم لا
            // لتحديد كلاسات الكونتينر بناءً على حالة النشاط
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 group ${isActive
                ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary'
                : 'text-on-surface-variant hover:bg-slate-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* لتغيير لون الأيقونة بناءً على حالة النشاط */}
                <IconComponent
                  size={22}
                  className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'}
                />
                <span className="text-sm font-medium">{link.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}