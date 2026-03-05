import React, { useState, useEffect } from 'react';
import { Menu, X, FlaskConical, Calendar, Phone, MapPin, Clock, CheckCircle, Star, ChevronRight, Microscope, Award, Users, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  href, 
  target = '_self',
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'white'; 
  className?: string; 
  href?: string;
  target?: string;
  onClick?: () => void;
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-red text-white hover:bg-red-900 focus:ring-brand-red shadow-lg shadow-red-900/20",
    secondary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 shadow-lg shadow-green-600/20",
    outline: "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white focus:ring-brand-red",
    white: "bg-white text-brand-red hover:bg-gray-100 focus:ring-white shadow-lg"
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined } : { onClick };

  return (
    // @ts-ignore
    <Component className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

const Section = ({ 
  children, 
  id, 
  className = "", 
  dark = false 
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string; 
  dark?: boolean;
}) => (
  <section id={id} className={`py-20 md:py-28 ${dark ? 'bg-gray-50' : 'bg-white'} ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-24 bg-brand-red mt-8 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  </div>
);

// --- Logo Component ---
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-12 flex items-center justify-center">
      {/* Drop Shape using SVG */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand-red w-full h-full absolute drop-shadow-md">
        <path d="M12 2C12 2 4 10 4 15C4 19.4183 7.58172 23 12 23C16.4183 23 20 19.4183 20 15C20 10 12 2 12 2Z" />
      </svg>
      {/* Microscope Icon */}
      <Microscope size={18} className="text-white relative z-10 translate-y-1" strokeWidth={2.5} />
    </div>
    <div className="flex flex-col justify-center">
      <span className="text-2xl font-bold text-brand-red leading-none tracking-tight">Messora</span>
      <div className="flex items-center gap-1">
        <span className="text-lg font-medium text-gray-600 leading-none">& Vilela</span>
      </div>
    </div>
  </div>
);

// --- Header ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Diferenciais', href: '#features' },
    { name: 'Avaliações', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              href="https://result.dtxnet.top" 
              target="_blank"
              className="!px-5 !py-2.5 text-sm font-semibold"
            >
              Resultados
            </Button>
            <Button 
              variant="secondary" 
              href="https://wa.me/5535998254984" 
              target="_blank"
              className="!px-5 !py-2.5 text-sm gap-2 font-semibold"
            >
              <Phone size={16} />
              Agendar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-brand-red transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <Container className="py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-gray-700 hover:text-brand-red py-3 border-b border-gray-50 flex justify-between items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronRight size={16} className="text-gray-300" />
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button 
                  variant="outline" 
                  href="https://result.dtxnet.top" 
                  target="_blank"
                  className="w-full justify-center"
                >
                  Resultados de Exames
                </Button>
                <Button 
                  variant="secondary" 
                  href="https://wa.me/5535998254984" 
                  target="_blank"
                  className="w-full justify-center gap-2"
                >
                  <Phone size={18} />
                  Agendar via WhatsApp
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50/50" />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-red-50/30 skew-x-12 transform origin-top-right" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-100 shadow-sm text-brand-red text-sm font-bold mb-8 animate-fade-in-up">
              <Star size={16} fill="currentColor" />
              <span>Excelência em Análises Clínicas</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Tradição e Excelência <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">
                em Análises Clínicas.
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              Há décadas oferecendo diagnósticos precisos e confiáveis em Boa Esperança. Unimos a tradição de um atendimento ético à mais moderna tecnologia laboratorial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                href="https://wa.me/5535998254984" 
                target="_blank"
                className="gap-2 shadow-xl shadow-red-900/10"
              >
                Faça um Orçamento
                <ChevronRight size={18} />
              </Button>
              <Button 
                variant="white" 
                href="https://result.dtxnet.top"
                target="_blank"
                className="border border-gray-200"
              >
                Ver Resultados
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-8">
              <div>
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1">
                  <Clock className="text-brand-red" size={20} />
                  <span>Resultados Rápidos</span>
                </div>
                <p className="text-sm text-gray-500">Agilidade na entrega</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1">
                  <CheckCircle className="text-brand-red" size={20} />
                  <span>Preço Justo</span>
                </div>
                <p className="text-sm text-gray-500">Tabela acessível</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
               <img 
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200" 
                alt="Microscópio em laboratório de análises clínicas" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold text-xl">Rigor Técnico</p>
                <p className="text-gray-200 text-sm">Controle de qualidade em cada exame</p>
              </div>
            </div>

            {/* Floating Badge 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -left-12 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] hidden md:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <CheckCircle size={20} />
                </div>
                <span className="font-bold text-gray-900">Confiabilidade</span>
              </div>
              <p className="text-xs text-gray-500">Resultados precisos e conferidos por especialistas.</p>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-24 -right-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden md:flex"
            >
              <div className="bg-brand-red text-white p-3 rounded-xl">
                <Award size={24} />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">Excelência</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Certificada</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

// --- About Section ---

const About = () => {
  return (
    <Section id="about">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600" 
                alt="Biomédico analisando amostras" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover mb-8"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600" 
                alt="Equipamentos de análise clínica" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-red/10 w-[120%] h-[80%] -z-10 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle 
              title="Sobre o Laboratório Messora e Vilela" 
              subtitle="Compromisso com a verdade em cada diagnóstico."
              centered={false}
            />
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                O <strong className="text-gray-900">Laboratório Messora e Vilela</strong> construiu sua história pautada na ética, no rigor técnico e no respeito à vida. Somos referência em análises clínicas, unindo a tradição de um atendimento familiar à inovação tecnológica.
              </p>
              <p>
                Nossa equipe é liderada por profissionais experientes que acompanham cada etapa do processo analítico. Participamos de rigorosos programas de controle de qualidade para assegurar que cada resultado entregue seja sinônimo de precisão e confiabilidade.
              </p>
              <p>
                Entendemos que por trás de cada exame existe uma vida. Por isso, oferecemos um ambiente acolhedor e seguro, onde a excelência técnica caminha lado a lado com o cuidado humano.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-bold text-brand-red mb-1">100%</p>
                <p className="text-sm text-gray-500 font-medium">Controle de Qualidade</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-red mb-1">+20</p>
                <p className="text-sm text-gray-500 font-medium">Anos de Tradição</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-brand-red mb-1">Ref.</p>
                <p className="text-sm text-gray-500 font-medium">Em Análises Clínicas</p>
              </div>
            </div>

            <div className="mt-10">
              <Button 
                href="https://wa.me/5535998254984" 
                target="_blank"
                className="gap-2"
              >
                Faça um Orçamento
                <ChevronRight size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

// --- Features Section ---

const Features = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-brand-red" />,
      title: "Agilidade",
      description: "Atendimento rápido, eficiente e resultados entregues rigorosamente no prazo combinado."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-brand-red" />,
      title: "Preço Justo",
      description: "Tabela de preços acessível para a população, sem abrir mão da qualidade técnica."
    },
    {
      icon: <Star className="w-8 h-8 text-brand-red" />,
      title: "Equipe de Excelência",
      description: "Profissionais altamente preparados, éticos e atenciosos para cuidar de você."
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand-red" />,
      title: "Comodidade",
      description: "Localização central de fácil acesso e uma estrutura moderna e confortável."
    }
  ];

  return (
    <Section id="features">
      <Container>
        <SectionTitle 
          title="Por que escolher o Messora e Vilela?" 
          subtitle="Compromisso com a qualidade e o bem-estar de cada paciente."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-8 h-8 text-brand-red group-hover:text-white transition-colors" })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            href="https://wa.me/5535998254984" 
            target="_blank"
            className="gap-2"
          >
            Faça um Orçamento
            <ChevronRight size={18} />
          </Button>
        </div>
      </Container>
    </Section>
  );
};

// --- Testimonials Section ---

const Testimonials = () => {
  const testimonials = [
    {
      name: "Andressa Gomes",
      text: "Excelente atendimento, responsabilidade e ética para com os clientes! Ótimos preços e localização de fácil acesso!",
      stars: 5
    },
    {
      name: "Douglas Silva Lara",
      text: "Excelente laboratório, trabalha com preço justo de tabela, profissionais bem preparados e educados.",
      stars: 5
    },
    {
      name: "Camila Simplício",
      text: "Atendimento rápido e eficiente. Ótimos funcionários.",
      stars: 5
    }
  ];

  return (
    <Section id="testimonials" dark>
      <Container>
        <SectionTitle 
          title="O que dizem nossos pacientes" 
          subtitle="A confiança de quem já conhece nosso trabalho."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">Paciente</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            href="https://wa.me/5535998254984" 
            target="_blank"
            className="gap-2"
          >
            Faça um Orçamento
            <ChevronRight size={18} />
          </Button>
        </div>
      </Container>
    </Section>
  );
};

// --- Footer ---

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Info */}
          <div>
            <div className="mb-8">
              <Logo className="text-white" />
            </div>
            
            <p className="text-gray-400 mb-8 max-w-md">
              Laboratório de análises clínicas com excelência técnica e atendimento humanizado em Boa Esperança, MG.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red mt-1 shrink-0" />
                <span className="text-gray-300">R. Maria Maia, 52, Boa Esperança - MG, 37170-000</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <span className="text-gray-300">(35) 3851-2257</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-red mt-1 shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Seg - Sex: 06:00 - 17:00</p>
                  <p>Sáb - Dom: Fechado</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a 
                href="https://www.instagram.com/messoraevilelaltda/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/p/Laborat%C3%B3rio-Messora-e-Vilela-100031434086514/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://wa.me/5535998254984" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-64 lg:h-full rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.666729061038!2d-45.56683892396656!3d-21.09216668057279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b57b63300000001%3A0x6f0b0b0b0b0b0b0b!2sR.%20Maria%20Maia%2C%2052%20-%20Boa%20Esperan%C3%A7a%2C%20MG%2C%2037170-000!5e0!3m2!1spt-BR!2sbr!4v1709560000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Laboratório Messora e Vilela"
            />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Laboratório Messora e Vilela. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
};

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/5535998254984"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center"
    aria-label="Falar no WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  </a>
);

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <Testimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
