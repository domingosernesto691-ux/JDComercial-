"use client"

import Link from 'next/link'
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { WHATSAPP_LINK } from '@/lib/store'

export function Footer() {
  return (
    <footer className="bg-[#0a0604] border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-white">
                JD
              </div>
              <span className="font-mono text-xl font-bold text-white">
                JD<span className="text-primary">Comercial</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O ecossistema digital 100% angolano para aprendizagem, venda de produtos digitais, 
              freelancing e muito mais.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/jdcomercial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/jdcomercial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/@jdcomercial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/jdcomercial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { href: '/cursos', label: 'Cursos' },
                { href: '/produtos', label: 'Loja' },
                { href: '/blog', label: 'Blog' },
                { href: '/freelance', label: 'Freelance' },
                { href: '/ferramentas', label: 'Ferramentas' },
                { href: '/links', label: 'Nossos Links' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Categorias</h4>
            <ul className="space-y-2">
              {[
                'Programação',
                'Marketing Digital',
                'Design Gráfico',
                'Negócios',
                'E-books',
                'Templates',
              ].map((category) => (
                <li key={category}>
                  <Link 
                    href={`/cursos?categoria=${encodeURIComponent(category)}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +244 926 588 191
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contacto@jdcomercial.ao"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  contacto@jdcomercial.ao
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Luanda, Angola</span>
              </li>
            </ul>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-white mb-3">Métodos de Pagamento</h5>
              <div className="flex flex-wrap gap-2">
                {['Multicaixa Express', 'Unitel Money', 'Transferência'].map((method) => (
                  <span 
                    key={method}
                    className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} JDComercial. Todos os direitos reservados. 
            <span className="inline-flex items-center gap-1 ml-1">
              Feito com <span className="text-accent">amor</span> em Angola
            </span>
          </p>
          <div className="flex gap-6">
            <Link href="/termos" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
