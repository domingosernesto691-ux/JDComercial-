"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useStore, formatPrice, WHATSAPP_LINK } from '@/lib/store'

const categories = ['Todos', 'Desenvolvimento Web', 'Programação', 'Marketing', 'Design', 'Negócios']
const levels = ['Todos', 'iniciante', 'intermedio', 'avancado']

export default function CursosPage() {
  const { courses, addToCart } = useStore()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedLevel, setSelectedLevel] = useState('Todos')
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'Todos' || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })
  
  const handleBuy = (course: typeof courses[0]) => {
    const whatsappMessage = encodeURIComponent(
      `Olá! Tenho interesse no curso "${course.title}" por ${formatPrice(course.price)}. Gostaria de mais informações.`
    )
    window.open(`${WHATSAPP_LINK}?text=${whatsappMessage}`, '_blank')
  }
  
  const handleAddToCart = (course: typeof courses[0]) => {
    addToCart({
      id: `course-${course.id}`,
      type: 'course',
      title: course.title,
      price: course.price,
      image: course.image
    })
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">
              Cursos <span className="text-primary">Online</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Aprenda novas habilidades com os melhores instrutores angolanos. 
              Cursos práticos, actualizados e com certificado.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar cursos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 py-6 bg-card border-primary/20 rounded-full text-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters & Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Level Filter */}
            <div className="flex flex-wrap gap-2 md:ml-auto">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                    selectedLevel === level
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {level === 'Todos' ? 'Todos os Níveis' : level}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results count */}
          <p className="text-muted-foreground mb-6">
            {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
          </p>
          
          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden bg-card/50 border-primary/10 hover:border-primary/30 transition-all">
                  <Link href={`/cursos/${course.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          {course.category}
                        </span>
                        {course.featured && (
                          <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                            Destaque
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-3 py-1 bg-card/90 text-foreground text-xs font-semibold rounded-full capitalize">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-5">
                    <Link href={`/cursos/${course.id}`}>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} aulas
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        por {course.instructor}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                      <span className="font-mono text-xl font-bold text-primary">
                        {formatPrice(course.price)}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(course)}
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          Adicionar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBuy(course)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Comprar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou pesquisar por outros termos.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-3xl font-bold mb-4">
            Quer vender os teus cursos aqui?
          </h2>
          <p className="text-muted-foreground mb-6">
            Torna-te um instrutor na JDComercial e alcança milhares de alunos angolanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Tornar-se Instrutor
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                Saber Mais
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
