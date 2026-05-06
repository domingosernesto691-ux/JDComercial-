"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { useStore, formatPrice, WHATSAPP_LINK } from '@/lib/store'

export default function CarrinhoPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore()
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = subtotal // Add taxes/fees if needed
  
  const handleCheckout = () => {
    const itemsList = cart.map(item => 
      `- ${item.title} (x${item.quantity}): ${formatPrice(item.price * item.quantity)}`
    ).join('\n')
    
    const message = encodeURIComponent(
      `Olá! Quero finalizar a minha compra:\n\n${itemsList}\n\nTotal: ${formatPrice(total)}\n\nComo faço o pagamento?`
    )
    window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank')
  }
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        
        <section className="pt-24 md:pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-mono text-3xl md:text-4xl font-bold mb-4">
              O teu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8">
              Descubra produtos incríveis na nossa loja e comece a adicionar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cursos">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Ver Cursos
                </Button>
              </Link>
              <Link href="/produtos">
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                  Ver Produtos
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/produtos">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-mono text-3xl md:text-4xl font-bold">
              Carrinho de Compras
            </h1>
          </div>
        </div>
      </section>
      
      {/* Cart Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="p-4 bg-card/50 border-primary/10">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize mb-2">
                        {item.type === 'course' ? 'Curso' : item.type === 'service' ? 'Serviço' : 'Produto'}
                      </p>
                      <p className="font-mono font-bold text-primary">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-accent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-accent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Carrinho
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-card/50 border-primary/10 sticky top-24">
                <h2 className="font-mono text-xl font-bold mb-6">Resumo</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxas</span>
                    <span className="font-medium text-green-500">Grátis</span>
                  </div>
                  <div className="border-t border-primary/10 pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-mono text-xl font-bold text-primary">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 mb-4"
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Finalizar Compra
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mb-4">
                  Ao clicar, serás redirecionado para o WhatsApp para finalizar o pagamento.
                </p>
                
                {/* Payment Methods */}
                <div className="border-t border-primary/10 pt-4">
                  <p className="text-xs text-muted-foreground mb-3 text-center">
                    Métodos de Pagamento Aceites:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Multicaixa Express', 'Unitel Money', 'Transferência Bancária'].map((method) => (
                      <span 
                        key={method}
                        className="text-xs bg-secondary px-3 py-1 rounded-full text-muted-foreground"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
