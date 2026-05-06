"use client"

import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, BookOpen, ShoppingBag, Briefcase, Wrench, 
  FileText, Users, Star, TrendingUp, CheckCircle, Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useStore, formatPrice, WHATSAPP_LINK } from '@/lib/store'

const categories = [
  { icon: BookOpen, label: 'Cursos', href: '/cursos', color: 'bg-blue-500/20 text-blue-400', description: 'Aprenda novas habilidades' },
  { icon: ShoppingBag, label: 'Loja', href: '/produtos', color: 'bg-green-500/20 text-green-400', description: 'Produtos digitais' },
  { icon: FileText, label: 'Blog', href: '/blog', color: 'bg-purple-500/20 text-purple-400', description: 'Artigos e tutoriais' },
  { icon: Briefcase, label: 'Freelance', href: '/freelance', color: 'bg-orange-500/20 text-orange-400', description: 'Contrate serviços' },
  { icon: Wrench, label: 'Ferramentas', href: '/ferramentas', color: 'bg-cyan-500/20 text-cyan-400', description: 'Ferramentas grátis' },
  { icon: Users, label: 'Comunidade', href: '/links', color: 'bg-pink-500/20 text-pink-400', description: 'Conecte-se' },
]

const stats = [
  { value: '2.500+', label: 'Alunos' },
  { value: '50+', label: 'Cursos' },
  { value: '100+', label: 'Produtos' },
  { value: '98%', label: 'Satisfação' },
]

const features = [
  'Pagamentos em Kwanzas (Multicaixa Express, Unitel Money)',
  'Suporte em português angolano',
  'Conteúdos adaptados ao mercado local',
  'Certificados reconhecidos',
  'Acesso vitalício aos cursos',
  'Comunidade ativa de angolanos',
]

export default function HomePage() {
  const { courses, products, blogPosts } = useStore()
  
  const featuredCourses = courses.filter(c => c.featured).slice(0, 3)
  const featuredProducts = products.filter(p => p.featured).slice(0, 3)
  const recentPosts = blogPosts.slice(0, 3)
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span className="text-2xl">🇦🇴</span>
              <span className="text-sm font-medium text-foreground">100% Angolano - Plataforma all-in-one</span>
            </div>
            
            {/* Title */}
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              O ecossistema digital que{' '}
              <span className="text-primary">Angola</span>{' '}
              merece.
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Aprende a programar, lança produtos digitais, escreve no blog, 
              oferece serviços freelance e usa ferramentas — tudo num só lugar.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
              <Link href="/cadastro">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full">
                  Começar grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cursos">
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 px-8 py-6 text-lg rounded-full">
                  <Play className="mr-2 h-5 w-5" />
                  Ver cursos
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-mono text-3xl md:text-4xl font-bold text-primary">{value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
              Explore o nosso ecossistema
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tudo o que precisas para crescer profissionalmente, num só lugar.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ icon: Icon, label, href, color, description }) => (
              <Link key={href} href={href}>
                <Card className="group p-6 bg-card/50 border-primary/10 hover:border-primary/30 hover:bg-card transition-all h-full cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{label}</h3>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-mono text-3xl md:text-4xl font-bold mb-2">
                Cursos em Destaque
              </h2>
              <p className="text-muted-foreground">
                Aprenda com os melhores instrutores angolanos
              </p>
            </div>
            <Link href="/cursos">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hidden md:flex">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Link key={course.id} href={`/cursos/${course.id}`}>
                <Card className="group overflow-hidden bg-card/50 border-primary/10 hover:border-primary/30 transition-all h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-sm text-muted-foreground">({course.students})</span>
                      </div>
                      <span className="font-mono font-bold text-primary">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/cursos">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Ver todos os cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6">
                Porquê escolher a{' '}
                <span className="text-primary">JDComercial</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Somos a primeira plataforma 100% angolana focada em criar 
                um ecossistema digital completo para empreendedores e criadores.
              </p>
              
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-full sm:w-auto">
                    Falar no WhatsApp
                  </Button>
                </a>
                <Link href="/sobre">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 w-full sm:w-auto">
                    Saber mais
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/30 to-primary/30 p-8 rounded-3xl border-2 border-primary/30">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center font-bold text-2xl text-white">
                      JD
                    </div>
                    <div>
                      <h3 className="font-mono text-xl font-bold">JDComercial</h3>
                      <p className="text-sm text-muted-foreground">Ecossistema Digital</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary/50 rounded-xl p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Crescimento</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-4 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Comunidade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-mono text-3xl md:text-4xl font-bold mb-2">
                Produtos Digitais
              </h2>
              <p className="text-muted-foreground">
                Templates, e-books, softwares e mais
              </p>
            </div>
            <Link href="/produtos">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hidden md:flex">
                Ver loja
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/produtos/${product.id}`}>
                <Card className="group overflow-hidden bg-card/50 border-primary/10 hover:border-primary/30 transition-all h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full capitalize">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <span className="font-mono font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/produtos">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Ver toda a loja
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-mono text-3xl md:text-4xl font-bold mb-2">
                Blog JDComercial
              </h2>
              <p className="text-muted-foreground">
                Artigos, tutoriais e dicas para empreendedores
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hidden md:flex">
                Ver blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="group overflow-hidden bg-card/50 border-primary/10 hover:border-primary/30 transition-all h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-card/80 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>{post.author}</span>
                      <span>-</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('pt-AO')}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/blog">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Ver todos os artigos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar a tua jornada digital?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junta-te a milhares de angolanos que estão a transformar suas carreiras 
            e negócios através da nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cadastro">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                Criar conta grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                Falar no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
