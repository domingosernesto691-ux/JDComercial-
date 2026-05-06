"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Users, ShoppingBag, BookOpen, FileText, 
  Briefcase, Settings, LogOut, Plus, Edit, Trash2, Eye,
  TrendingUp, DollarSign, Package, BarChart3, Search, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useStore, formatPrice, type Product, type Course, type BlogPost, type FreelanceService } from '@/lib/store'

const adminTabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Utilizadores', icon: Users },
  { id: 'products', label: 'Produtos', icon: ShoppingBag },
  { id: 'courses', label: 'Cursos', icon: BookOpen },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'services', label: 'Freelance', icon: Briefcase },
  { id: 'settings', label: 'Definições', icon: Settings },
]

export default function AdminPage() {
  const router = useRouter()
  const { 
    user, isAuthenticated, logout, users,
    products, courses, blogPosts, freelanceServices,
    addProduct, updateProduct, deleteProduct,
    addCourse, updateCourse, deleteCourse,
    addBlogPost, updateBlogPost, deleteBlogPost,
    addFreelanceService, updateFreelanceService, deleteFreelanceService
  } = useStore()
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'product' | 'course' | 'blog' | 'service'>('product')
  const [editingItem, setEditingItem] = useState<any>(null)
  
  // Form states
  const [formData, setFormData] = useState<any>({})
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }
  
  const stats = [
    { label: 'Utilizadores', value: users.length, icon: Users, color: 'bg-blue-500/20 text-blue-400', change: '+12%' },
    { label: 'Produtos', value: products.length, icon: Package, color: 'bg-green-500/20 text-green-400', change: '+5%' },
    { label: 'Cursos', value: courses.length, icon: BookOpen, color: 'bg-purple-500/20 text-purple-400', change: '+8%' },
    { label: 'Receita Total', value: 'Kz 2.5M', icon: DollarSign, color: 'bg-primary/20 text-primary', change: '+23%' },
  ]
  
  const openModal = (type: typeof modalType, item?: any) => {
    setModalType(type)
    setEditingItem(item || null)
    setFormData(item || {})
    setShowModal(true)
  }
  
  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({})
  }
  
  const handleSave = () => {
    if (modalType === 'product') {
      if (editingItem) {
        updateProduct(editingItem.id, formData)
      } else {
        addProduct({
          ...formData,
          sellerId: user.id,
          sellerName: user.name,
          rating: 5,
          reviews: 0,
          featured: false,
          affiliateCommission: 20
        })
      }
    } else if (modalType === 'course') {
      if (editingItem) {
        updateCourse(editingItem.id, formData)
      } else {
        addCourse({
          ...formData,
          rating: 5,
          students: 0,
          featured: false
        })
      }
    } else if (modalType === 'blog') {
      if (editingItem) {
        updateBlogPost(editingItem.id, formData)
      } else {
        addBlogPost({
          ...formData,
          author: user.name
        })
      }
    } else if (modalType === 'service') {
      if (editingItem) {
        updateFreelanceService(editingItem.id, formData)
      } else {
        addFreelanceService({
          ...formData,
          sellerId: user.id,
          sellerName: user.name,
          rating: 5,
          reviews: 0
        })
      }
    }
    closeModal()
  }
  
  const handleDelete = (type: string, id: string) => {
    if (!confirm('Tens certeza que queres eliminar?')) return
    
    if (type === 'product') deleteProduct(id)
    else if (type === 'course') deleteCourse(id)
    else if (type === 'blog') deleteBlogPost(id)
    else if (type === 'service') deleteFreelanceService(id)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card/50 border-r border-primary/10 p-4 z-50">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-white">
              JD
            </div>
            <span className="font-mono text-lg font-bold text-white">
              JD<span className="text-primary">Admin</span>
            </span>
          </Link>
          
          <nav className="space-y-1">
            {adminTabs.map(({ id, label, icon: Icon }) => (
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
            
            <hr className="border-primary/10 my-4" />
            
            <Link href="/dashboard">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <Eye className="h-5 w-5" />
                Ver Site
              </button>
            </Link>
            
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
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-mono text-2xl font-bold">
                {adminTabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo ao painel de administração
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-secondary/50 border-primary/20"
                />
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-white">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, color, change }) => (
                  <Card key={label} className="p-6 bg-card/50 border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs text-green-400 font-medium">{change}</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </Card>
                ))}
              </div>
              
              {/* Quick Stats */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/50 border-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mono font-bold">Vendas Recentes</h3>
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg" />
                          <div>
                            <p className="font-medium text-sm">Produto #{i}</p>
                            <p className="text-xs text-muted-foreground">Há {i} hora{i > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-primary">{formatPrice(15000 * i)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-6 bg-card/50 border-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mono font-bold">Novos Utilizadores</h3>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    {users.slice(0, 3).map((u) => (
                      <div key={u.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-white text-sm">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-secondary rounded">
                          {u.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          {/* Users Tab */}
          {activeTab === 'users' && (
            <Card className="p-6 bg-card/50 border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-bold">Lista de Utilizadores ({users.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-primary/5 hover:bg-secondary/20">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-white text-xs">
                              {u.name.charAt(0)}
                            </div>
                            <span className="font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            u.role === 'admin' ? 'bg-accent/20 text-accent' :
                            u.role === 'seller' ? 'bg-green-500/20 text-green-400' :
                            'bg-secondary text-muted-foreground'
                          }`}>
                            {u.role === 'admin' ? 'Admin' : u.role === 'seller' ? 'Vendedor' : 'Utilizador'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">
                          {new Date(u.createdAt).toLocaleDateString('pt-AO')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <Card className="p-6 bg-card/50 border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-bold">Produtos ({products.length})</h3>
                <Button onClick={() => openModal('product')} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <Image src={product.image} alt={product.title} fill className="object-cover" />
                    </div>
                    <h4 className="font-medium text-sm line-clamp-1">{product.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{product.sellerName}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-primary">{formatPrice(product.price)}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openModal('product', product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete('product', product.id)} className="text-accent hover:text-accent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <Card className="p-6 bg-card/50 border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-bold">Cursos ({courses.length})</h3>
                <Button onClick={() => openModal('course')} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Curso
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <h4 className="font-medium text-sm line-clamp-1">{course.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-primary">{formatPrice(course.price)}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openModal('course', course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete('course', course.id)} className="text-accent hover:text-accent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <Card className="p-6 bg-card/50 border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-bold">Artigos ({blogPosts.length})</h3>
                <Button onClick={() => openModal('blog')} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Artigo
                </Button>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-1">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">{post.author} - {post.category}</p>
                      <p className="text-xs text-muted-foreground">{post.views} visualizações</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openModal('blog', post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete('blog', post.id)} className="text-accent hover:text-accent">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <Card className="p-6 bg-card/50 border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-bold">Serviços Freelance ({freelanceServices.length})</h3>
                <Button onClick={() => openModal('service')} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Serviço
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {freelanceServices.map((service) => (
                  <div key={service.id} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                    <h4 className="font-medium text-sm line-clamp-1">{service.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{service.sellerName}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-primary">{formatPrice(service.price)}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openModal('service', service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete('service', service.id)} className="text-accent hover:text-accent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="p-6 bg-card/50 border-primary/10">
              <h3 className="font-mono font-bold mb-6">Definições do Site</h3>
              <div className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <Label>Nome do Site</Label>
                  <Input defaultValue="JDComercial" className="bg-secondary/50 border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input defaultValue="+244 926 588 191" className="bg-secondary/50 border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="contacto@jdcomercial.ao" className="bg-secondary/50 border-primary/20" />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Guardar Alterações
                </Button>
              </div>
            </Card>
          )}
        </main>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
          <div className="relative bg-card border border-primary/20 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-xl font-bold">
                {editingItem ? 'Editar' : 'Adicionar'} {
                  modalType === 'product' ? 'Produto' :
                  modalType === 'course' ? 'Curso' :
                  modalType === 'blog' ? 'Artigo' : 'Serviço'
                }
              </h3>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-secondary/50 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description || formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value, excerpt: e.target.value })}
                  className="bg-secondary/50 border-primary/20"
                  rows={3}
                />
              </div>
              
              {(modalType === 'product' || modalType === 'course' || modalType === 'service') && (
                <div className="space-y-2">
                  <Label>Preço (Kz)</Label>
                  <Input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="bg-secondary/50 border-primary/20"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="bg-secondary/50 border-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-secondary/50 border-primary/20"
                />
              </div>
              
              {modalType === 'course' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Duração</Label>
                      <Input
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="Ex: 20 horas"
                        className="bg-secondary/50 border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Aulas</Label>
                      <Input
                        type="number"
                        value={formData.lessons || ''}
                        onChange={(e) => setFormData({ ...formData, lessons: Number(e.target.value) })}
                        className="bg-secondary/50 border-primary/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Instrutor</Label>
                    <Input
                      value={formData.instructor || ''}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      className="bg-secondary/50 border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nível</Label>
                    <select
                      value={formData.level || 'iniciante'}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-primary/20 text-foreground"
                    >
                      <option value="iniciante">Iniciante</option>
                      <option value="intermedio">Intermédio</option>
                      <option value="avancado">Avançado</option>
                    </select>
                  </div>
                </>
              )}
              
              {modalType === 'service' && (
                <div className="space-y-2">
                  <Label>Tempo de Entrega</Label>
                  <Input
                    value={formData.deliveryTime || ''}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    placeholder="Ex: 3 dias"
                    className="bg-secondary/50 border-primary/20"
                  />
                </div>
              )}
              
              {modalType === 'blog' && (
                <div className="space-y-2">
                  <Label>Conteúdo</Label>
                  <Textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="bg-secondary/50 border-primary/20"
                    rows={6}
                  />
                </div>
              )}
              
              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={closeModal} className="flex-1 border-primary/20">
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                  {editingItem ? 'Guardar' : 'Adicionar'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
