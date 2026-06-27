import type { DoctorType } from "../../../Types/Types";

export default function DoctorCard({doctor} : {doctor : DoctorType}) {
    return (
        <div className="min-w-72 bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col group">
            <div className="relative h-40 overflow-hidden bg-teal-50 flex items-center justify-center">
                {doctor.ImageUrl ? (
                    <img
                        src={doctor.ImageUrl}
                        alt={doctor.FullName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-3xl font-bold select-none">
                        {doctor.FullName?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                    <h4 className="text-sm font-semibold text-gray-900">{doctor.FullName}</h4>
                    <p className="text-xs text-gray-500">{doctor.Specialty}</p>
                </div>
                <button className="mt-auto w-full py-2 border-2 border-teal-600 text-teal-600 rounded-xl text-sm font-medium hover:bg-teal-600 hover:text-white transition-all active:scale-95 cursor-pointer">
                    Book Session
                </button>
            </div>
        </div>
    )
}
