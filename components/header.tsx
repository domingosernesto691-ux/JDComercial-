"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, X, ShoppingCart, User, LogOut, 
  Shield, Home, BookOpen, ShoppingBag, FileText, 
  Briefcase, Wrench, LinkIcon 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { useStore } from '@/lib/store'

const navLinks = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/cursos', label: 'Cursos', icon: BookOpen },
  { href: '/produtos', label: 'Loja', icon: ShoppingBag },
  { href: '/blog', label: 'Blog', icon: FileText },
  { href: '/freelance', label: 'Freelance', icon: Briefcase },
  { href: '/ferramentas', label: 'Ferramentas', icon: Wrench },
  { href: '/links', label: 'Links', icon: LinkIcon },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout, cart } = useStore()
  
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1a0f0a]/98 to-[#2d1810]/98 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-black/30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center font-bold text-sm md:text-base text-white shadow-lg group-hover:scale-105 transition-transform">
                JD
              </div>
              <span className="font-mono text-lg md:text-xl font-bold text-white">
                JD<span className="text-primary">Comercial</span>
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Cart */}
              <Link href="/carrinho">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              {/* User Menu */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-primary/20">
                    <div className="px-3 py-2">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Minha Conta
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer text-accent">
                          <Shield className="mr-2 h-4 w-4" />
                          Painel Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-accent">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 md:px-6">
                    Entrar
                  </Button>
                </Link>
              )}
              
              {/* Admin Quick Access */}
              {user?.role === 'admin' && (
                <Link href="/admin" className="hidden md:block">
                  <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-white">
                    <Shield className="h-4 w-4 mr-1" />
                    Admin
                  </Button>
                </Link>
              )}
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-[#1a0f0a] to-[#2d1810] shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-primary/20">
              <span className="font-mono text-xl font-bold text-white">
                JD<span className="text-primary">Comercial</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                        pathname === href
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-primary/20 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5"
                    >
                      <User className="h-5 w-5" />
                      Minha Conta
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-accent hover:bg-accent/10"
                      >
                        <Shield className="h-5 w-5" />
                        Painel Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-accent hover:bg-accent/10 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Entrar / Cadastrar
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
