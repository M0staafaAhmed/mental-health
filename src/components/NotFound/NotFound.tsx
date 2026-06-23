import { Link, useNavigate } from 'react-router'
import { Compass } from 'lucide-react'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-teal-50 px-6 py-16 text-center">
      <Link to="/" className="text-xl font-extrabold text-blue-600 mb-12">
        Safe Space
      </Link>

      {/* العنصر المميز: دايرة تنفّس بتنبض بهدوء حوالين رقم الصفحة */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-10" aria-hidden="true">
        <span className="absolute w-48 h-48 rounded-full border border-blue-200 motion-safe:animate-[breathe_4s_ease-in-out_infinite]" />
        <span className="absolute w-36 h-36 rounded-full border border-teal-200 motion-safe:animate-[breathe_4s_ease-in-out_infinite] [animation-delay:0.6s]" />
        <span className="absolute w-24 h-24 rounded-full bg-blue-50 border border-blue-100 motion-safe:animate-[breathe_4s_ease-in-out_infinite] [animation-delay:1.2s]" />
        <span className="relative text-4xl font-black text-slate-900">404</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
        Let's pause for a moment
      </h1>
      <p className="text-slate-600 max-w-md mb-10 leading-relaxed">
        The page you're looking for doesn't exist, or it may have moved.
        Let's get you back to somewhere familiar.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-3
                     transition-colors focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          Back to Home
        </button>
        <Link
          to="/tests"
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full px-6 py-3
                     transition-colors focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          Take an Assessment
        </Link>
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Compass className="w-4 h-4" />
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>·</span>
        <Link to="/tests" className="hover:text-blue-600 transition-colors">Tests</Link>
        <span>·</span>
        <Link to="/doctors" className="hover:text-blue-600 transition-colors">Doctors</Link>
      </div>
    </div>
  )
}

export default NotFound