import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'seller' | 'admin'
  avatar?: string
  phone?: string
  createdAt: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: 'curso' | 'ebook' | 'template' | 'software' | 'outro'
  image: string
  sellerId: string
  sellerName: string
  rating: number
  reviews: number
  featured: boolean
  affiliateCommission: number
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  image: string
  instructor: string
  duration: string
  lessons: number
  level: 'iniciante' | 'intermedio' | 'avancado'
  category: string
  featured: boolean
  rating: number
  students: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  category: string
  createdAt: string
  views: number
}

export interface FreelanceService {
  id: string
  title: string
  description: string
  price: number
  deliveryTime: string
  category: string
  sellerId: string
  sellerName: string
  sellerAvatar?: string
  rating: number
  reviews: number
  image: string
}

export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: string
  url: string
}

export interface CartItem {
  id: string
  type: 'product' | 'course' | 'service'
  title: string
  price: number
  image: string
  quantity: number
}

export interface SocialLink {
  id: string
  title: string
  url: string
  icon: string
  order: number
}

// Sample Data
const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Programação Web Completa: HTML, CSS, JavaScript',
    description: 'Aprenda desenvolvimento web do zero ao avançado com projetos práticos angolanos.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
    instructor: 'João Domingos',
    duration: '40 horas',
    lessons: 120,
    level: 'iniciante',
    category: 'Desenvolvimento Web',
    featured: true,
    rating: 4.9,
    students: 1250
  },
  {
    id: '2',
    title: 'Python para Iniciantes - Do Zero ao Primeiro Projeto',
    description: 'Domine Python com exemplos práticos e construa sua primeira aplicação.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600',
    instructor: 'Maria Santos',
    duration: '25 horas',
    lessons: 80,
    level: 'iniciante',
    category: 'Programação',
    featured: true,
    rating: 4.8,
    students: 980
  },
  {
    id: '3',
    title: 'Marketing Digital para Negócios Angolanos',
    description: 'Estratégias de marketing digital adaptadas ao mercado angolano.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    instructor: 'Carlos Mendes',
    duration: '30 horas',
    lessons: 65,
    level: 'intermedio',
    category: 'Marketing',
    featured: true,
    rating: 4.7,
    students: 750
  },
  {
    id: '4',
    title: 'React.js Avançado - Construa Apps Modernos',
    description: 'Aprenda React.js com TypeScript e construa aplicações profissionais.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
    instructor: 'João Domingos',
    duration: '35 horas',
    lessons: 90,
    level: 'avancado',
    category: 'Desenvolvimento Web',
    featured: false,
    rating: 4.9,
    students: 450
  },
  {
    id: '5',
    title: 'Design Gráfico com Canva e Photoshop',
    description: 'Crie designs profissionais para redes sociais e materiais impressos.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600',
    instructor: 'Ana Luísa',
    duration: '20 horas',
    lessons: 45,
    level: 'iniciante',
    category: 'Design',
    featured: false,
    rating: 4.6,
    students: 620
  },
  {
    id: '6',
    title: 'Empreendedorismo Digital em Angola',
    description: 'Como criar e escalar um negócio digital no mercado angolano.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600',
    instructor: 'Pedro Silva',
    duration: '28 horas',
    lessons: 55,
    level: 'intermedio',
    category: 'Negócios',
    featured: true,
    rating: 4.8,
    students: 890
  }
]

const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Template WordPress Premium - Negócios Angola',
    description: 'Template profissional para sites de negócios angolanos, totalmente personalizável.',
    price: 8500,
    category: 'template',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600',
    sellerId: '1',
    sellerName: 'João Domingos',
    rating: 4.8,
    reviews: 45,
    featured: true,
    affiliateCommission: 30,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'E-book: Guia Completo de Programação',
    description: 'Aprenda programação do zero com este guia completo em português.',
    price: 3500,
    category: 'ebook',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
    sellerId: '2',
    sellerName: 'Maria Santos',
    rating: 4.9,
    reviews: 128,
    featured: true,
    affiliateCommission: 40,
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    title: 'Pack de Ícones para UI/UX Design',
    description: '500+ ícones vetoriais para projetos de design modernos.',
    price: 2000,
    category: 'outro',
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=600',
    sellerId: '3',
    sellerName: 'Carlos Design',
    rating: 4.7,
    reviews: 89,
    featured: false,
    affiliateCommission: 25,
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    title: 'Sistema de Gestão para Lojas - Software',
    description: 'Software completo para gestão de stock, vendas e clientes.',
    price: 45000,
    category: 'software',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    sellerId: '1',
    sellerName: 'João Domingos',
    rating: 4.9,
    reviews: 34,
    featured: true,
    affiliateCommission: 20,
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    title: 'Planilhas Excel para Finanças Pessoais',
    description: 'Controle suas finanças com estas planilhas profissionais.',
    price: 1500,
    category: 'template',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
    sellerId: '4',
    sellerName: 'Ana Finanças',
    rating: 4.6,
    reviews: 156,
    featured: false,
    affiliateCommission: 35,
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    title: 'Curso em Vídeo: Edição de Vídeo Pro',
    description: 'Aprenda edição profissional com DaVinci Resolve e Premiere.',
    price: 22000,
    category: 'curso',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
    sellerId: '5',
    sellerName: 'Pedro Vídeos',
    rating: 4.8,
    reviews: 67,
    featured: true,
    affiliateCommission: 30,
    createdAt: '2024-03-01'
  }
]

