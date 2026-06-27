import { useMemo, useState } from "react";
import { FaEnvelope, FaLeaf, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { useQuery } from "@tanstack/react-query"; 

interface Doctor {
  DoctorID: number;
  FullName: string;
  Specialty: string;
  Phone: string;
  Email: string;
  ImageUrl: string | null;
}

type DoctorApiResponse = Doctor[] | { data?: unknown };

const API_URL = "https://mental-heath-backend.vercel.app/doctors";

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "DR";
}

function isDoctor(value: unknown): value is Doctor {
  if (!value || typeof value !== "object") return false;
  const doctor = value as Partial<Doctor>;
  return (
    typeof doctor.DoctorID === "number" &&
    typeof doctor.FullName === "string" &&
    typeof doctor.Specialty === "string" &&
    typeof doctor.Phone === "string" &&
    typeof doctor.Email === "string" &&
    (typeof doctor.ImageUrl === "string" || doctor.ImageUrl === null)
  );
}

function extractDoctors(json: DoctorApiResponse) {
  const data = Array.isArray(json) ? json : json.data;
  return Array.isArray(data) ? data.filter(isDoctor) : [];
}

const fetchDoctors = async (): Promise<Doctor[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to load doctors");
  const json = (await res.json()) as DoctorApiResponse;
  return extractDoctors(json);
};

function Doctors() {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const { data: doctors = [], isLoading, isError, error } = useQuery<Doctor[], Error>({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 1000 * 60 * 5, 
  });

  const filteredDoctors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (doc) =>
        doc.FullName.toLowerCase().includes(q) ||
        doc.Specialty.toLowerCase().includes(q),
    );
  }, [doctors, search]);

  return (
    <main className="min-h-screen overflow-hidden bg-hero-gradient">
      <section className="relative px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
              <FaLeaf className="text-secondary" />
              Gentle professional care
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Help us to find best therapist for you
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
              Browse verified mental-health professionals and choose someone
              who feels right for anxiety, depression, CBT, or personal growth.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl ">
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-14 w-full rounded-[1.35rem] border border-outline-variant/40 bg-white/90 pl-12 pr-5 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="mt-12 min-h-105">
            {/* 5. استخدام isLoading بتاعة TanStack للهياكل الجاهزة (Skeleton) */}
            {isLoading && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-4xl border border-white/70 bg-white/70 p-5 shadow-soft backdrop-blur"
                  >
                    <div className="h-48 rounded-3xl bg-slate-200/70 animate-pulse" />
                    <div className="mt-5 h-5 w-2/3 rounded-full bg-slate-200 animate-pulse" />
                    <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-100 animate-pulse" />
                    <div className="mt-6 h-11 rounded-2xl bg-slate-200/70 animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                {/* 6. استخدام isError و error.message الحقيقية من السيرفر */}
                {isError && (
                  <div className="mx-auto mb-8 max-w-xl rounded-2xl border border-red-100 bg-red-50/90 p-4 text-center">
                    <p className="text-sm font-medium text-red-600">
                      {error.message}
                    </p>
                  </div>
                )}

                <div className="mb-6 flex flex-col gap-3 border-b border-white/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-slate-600">
                    Showing{" "}
                    <span className="font-bold text-gray-900">
                      {filteredDoctors.length}
                    </span>{" "}
                    certified experts
                  </p>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-secondary shadow-soft">
                    <MdOutlineVerified className="text-lg" />
                    Verified profiles
                  </div>
                </div>

                {filteredDoctors.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDoctors.map((doc) => {
                      const isContactOpen = openId === doc.DoctorID;

                      return (
                        <article
                          key={doc.DoctorID}
                          className="relative rounded-4xl border border-white/80 bg-white/85 p-6 text-center shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover"
                        >
                          <div className="absolute left-5 top-5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                            Available
                          </div>

                          <div>
                            <div className="flex flex-col items-center pt-5">
                              {doc.ImageUrl ? (
                                <img
                                  src={doc.ImageUrl}
                                  alt={`Dr. ${doc.FullName}`}
                                  className="h-20 w-20 rounded-full object-cover ring-4 ring-secondary/10"
                                />
                              ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary ring-4 ring-primary/5">
                                  {getInitials(doc.FullName)}
                                </div>
                              )}
                              <h2 className="mt-4 text-xl font-bold leading-tight text-gray-900">
                                Dr. {doc.FullName}
                              </h2>
                              <p className="mt-2 text-sm leading-6 text-gray-700">
                                {doc.Specialty}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setOpenId(isContactOpen ? null : doc.DoctorID)
                              }
                              className={`mt-6 h-12 w-full rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                isContactOpen
                                  ? "bg-gray-900 text-white hover:bg-gray-800"
                                  : "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-blue-700"
                              }`}
                            >
                              {isContactOpen ? "Hide Contact" : "View Contact"}
                            </button>

                            <div
                              className={`grid transition-all duration-300 ${
                                isContactOpen
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden">
                                <div className="mt-4 space-y-3 rounded-2xl bg-surface p-4">
                                  <a
                                    href={`tel:${doc.Phone}`}
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-primary"
                                  >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                      <FaPhoneAlt />
                                    </span>
                                    <span className="select-all">
                                      {doc.Phone}
                                    </span>
                                  </a>
                                  <a
                                    href={`mailto:${doc.Email}`}
                                    className="flex items-center gap-3 overflow-hidden text-sm font-medium text-gray-700 hover:text-primary"
                                  >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                      <FaEnvelope />
                                    </span>
                                    <span className="truncate select-all">
                                      {doc.Email}
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mx-auto mt-10 max-w-md rounded-4xl border border-dashed border-outline-variant/70 bg-white/80 px-6 py-14 text-center shadow-soft">
                    <p className="text-sm font-semibold text-gray-600">
                      {doctors.length > 0
                        ? "No doctors found matching your criteria."
                        : "No doctors are available right now."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Doctors;