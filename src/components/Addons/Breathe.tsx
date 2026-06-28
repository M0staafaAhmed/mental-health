import { createPortal } from "react-dom"
import { useState, useEffect, useRef } from "react"
import { X, Play, Pause, RefreshCw } from "lucide-react"

interface BreatheProps {
    open: boolean
    onClose: () => void
}

type BreathPhase = "inhale" | "hold-in" | "exhale" | "hold-out"

const PHASES: BreathPhase[] = ["inhale", "hold-in", "exhale", "hold-out"]

const PHASE_CONFIGS: Record<BreathPhase, { label: string; instruction: string; bgInner: string; borderColor: string; bgOuter: string; scale: number }> = {
    "inhale":   { label: "Breathe In Slowly",  instruction: "Expand your chest, fill your lungs with fresh air.",       bgInner: "#2563eb", borderColor: "#3b82f6", bgOuter: "rgba(59,130,246,0.2)",  scale: 1.4 },
    "hold-in":  { label: "Pause and Hold",     instruction: "Relax your jaw, hold the air gently without tension.",     bgInner: "#4f46e5", borderColor: "#6366f1", bgOuter: "rgba(99,102,241,0.3)",  scale: 1.4 },
    "exhale":   { label: "Exhale Gently",      instruction: "Release completely, let all stress dissolve out.",         bgInner: "#0d9488", borderColor: "#14b8a6", bgOuter: "rgba(20,184,166,0.15)", scale: 0.9 },
    "hold-out": { label: "Pause and Rest",     instruction: "Empty space. Rest here before the next cycle.",           bgInner: "#475569", borderColor: "#64748b", bgOuter: "rgba(100,116,139,0.2)", scale: 0.9 },
}

export default function Breathe({ open, onClose }: BreatheProps) {
    const [isActive, setIsActive]               = useState(true)
    const [phaseIndex, setPhaseIndex]           = useState(0)
    const [secondsLeft, setSecondsLeft]         = useState(4)
    const [cyclesCompleted, setCyclesCompleted] = useState(0)

    const phaseIndexRef = useRef(0)
    const secondsRef    = useRef(4)
    const isActiveRef   = useRef(true)

    useEffect(() => {
        if (!open) {
            phaseIndexRef.current = 0
            secondsRef.current    = 4
            isActiveRef.current   = true
            setPhaseIndex(0)
            setSecondsLeft(4)
            setCyclesCompleted(0)
            setIsActive(true)
        }
    }, [open])

    useEffect(() => {
        isActiveRef.current = isActive
    }, [isActive])

    useEffect(() => {
        if (!open) return

        const timer = setInterval(() => {
            if (!isActiveRef.current) return

            secondsRef.current -= 1

            if (secondsRef.current <= 0) {
                const nextIndex = (phaseIndexRef.current + 1) % PHASES.length
                if (nextIndex === 0) {
                    setCyclesCompleted((c) => c + 1)
                }
                phaseIndexRef.current = nextIndex
                secondsRef.current    = 4
                setPhaseIndex(nextIndex)
                setSecondsLeft(4)
            } else {
                setSecondsLeft(secondsRef.current)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [open])

    if (!open) return null

    const phase  = PHASES[phaseIndex]
    const config = PHASE_CONFIGS[phase]

    return createPortal(
        <div
            className="fixed inset-0 z-9999 bg-gray-950/50 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-gray-100 flex flex-col items-center justify-center text-center space-y-8 min-h-125"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer">
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 px-2.5 py-1.5 rounded-full border border-blue-100 text-blue-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                        🧘 Active Breathing Protocol
                    </span>
                    <h2 className="font-medium text-xl text-gray-950">Tac-4 Stress Relief Breathing</h2>
                </div>

                {/* Circle */}
                <div style={{ width: 256, height: 256, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{
                        position:        "absolute",
                        width:           176,
                        height:          176,
                        borderRadius:    "9999px",
                        border:          `2px solid ${config.borderColor}`,
                        backgroundColor: config.bgOuter,
                        transform:       `scale(${config.scale})`,
                        transition:      "all 3500ms ease-in-out",
                    }} />
                    <div style={{
                        width:           128,
                        height:          128,
                        borderRadius:    "9999px",
                        backgroundColor: config.bgInner,
                        transition:      "background-color 500ms",
                        display:         "flex",
                        flexDirection:   "column",
                        alignItems:      "center",
                        justifyContent:  "center",
                        position:        "relative",
                        zIndex:          10,
                        boxShadow:       "0 10px 30px rgba(0,0,0,0.15)",
                    }}>
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "2.25rem", lineHeight: 1 }}>{secondsLeft}s</span>
                        <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, fontWeight: "bold", letterSpacing: "0.1em", marginTop: 4 }}>REMAINING</span>
                    </div>
                </div>

                {/* Phase info */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-950">{config.label}</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">{config.instruction}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 py-2.5 px-4 rounded-xl text-xs text-gray-700 select-none">
                    <span>Completed: <strong>{cyclesCompleted} Cycles</strong></span>
                    <span>•</span>
                    <span>Goal: <strong>4 Cycles (4 Mins)</strong></span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            phaseIndexRef.current = 0
                            secondsRef.current    = 4
                            isActiveRef.current   = true
                            setPhaseIndex(0)
                            setSecondsLeft(4)
                            setCyclesCompleted(0)
                            setIsActive(true)
                        }}
                        className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition cursor-pointer"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsActive((a) => !a)}
                        className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2.5 cursor-pointer transition-colors"
                        style={{ backgroundColor: isActive ? "#030712" : "#2563eb" }}
                    >
                        {isActive ? <><Pause className="w-4 h-4" /> Pause Session</> : <><Play className="w-4 h-4" /> Resume Session</>}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}