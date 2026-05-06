"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  User, Settings, ShoppingBag, BookOpen, FileText, 
  Briefcase, CreditCard, LogOut, Plus, Edit, Eye,
  TrendingUp, DollarSign, Users, Package
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useStore, formatPrice, WHATSAPP_LINK } from '@/lib/store'

const tabs = [
  { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
  { id: 'products', label: 'Meus Produtos', icon: ShoppingBag },
  { id: 'courses', label: 'Meus Cursos', icon: BookOpen },
  { id: 'services', label: 'Meus Serviços', icon: Briefcase },
  { id: 'purchases', label: 'Compras', icon: CreditCard },
  { id: 'profile', label: 'Perfil', icon: User },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, updateUser, products, courses, freelanceServices } = useStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])
  
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      })
    }
  }, [user])
  
  if (!isAuthenticated || !user) {
    return null
  }
  
  // Filter user's items
  const myProducts = products.filter(p => p.sellerId === user.id)
  const myCourses = courses.filter(c => c.instructor === user.name)
  const myServices = freelanceServices.filter(s => s.sellerId === user.id)
  
  const handleSaveProfile = () => {
    updateUser(profileData)
    setEditingProfile(false)
  }
  
  const handleBecomeSeller = () => {
    updateUser({ role: 'seller' })
  }
  
  const stats = [
    { label: 'Produtos', value: myProducts.length, icon: Package, color: 'text-blue-400' },
    { label: 'Serviços', value: myServices.length, icon: Briefcase, color: 'text-green-400' },
    { label: 'Vendas', value: 0, icon: DollarSign, color: 'text-primary' },
    { label: 'Clientes', value: 0, icon: Users, color: 'text-purple-400' },
  ]
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-24 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-mono text-3xl font-bold mb-2">
              Olá, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo ao teu painel de controlo.
              {user.role === 'user' && ' Torna-te vendedor para começar a vender.'}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-4 bg-card/50 border-primary/10 sticky top-24">
                <nav className="space-y-1">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  ))}
                  
                  <hr className="border-primary/10 my-3" />
                  
                  {user.role === 'admin' && (
                    <Link href="/admin">
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-accent hover:bg-accent/10 transition-colors">
                        <Settings className="h-5 w-5" />
                        Painel Admin
                      </button>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      logout()
                      router.push('/')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-accent hover:bg-accent/10 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Sair
                  </button>
                </nav>
              </Card>
            </div>
            
            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map(({ label, value, icon: Icon, color }) => (
                      <Card key={label} className="p-4 bg-card/50 border-primary/10">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-secondary ${color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{value}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Become Seller CTA */}
                  {user.role === 'user' && (
                    <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                          <h3 className="font-mono text-xl font-bold mb-2">
                            Quer vender na JDComercial?
                          </h3>
                          <p className="text-muted-foreground">
                            Torna-te vendedor e começa a ganhar dinheiro com os teus produtos digitais.
                          </p>
                        </div>
                        <Button 
                          onClick={handleBecomeSeller}
                          className="bg-primary hover:bg-primary/90 shrink-0"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Tornar-me Vendedor
                        </Button>
                      </div>
                    </Card>
                  )}
                  
                  {/* Quick Actions */}
                  {(user.role === 'seller' || user.role === 'admin') && (
                    <Card className="p-6 bg-card/50 border-primary/10">
                      <h3 className="font-mono text-lg font-bold mb-4">Acções Rápidas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero adicionar um novo produto na JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-primary/20 hover:bg-primary/10">
                            <ShoppingBag className="h-6 w-6" />
                            <span className="text-xs">Novo Produto</span>
                          </Button>
                        </a>
                        <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero adicionar um novo curso na JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-primary/20 hover:bg-primary/10">
                            <BookOpen className="h-6 w-6" />
                            <span className="text-xs">Novo Curso</span>
                          </Button>
                        </a>
                        <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero oferecer um serviço de freelance na JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-primary/20 hover:bg-primary/10">
                            <Briefcase className="h-6 w-6" />
                            <span className="text-xs">Novo Serviço</span>
                          </Button>
                        </a>
                        <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero publicar um artigo no blog da JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2 border-primary/20 hover:bg-primary/10">
                            <FileText className="h-6 w-6" />
                            <span className="text-xs">Novo Artigo</span>
                          </Button>
                        </a>
                      </div>
                    </Card>
                  )}
                </>
              )}
              
              {/* Products Tab */}
              {activeTab === 'products' && (
                <Card className="p-6 bg-card/50 border-primary/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-mono text-lg font-bold">Meus Produtos</h3>
                    <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero adicionar um novo produto na JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </a>
                  </div>
                  
                  {myProducts.length > 0 ? (
                    <div className="space-y-4">
                      {myProducts.map(product => (
                        <div key={product.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                          <div className="w-16 h-16 bg-secondary rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.title}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ainda não tens produtos.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Contacta-nos pelo WhatsApp para adicionar.
                      </p>
                    </div>
                  )}
                </Card>
              )}
              
              {/* Courses Tab */}
              {activeTab === 'courses' && (
                <Card className="p-6 bg-card/50 border-primary/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-mono text-lg font-bold">Meus Cursos</h3>
                    <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero adicionar um novo curso na JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </a>
                  </div>
                  
                  {myCourses.length > 0 ? (
                    <div className="space-y-4">
                      {myCourses.map(course => (
                        <div key={course.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                          <div className="w-16 h-16 bg-secondary rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(course.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ainda não tens cursos.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Contacta-nos pelo WhatsApp para adicionar.
                      </p>
                    </div>
                  )}
                </Card>
              )}
              
              {/* Services Tab */}
              {activeTab === 'services' && (
                <Card className="p-6 bg-card/50 border-primary/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-mono text-lg font-bold">Meus Serviços</h3>
                    <a href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Olá! Quero oferecer um serviço de freelance na JDComercial.')}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </a>
                  </div>
                  
                  {myServices.length > 0 ? (
                    <div className="space-y-4">
                      {myServices.map(service => (
                        <div key={service.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                          <div className="w-16 h-16 bg-secondary rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium">{service.title}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(service.price)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ainda não tens serviços.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Contacta-nos pelo WhatsApp para adicionar.
                      </p>
                    </div>
                  )}
                </Card>
              )}
              
              {/* Purchases Tab */}
              {activeTab === 'purchases' && (
                <Card className="p-6 bg-card/50 border-primary/10">
                  <h3 className="font-mono text-lg font-bold mb-6">Minhas Compras</h3>
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Ainda não fizeste compras.</p>
                    <div className="mt-4 flex gap-4 justify-center">
                      <Link href="/cursos">
                        <Button variant="outline" className="border-primary/20">Ver Cursos</Button>
                      </Link>
                      <Link href="/produtos">
                        <Button className="bg-primary hover:bg-primary/90">Ver Produtos</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card className="p-6 bg-card/50 border-primary/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-mono text-lg font-bold">Meu Perfil</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="border-primary/20"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {editingProfile ? 'Cancelar' : 'Editar'}
                    </Button>
                  </div>
                  
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Nome</Label>
                        <Input
                          id="edit-name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="bg-secondary/50 border-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="bg-secondary/50 border-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Telefone</Label>
                        <Input
                          id="edit-phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="bg-secondary/50 border-primary/20"
                        />
                      </div>
                      <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                        Guardar Alterações
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{user.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {user.role === 'admin' ? 'Administrador' : user.role === 'seller' ? 'Vendedor' : 'Utilizador'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="p-4 bg-secondary/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                          <p className="font-medium">{user.phone || 'Não definido'}</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Membro desde</p>
                          <p className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString('pt-AO')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
