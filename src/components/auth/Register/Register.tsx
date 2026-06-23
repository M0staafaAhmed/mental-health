import { useState } from 'react'
import PreRegister from '../authComponents/PreRegister'
import RegisterForm from '../authComponents/RegisterForm'
import VerificationForm from '../authComponents/VerficatioForm'

export default function Register() {
  const [page, setPage] = useState("pre-register")
  const [email, setEmail] = useState("")
  return (
    <>
      {page === "pre-register" ? <PreRegister setPage={setPage}/> : page === "register-form" ? <RegisterForm setPage={setPage} setEmail={setEmail}/> : <VerificationForm setPage={setPage} email={email} />}
    </>
  )
}
