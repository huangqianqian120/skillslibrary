'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const translations = {
  en: {
    title: 'Sign In',
    subtitle: 'Sign in to your account',
    emailPlaceholder: 'your@email.com',
    sendCode: 'Send Code',
    codePlaceholder: 'Enter verification code',
    signIn: 'Sign In',
    signInWithGithub: 'Continue with GitHub',
    signInWithEmail: 'Continue with Email',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    backToHome: 'Back to Home',
    codeSent: 'Verification code sent!',
    invalidCode: 'Please enter the 6-digit code',
  },
  zh: {
    title: '登录',
    subtitle: '登录您的账户',
    emailPlaceholder: 'your@email.com',
    sendCode: '发送验证码',
    codePlaceholder: '输入验证码',
    signIn: '登录',
    signInWithGithub: '使用 GitHub 登录',
    signInWithEmail: '使用邮箱登录',
    noAccount: '还没有账户？',
    signUp: '注册',
    backToHome: '返回首页',
    codeSent: '验证码已发送！',
    invalidCode: '请输入6位数验证码',
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [lang, setLang] = useState<'en' | 'zh'>('zh')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const t = translations[lang]

  const handleSendCode = async () => {
    if (!email) return
    setLoading(true)
    // 模拟发送验证码
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCodeSent(true)
    setLoading(false)
  }

  const handleEmailLogin = async () => {
    if (!email || !code) return
    setLoading(true)
    await signIn('email', {
      email,
      code,
      redirect: false,
    })
    setLoading(false)
    router.push('/')
  }

  const handleGithubLogin = () => {
    signIn('github', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-medium text-gray-900">技能库</h1>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Language Switch */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('zh')}
                className={`px-3 py-1 text-xs rounded-md transition-all ${
                  lang === 'zh' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                中文
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">{t.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{t.subtitle}</p>
          </div>

          {/* GitHub Login */}
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 404 1.3.003-.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t.signInWithGithub}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="text-sm text-gray-400">或</span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>

          {/* Email Login */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">邮箱</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-200 focus:bg-white transition-all"
                />
                <button
                  onClick={handleSendCode}
                  disabled={!email || loading || codeSent}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {codeSent ? t.codeSent : t.sendCode}
                </button>
              </div>
            </div>

            {codeSent && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">验证码</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t.codePlaceholder}
                  maxLength={6}
                  className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-200 focus:bg-white transition-all"
                />
              </div>
            )}

            {codeSent && (
              <button
                onClick={handleEmailLogin}
                disabled={!code || loading}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.signIn}
              </button>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  )
}
