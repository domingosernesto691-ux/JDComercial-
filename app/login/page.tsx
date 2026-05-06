"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const success = login(email, password)
    
    if (success) {
      // Check if admin
      if (email === 'admin@jdcomercial.ao') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      setError('Email ou senha incorrectos. Tente novamente.')
    }
    
    setLoading(false)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-lg text-white">
            JD
          </div>
          <span className="font-mono text-2xl font-bold text-white">
            JD<span className="text-primary">Comercial</span>
          </span>
        </Link>
        
        <Card className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="font-mono text-2xl font-bold mb-2">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">
              Entre na tua conta para continuar
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg text-accent text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary/50 border-primary/20"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="A tua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-secondary/50 border-primary/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'A entrar...' : 'Entrar'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Não tens conta?{' '}
              <Link href="/cadastro" className="text-primary hover:underline font-medium">
                Criar conta grátis
              </Link>
            </p>
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-primary/10">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Credenciais de demonstração:
            </p>
            <div className="text-xs text-center space-y-1">
              <p>
                <strong className="text-primary">Admin:</strong>{' '}
                admin@jdcomercial.ao / admin123
              </p>
            </div>
          </div>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-8">
          Ao entrar, concordas com os nossos{' '}
          <Link href="/termos" className="text-primary hover:underline">
            Termos de Uso
          </Link>{' '}
          e{' '}
          <Link href="/privacidade" className="text-primary hover:underline">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}
