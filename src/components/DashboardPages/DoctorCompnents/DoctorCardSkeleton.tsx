
export default function DoctorCardSkeleton() {
    return (
        <div className="min-w-75 bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col">
            {/* Image area */}
            <div className="h-40 bg-gray-100 animate-pulse" />

            <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Name + Specialty */}
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                </div>

                {/* Button */}
                <div className="mt-auto h-9 w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>
        </div>
    )
}
