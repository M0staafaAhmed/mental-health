import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoCallOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import registerImage1 from "../../../assets/register-1.png";
import registerImage2 from "../../../assets/register-2.png";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const registerSchema = z.object({
    FullName: z.string().min(2, "Full name must be at least 2 characters long").max(100, "Full name must be at most 100 characters long").regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    Email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "password must be at least 8 characters long").max(100, "password must be at most 100 characters long").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    rePassword: z.string(),
    Phone: z.string().regex(/^\d{10,15}$/, "Please enter a valid Phone number"),
    Gender: z.enum(["male", "female"], "Please select a gender"),
    DateOfBirth: z.string().refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 0 && age <= 120;
    }, "Please enter a valid date of birth"),
  }).refine((data) => data.password === data.rePassword, {
    message: "passwords do not match",
    path: ["rePassword"],
  });

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      FullName: "",
      Email: "",
      password: "",
      rePassword: "",
      Phone: "",
      Gender: "male",
      DateOfBirth: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(data: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    try {
      const req = await fetch("https://mental-heath-backend.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const res = await req.json()
      if (res.status === "success"){
        toast.success("Registration successful! Please Enter verification code sent to your email.")
      }else{
        toast.error(res.message || "Registration failed. Please try again.")
      }
      console.log(res);
    } catch (error) {
      console.error("Error registering user:", error);
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-surface min-h-screen">
        {/* Main Canvas */}
        <main className="grow flex items-center justify-center px-4 py-8 relative overflow-hidden">
          {/* Atmospheric Background Element */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dbe1ff] blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-[#89f5e7] blur-[100px] rounded-full" />
          </div>
          {/* Register Card Container */}
          <section className="shadow-[0 4px 20px -2px rgba(15, 23, 42, 0.05)] hover:shadow-[0 10px 25px -5px rgba(15, 23, 42, 0.08)] relative z-10 w-full max-w-130 bg-white rounded-xl border border-outline-variant p-4 md:p-8">
            {/* Brand Identity */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  <MdOutlineFavoriteBorder className="text-3xl text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold leading-8 text-primary tracking-tight">Safe Space</h1>
              <p className="font-normal text-[#434655] mt-1">Start your journey to wellness</p>
            </div>
            {/* Registration Form */}
            <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]" htmlFor="fullName">Full Name <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <input className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2  ${errors.FullName ? "focus:ring-red-500" : "focus:ring-primary"} focus:border-transparent outline-none transition-all duration-200 placeholder:text-outline-variant font-normal`} id="fullName" required {...register("FullName")} placeholder="Enter your full name" type="text" />
                  <IoPersonOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg" />
                </div>
                {errors.FullName && <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>}
              </div>
              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]" htmlFor="email">Email Address <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <input className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2  ${errors.Email ? "focus:ring-red-500" : "focus:ring-primary"} focus:border-transparent outline-none transition-all duration-200 placeholder:text-outline-variant font-normal`} id="email" required {...register("Email")} placeholder="name@example.com" type="email" />
                  <CiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg" />
                </div>
                {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
              </div>
              {/* Password (Show/Hide) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]" htmlFor="password">Password <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <input className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2  ${errors.password ? "focus:ring-red-500" : "focus:ring-primary"} focus:border-transparent outline-none transition-all duration-200 placeholder:text-outline-variant font-normal`} required {...register("password")} placeholder="••••••••" type={showPassword ? "text" : "password"} />
                  <button className="absolute right-3  top-1/2 -translate-y-1/2 text-lg text-outline-variant hover:text-primary transition-colors cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} type="button">
                    {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              {/* RePassword (Show/Hide) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]" htmlFor="repassword">Repassword <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <input className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2  ${errors.rePassword ? "focus:ring-red-500" : "focus:ring-primary"} focus:border-transparent outline-none transition-all duration-200 placeholder:text-outline-variant font-normal`} required {...register("rePassword")} placeholder="••••••••" type={showRePassword ? "text" : "password"} />
                  <button className="absolute right-3  top-1/2 -translate-y-1/2 text-lg text-outline-variant hover:text-primary transition-colors cursor-pointer" onClick={() => { setShowRePassword(!showRePassword) }} type="button">
                    {showRePassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                  </button>
                </div>
                {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>}
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]" htmlFor="phone">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <input className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2  ${errors.Phone ? "focus:ring-red-500" : "focus:ring-primary"} focus:border-transparent outline-none transition-all duration-200 placeholder:text-outline-variant font-normal`} required {...register("Phone")} id="phone" placeholder="01XXXXXXXXX" type="tel" />
                  <IoCallOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-lg" />
                </div>
                {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone.message}</p>}
              </div>
              {/* Two Column Layout: Gender & DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender Radio Buttons */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]">
                    Gender <span className="text-red-500">*</span>
                  </label>

                  <div className="flex bg-surface border border-outline-variant rounded-lg p-1">
                    {/* Male */}
                    <label className="flex-1 py-2 text-center rounded-md font-medium transition-all duration-200 cursor-pointer text-[#434655] hover:bg-[#f3f3fe] has-checked:bg-primary has-checked:text-white" required {...register("Gender")}>
                      <input type="radio" name="gender" value="male" defaultChecked className="hidden" />
                      Male
                    </label>

                    {/* Female */}
                    <label className="flex-1 py-2 text-center rounded-md font-medium transition-all duration-200 cursor-pointer text-[#434655] hover:bg-[#f3f3fe] has-checked:bg-primary has-checked:text-white" required {...register("Gender")}>
                      <input type="radio" name="gender" value="female" className="hidden" />
                      Female
                    </label>
                  </div>
                </div>
                {/* Date of Birth */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-5 tracking-wider text-[#191b23]" htmlFor="dob">Date of Birth <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <input className={`w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2  ${errors.DateOfBirth ? "focus:ring-red-500" : "focus:ring-primary"} focus:border-transparent outline-none transition-all duration-200 font-normal`} id="dob" type="date" required {...register("DateOfBirth")} />
                  </div>
                  {errors.DateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.DateOfBirth.message}</p>}
                </div>
              </div>
              {/* Primary Button */}
              <button className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-[#2563eb]/90 cursor-pointer transition-all duration-200 active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading} type="submit">
                {isLoading ? <AiOutlineLoading3Quarters className="mx-auto animate-spin" /> : "Create Account"}
              </button>
              {/* Redirect Link */}
              <div className="text-center">
                Already have an account?
                <Link className="font-normal text-[#434655] hover:text-primary transition-colors inline-block group" to="/login">
                  <span className="ms-2 font-semibold text-primary underline underline-offset-4 group-hover:no-underline">Sign in</span>
                </Link>
              </div>
            </form>
          </section>
          {/* Side Graphics for high-end look (Hidden on mobile) */}
          <div className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 max-w-xs">
            <img className="rounded-xl shadow-2xl opacity-80 rotate-2 border-4 border-white" data-alt="A serene professional mental wellness office setting with soft blue lighting, white furniture, and large windows looking out to a misty garden. The mood is calm, safe, and professional, perfectly aligning with a minimalist therapeutic brand identity. Cinematic soft focus and natural morning light illuminate the peaceful space." src={registerImage1} />
          </div>
          <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 max-w-xs">
            <img className="rounded-xl shadow-2xl opacity-80 -rotate-2 border-4 border-white" data-alt="Macro photography of a crystal clear water surface with gentle ripples in shades of teal and sky blue. The lighting is diffused and airy, creating a sense of tranquil clarity and mental peace. This abstract nature visual reinforces a professional yet empathetic digital wellness experience." src={registerImage2} />
          </div>
        </main>
        {/* Footer Section (Simplified for focused page) */}
        <footer className="w-full py-4 bg-[#ededf9] dark:bg-[#e7e7f3] border-t border-outline-variant">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-semibold leading-4 text-[#434655]">© 2024 Safe Space. All rights reserved.</p>
            <nav className="flex gap-6">
              <a className="text-xs font-semibold leading-4 text-[#434655] hover:text-primary transition-colors" href="#">About</a>
              <a className="text-xs font-semibold leading-4 text-[#434655] hover:text-primary transition-colors" href="#">Privacy</a>
              <a className="text-xs font-semibold leading-4 text-[#434655] hover:text-primary transition-colors" href="#">Terms</a>
            </nav>
          </div>
        </footer>
      </div>

    </>
  )
}
