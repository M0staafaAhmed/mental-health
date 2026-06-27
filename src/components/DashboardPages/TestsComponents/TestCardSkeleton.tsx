
export default function TestCardSkeleton() {
    return (
        <div className="min-w-70 bg-white rounded-xl p-6 border border-gray-200 flex flex-col gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gray-100 animate-pulse" />

            {/* Title + Description */}
            <div className="flex flex-col gap-2">
                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
            </div>

            {/* Button */}
            <div className="mt-auto h-9 w-full bg-gray-100 rounded-xl animate-pulse" />
        </div>
    )
}
