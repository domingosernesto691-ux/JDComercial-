"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Star, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useStore, formatPrice, WHATSAPP_LINK } from '@/lib/store'

const categories = ['Todos', 'Desenvolvimento Web', 'Design Gráfico', 'Marketing Digital', 'Vídeo e Animação', 'Escrita e Tradução', 'Consultoria']

export default function FreelancePage() {
  const { freelanceServices, addToCart } = useStore()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  
  const filteredServices = freelanceServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase()) ||
                         service.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const handleContact = (service: typeof freelanceServices[0]) => {
    const whatsappMessage = encodeURIComponent(
      `Olá! Tenho interesse no serviço "${service.title}" por ${formatPrice(service.price)}. Gostaria de mais detalhes.`
    )
    window.open(`${WHATSAPP_LINK}?text=${whatsappMessage}`, '_blank')
  }
  
  const handleAddToCart = (service: typeof freelanceServices[0]) => {
    addToCart({
      id: `service-${service.id}`,
      type: 'service',
      title: service.title,
      price: service.price,
      image: service.image
    })
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 bg-gradient-to-b from-orange-500/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">
              Serviços <span className="text-primary">Freelance</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Encontre profissionais angolanos qualificados para o seu projeto. 
              Design, programação, marketing e muito mais.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Que serviço procura?"
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
              <span className="text-sm font-medium">Categoria:</span>
            </div>
            
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
          </div>
          
          {/* Results count */}
          <p className="text-muted-foreground mb-6">
            {filteredServices.length} serviço{filteredServices.length !== 1 ? 's' : ''} encontrado{filteredServices.length !== 1 ? 's' : ''}
          </p>
          
          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="group overflow-hidden bg-card/50 border-primary/10 hover:border-primary/30 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-card/90 text-foreground text-xs font-semibold rounded-full">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    {/* Seller Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-white text-sm">
                        {service.sellerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{service.sellerName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-primary fill-primary" />
                          <span className="text-xs font-medium">{service.rating}</span>
                          <span className="text-xs text-muted-foreground">({service.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Clock className="h-4 w-4" />
                      <span>Entrega em {service.deliveryTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                      <div>
                        <p className="text-xs text-muted-foreground">A partir de</p>
                        <span className="font-mono text-xl font-bold text-primary">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(service)}
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          Adicionar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleContact(service)}
                          className="bg-[#25D366] hover:bg-[#25D366]/90"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum serviço encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou pesquisar por outros termos.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-3xl font-bold mb-4">
            És um freelancer talentoso?
          </h2>
          <p className="text-muted-foreground mb-6">
            Oferece os teus serviços na JDComercial e alcance milhares de clientes angolanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Começar a Vender
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