const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Como Começar a Programar em Angola: Guia Completo 2024',
    excerpt: 'Descubra os melhores recursos, comunidades e oportunidades para começar sua carreira de programador em Angola.',
    content: 'Lorem ipsum dolor sit amet...',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
    author: 'João Domingos',
    category: 'Programação',
    createdAt: '2024-03-15',
    views: 2450
  },
  {
    id: '2',
    title: '5 Formas de Ganhar Dinheiro Online em Angola',
    excerpt: 'Conheça as melhores estratégias para monetizar suas habilidades digitais no mercado angolano.',
    content: 'Lorem ipsum dolor sit amet...',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600',
    author: 'Maria Santos',
    category: 'Negócios',
    createdAt: '2024-03-12',
    views: 3890
  },
  {
    id: '3',
    title: 'Melhores Ferramentas Gratuitas para Empreendedores',
    excerpt: 'Lista completa de ferramentas online gratuitas para impulsionar seu negócio digital.',
    content: 'Lorem ipsum dolor sit amet...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    author: 'Carlos Mendes',
    category: 'Ferramentas',
    createdAt: '2024-03-10',
    views: 1560
  },
  {
    id: '4',
    title: 'Marketing no WhatsApp: Estratégias para Angola',
    excerpt: 'Aprenda a usar o WhatsApp Business para aumentar suas vendas no mercado angolano.',
    content: 'Lorem ipsum dolor sit amet...',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600',
    author: 'Ana Marketing',
    category: 'Marketing',
    createdAt: '2024-03-08',
    views: 4120
  }
]

const sampleFreelanceServices: FreelanceService[] = [
  {
    id: '1',
    title: 'Criação de Website Profissional',
    description: 'Desenvolvo sites modernos e responsivos para seu negócio em Angola.',
    price: 50000,
    deliveryTime: '7 dias',
    category: 'Desenvolvimento Web',
    sellerId: '1',
    sellerName: 'João Domingos',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'
  },
  {
    id: '2',
    title: 'Design de Logotipo Profissional',
    description: 'Crio identidades visuais únicas e memoráveis para sua marca.',
    price: 15000,
    deliveryTime: '3 dias',
    category: 'Design Gráfico',
    sellerId: '2',
    sellerName: 'Ana Design',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600'
  },
  {
    id: '3',
    title: 'Gestão de Redes Sociais',
    description: 'Gerenciamento completo das suas redes sociais com conteúdo estratégico.',
    price: 35000,
    deliveryTime: 'Mensal',
    category: 'Marketing Digital',
    sellerId: '3',
    sellerName: 'Pedro Marketing',
    rating: 4.7,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600'
  },
  {
    id: '4',
    title: 'Edição de Vídeo Profissional',
    description: 'Edição de vídeos para YouTube, TikTok, Instagram e mais.',
    price: 8000,
    deliveryTime: '2 dias',
    category: 'Vídeo e Animação',
    sellerId: '4',
    sellerName: 'Carlos Vídeos',
    rating: 4.9,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600'
  },
  {
    id: '5',
    title: 'Tradução Português-Inglês',
    description: 'Tradução profissional de documentos, websites e conteúdos.',
    price: 2500,
    deliveryTime: '1 dia',
    category: 'Escrita e Tradução',
    sellerId: '5',
    sellerName: 'Maria Letras',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'
  },
  {
    id: '6',
    title: 'Consultoria de Negócios Digitais',
    description: 'Ajudo a estruturar e escalar seu negócio digital em Angola.',
    price: 25000,
    deliveryTime: '5 dias',
    category: 'Consultoria',
    sellerId: '6',
    sellerName: 'André Consultor',
    rating: 4.9,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600'
  }
]

