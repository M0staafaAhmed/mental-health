import { FaBrain, FaHeart, FaLeaf, FaShieldAlt } from "react-icons/fa";
import { MdOutlinePsychology, MdOutlineSupportAgent } from "react-icons/md";

const VALUES = [
  {
    icon: FaShieldAlt,
    title: "Safe by design",
    text: "A calm space built around privacy, trust, and emotionally respectful support.",
  },
  {
    icon: FaHeart,
    title: "Human first",
    text: "Every feature is shaped to feel gentle, clear, and useful when someone needs care.",
  },
  {
    icon: FaBrain,
    title: "Guided awareness",
    text: "Self-assessments and insights help users understand patterns without pressure.",
  },
];

const STEPS = [
  "Understand your current emotional state",
  "Use supportive tools whenever you need them",
  "Connect with verified mental-health professionals",
];

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-hero-gradient">
      <section className="relative px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-20 h-80 w-80 -translate-x-1/3 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
                <FaLeaf className="text-secondary" />
                About Safe Space
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Mental wellness support that feels calm, private, and close.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
                Safe Space brings emotional support, self-assessment, and
                specialist discovery into one simple experience. The goal is to
                help people take the next small step with less confusion and
                more confidence.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/doctors"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-700"
                >
                  Find a specialist
                </a>
                <a
                  href="/tests"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-primary/30 bg-white/70 px-6 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
                >
                  Explore tests
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur">
              <div className="rounded-[1.5rem] bg-surface p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <MdOutlinePsychology className="text-4xl" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  A better first step
                </h2>
                <p className="mt-3 leading-7 text-gray-700">
                  Mental health tools should not feel clinical or cold. This
                  project focuses on soft interaction, clear guidance, and easy
                  access to professional help.
                </p>
                <div className="mt-6 space-y-3">
                  {STEPS.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl bg-white/80 p-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-sm font-bold text-secondary">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-white/80 bg-white/80 p-7 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-gray-700">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] bg-primary p-8 text-white shadow-soft md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <MdOutlineSupportAgent className="text-3xl" />
                </div>
                <h2 className="mt-5 text-3xl font-bold">
                  Built for gentle support, not overwhelm.
                </h2>
                <p className="mt-3 max-w-2xl text-white/85">
                  From the first test to the first conversation with a
                  specialist, Safe Space keeps the experience simple, warm, and
                  easy to return to.
                </p>
              </div>
              <a
                href="/register"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-primary transition-all hover:bg-surface"
              >
                Start your journey
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
