import { useState } from 'react'
import PreRegister from '../authComponents/PreRegister'
import RegisterForm from '../authComponents/RegisterForm'
import VerificationForm from '../authComponents/VerficatioForm'
import Tools from '../../Addons/Tools'

export default function Register() {
  const [email, setEmail] = useState("")
  const hasRecommendedTests = localStorage.getItem("recommendedTests") !== null
  const [page, setPage] = useState(hasRecommendedTests ? "register-form" : "pre-register")
  return (
    <>
      {page === "pre-register" ? <PreRegister setPage={setPage}/> : page === "register-form" ? <RegisterForm setPage={setPage} setEmail={setEmail}/> : <VerificationForm setPage={setPage} email={email} />}
      <Tools style='m-5 md:m-10' auth={true}/>
    </>
  )
}