const sampleTools: Tool[] = [
  {
    id: '1',
    name: 'Gerador de QR Code',
    description: 'Crie QR codes personalizados para seu negócio.',
    icon: 'QrCode',
    category: 'Utilidades',
    url: '/ferramentas/qrcode'
  },
  {
    id: '2',
    name: 'Conversor de Moeda AOA',
    description: 'Converta Kwanzas para outras moedas em tempo real.',
    icon: 'DollarSign',
    category: 'Finanças',
    url: '/ferramentas/conversor'
  },
  {
    id: '3',
    name: 'Compressor de Imagens',
    description: 'Reduza o tamanho de imagens sem perder qualidade.',
    icon: 'Image',
    category: 'Imagem',
    url: '/ferramentas/compressor'
  },
  {
    id: '4',
    name: 'Gerador de Senhas',
    description: 'Crie senhas seguras e aleatórias.',
    icon: 'Key',
    category: 'Segurança',
    url: '/ferramentas/senhas'
  },
  {
    id: '5',
    name: 'Calculadora de Juros',
    description: 'Calcule juros simples e compostos.',
    icon: 'Calculator',
    category: 'Finanças',
    url: '/ferramentas/juros'
  },
  {
    id: '6',
    name: 'Contador de Caracteres',
    description: 'Conte caracteres, palavras e parágrafos.',
    icon: 'Type',
    category: 'Texto',
    url: '/ferramentas/contador'
  },
  {
    id: '7',
    name: 'Gerador de Lorem Ipsum',
    description: 'Gere texto placeholder para seus projetos.',
    icon: 'FileText',
    category: 'Texto',
    url: '/ferramentas/lorem'
  },
  {
    id: '8',
    name: 'Paleta de Cores',
    description: 'Explore e copie códigos de cores.',
    icon: 'Palette',
    category: 'Design',
    url: '/ferramentas/cores'
  }
]

const sampleLinks: SocialLink[] = [
  { id: '1', title: 'WhatsApp', url: 'https://wa.me/244926588191', icon: 'MessageCircle', order: 1 },
  { id: '2', title: 'Instagram', url: 'https://instagram.com/jdcomercial', icon: 'Instagram', order: 2 },
  { id: '3', title: 'Facebook', url: 'https://facebook.com/jdcomercial', icon: 'Facebook', order: 3 },
  { id: '4', title: 'YouTube', url: 'https://youtube.com/@jdcomercial', icon: 'Youtube', order: 4 },
  { id: '5', title: 'TikTok', url: 'https://tiktok.com/@jdcomercial', icon: 'Music2', order: 5 },
  { id: '6', title: 'LinkedIn', url: 'https://linkedin.com/company/jdcomercial', icon: 'Linkedin', order: 6 },
  { id: '7', title: 'Loja Online', url: '/produtos', icon: 'ShoppingBag', order: 7 },
  { id: '8', title: 'Cursos', url: '/cursos', icon: 'GraduationCap', order: 8 }
]

// Store
interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string, phone?: string) => boolean
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  
  // Data
  courses: Course[]
  products: Product[]
  blogPosts: BlogPost[]
  freelanceServices: FreelanceService[]
  tools: Tool[]
  socialLinks: SocialLink[]
  users: User[]
  
  // Cart
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // Admin functions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addCourse: (course: Omit<Course, 'id'>) => void
  updateCourse: (id: string, updates: Partial<Course>) => void
  deleteCourse: (id: string) => void
  addBlogPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'views'>) => void
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void
  deleteBlogPost: (id: string) => void
  addFreelanceService: (service: Omit<FreelanceService, 'id'>) => void
  updateFreelanceService: (id: string, updates: Partial<FreelanceService>) => void
  deleteFreelanceService: (id: string) => void
  updateSocialLinks: (links: SocialLink[]) => void
  
  // Navigation
  currentPage: string
  setCurrentPage: (page: string) => void
}

