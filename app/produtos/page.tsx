"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Star, ShoppingCart, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useStore, formatPrice, WHATSAPP_LINK } from '@/lib/store'

const categories = ['Todos', 'curso', 'ebook', 'template', 'software', 'outro']

export default function ProdutosPage() {
  const { products, addToCart } = useStore()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [sortBy, setSortBy] = useState('featured')
  
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  // Sort
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'featured') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }
  
  const handleBuy = (product: typeof products[0]) => {
    const whatsappMessage = encodeURIComponent(
      `Olá! Quero comprar "${product.title}" por ${formatPrice(product.price)}. Como faço o pagamento?`
    )
    window.open(`${WHATSAPP_LINK}?text=${whatsappMessage}`, '_blank')
  }
  
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: `product-${product.id}`,
      type: 'product',
      title: product.title,
      price: product.price,
      image: product.image
    })
  }
  
  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'Todos': 'Todos',
      'curso': 'Cursos',
      'ebook': 'E-books',
      'template': 'Templates',
      'software': 'Software',
      'outro': 'Outros'
    }
    return labels[cat] || cat
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 bg-gradient-to-b from-accent/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-mono text-4xl md:text-5xl font-bold mb-4">
              Loja <span className="text-primary">Digital</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Descubra produtos digitais de alta qualidade criados por empreendedores angolanos. 
              Templates, e-books, software e muito mais.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar produtos..."
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
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Categoria:</span>
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
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-2 lg:ml-auto">
              <span className="text-sm font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm border-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Destaque</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Avaliação</option>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <p className="text-muted-foreground mb-6">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden bg-card/50 border-primary/10 hover:border-primary/30 transition-all">
                  <Link href={`/produtos/${product.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full capitalize">
                          {getCategoryLabel(product.category)}
                        </span>
                        {product.featured && (
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                            Destaque
                          </span>
                        )}
                      </div>
                      {product.affiliateCommission > 0 && (
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {product.affiliateCommission}% afiliado
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/produtos/${product.id}`}>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <p className="text-xs text-muted-foreground mb-3">
                      por {product.sellerName}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                      <span className="font-mono text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAddToCart(product)}
                          className="h-8 w-8 hover:bg-primary/10"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBuy(product)}
                          className="bg-primary hover:bg-primary/90 text-xs px-3"
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
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou pesquisar por outros termos.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono text-3xl font-bold mb-4">
            Quer vender os teus produtos digitais?
          </h2>
          <p className="text-muted-foreground mb-6">
            Cria uma conta gratuita e começa a vender para milhares de clientes angolanos. 
            Ganhe comissões como afiliado ou vendedor.
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