const adminUser: User = {
  id: 'admin-1',
  name: 'Administrador JD',
  email: 'admin@jdcomercial.ao',
  role: 'admin',
  phone: '926588191',
  createdAt: '2024-01-01'
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      courses: sampleCourses,
      products: sampleProducts,
      blogPosts: sampleBlogPosts,
      freelanceServices: sampleFreelanceServices,
      tools: sampleTools,
      socialLinks: sampleLinks,
      users: [adminUser],
      cart: [],
      currentPage: 'home',
      
      // Auth actions
      login: (email: string, password: string) => {
        // Admin login
        if (email === 'admin@jdcomercial.ao' && password === 'admin123') {
          set({ user: adminUser, isAuthenticated: true })
          return true
        }
        
        // Check registered users
        const users = get().users
        const foundUser = users.find(u => u.email === email)
        if (foundUser) {
          set({ user: foundUser, isAuthenticated: true })
          return true
        }
        
        return false
      },
      
      register: (name: string, email: string, password: string, phone?: string) => {
        const users = get().users
        if (users.find(u => u.email === email)) {
          return false
        }
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: 'user',
          phone,
          createdAt: new Date().toISOString()
        }
        
        set({ 
          users: [...users, newUser],
          user: newUser,
          isAuthenticated: true
        })
        return true
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      updateUser: (updates: Partial<User>) => {
        const user = get().user
        if (user) {
          const updatedUser = { ...user, ...updates }
          set({ user: updatedUser })
          
          // Update in users array
          const users = get().users.map(u => 
            u.id === user.id ? updatedUser : u
          )
          set({ users })
        }
      },
      
      // Cart actions
      addToCart: (item) => {
        const cart = get().cart
        const existing = cart.find(c => c.id === item.id)
        
        if (existing) {
          set({
            cart: cart.map(c => 
              c.id === item.id 
                ? { ...c, quantity: c.quantity + 1 }
                : c
            )
          })
        } else {
          set({ cart: [...cart, { ...item, quantity: 1 }] })
        }
      },
      
      removeFromCart: (id) => {
        set({ cart: get().cart.filter(c => c.id !== id) })
      },
      
      updateCartQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
        } else {
          set({
            cart: get().cart.map(c => 
              c.id === id ? { ...c, quantity } : c
            )
          })
        }
      },
      
      clearCart: () => set({ cart: [] }),
      
      // Admin actions
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: `product-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0]
        }
        set({ products: [...get().products, newProduct] })
      },
      
      updateProduct: (id, updates) => {
        set({
          products: get().products.map(p => 
            p.id === id ? { ...p, ...updates } : p
          )
        })
      },
      
      deleteProduct: (id) => {
        set({ products: get().products.filter(p => p.id !== id) })
      },
      
      addCourse: (course) => {
        const newCourse: Course = {
          ...course,
          id: `course-${Date.now()}`
        }
        set({ courses: [...get().courses, newCourse] })
      },
      
      updateCourse: (id, updates) => {
        set({
          courses: get().courses.map(c => 
            c.id === id ? { ...c, ...updates } : c
          )
        })
      },
      
      deleteCourse: (id) => {
        set({ courses: get().courses.filter(c => c.id !== id) })
      },
      
      addBlogPost: (post) => {
        const newPost: BlogPost = {
          ...post,
          id: `post-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
          views: 0
        }
        set({ blogPosts: [...get().blogPosts, newPost] })
      },
      
      updateBlogPost: (id, updates) => {
        set({
          blogPosts: get().blogPosts.map(p => 
            p.id === id ? { ...p, ...updates } : p
          )
        })
      },
      
      deleteBlogPost: (id) => {
        set({ blogPosts: get().blogPosts.filter(p => p.id !== id) })
      },
      
      addFreelanceService: (service) => {
        const newService: FreelanceService = {
          ...service,
          id: `service-${Date.now()}`
        }
        set({ freelanceServices: [...get().freelanceServices, newService] })
      },
      
      updateFreelanceService: (id, updates) => {
        set({
          freelanceServices: get().freelanceServices.map(s => 
            s.id === id ? { ...s, ...updates } : s
          )
        })
      },
      
      deleteFreelanceService: (id) => {
        set({ freelanceServices: get().freelanceServices.filter(s => s.id !== id) })
      },
      
      updateSocialLinks: (links) => {
        set({ socialLinks: links })
      },
      
      // Navigation
      setCurrentPage: (page) => set({ currentPage: page })
    }),
    {
      name: 'jdcomercial-storage'
    }
  )
)

// Helper to format price in Kwanzas
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0
  }).format(price)
}

// WhatsApp number
export const WHATSAPP_NUMBER = '244926588191'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
