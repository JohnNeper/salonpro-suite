import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users, Calendar, Star, Package, BarChart3, Megaphone,
  Check, ArrowRight, Sparkles, Shield, Smartphone, Globe,
  Zap, Menu, X, Mail, MessageCircle, Crown, Heart
} from 'lucide-react';
import dashboardPreview from '@/assets/dashboard-preview.png';
import salonInterior from '@/assets/salon-interior.jpg';

const WHATSAPP_NUMBER = '+237658315610';
const CONTACT_EMAIL = 'info@westdigitalhub.com';

const iconMap: Record<string, React.ElementType> = {
  Users, Calendar, Star, Package, BarChart3, Megaphone, Smartphone, Globe, Shield, Zap,
};

const t = {
  nav: { features: 'Fonctionnalités', pricing: 'Tarifs', preview: 'Aperçu', testimonials: 'Témoignages' },
  cta: 'Commencer',
  login: 'Se connecter',
  hero: {
    badge: '🚀 La solution #1 pour les salons en Afrique',
    titleHighlight: 'Gérez votre salon',
    titleRest: 'de beauté comme un pro',
    subtitle: 'Fidélisez vos clientes, gérez vos rendez-vous, stocks et finances — tout en un seul endroit. Simple, puissant, adapté à votre réalité.',
    start: 'Démarrer maintenant',
    whatsapp: 'Nous écrire sur WhatsApp',
  },
  stats: [
    { value: '500+', label: 'Salons actifs' },
    { value: '50K+', label: 'Clientes gérées' },
    { value: '98%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' },
  ],
  features: {
    title: 'Tout ce dont votre salon a besoin',
    subtitle: 'Une plateforme complète pour digitaliser et faire croître votre activité',
    items: [
      { icon: 'Users', title: 'Gestion Clientes', desc: 'Fichier client complet avec historique, parrainage et segmentation VIP' },
      { icon: 'Calendar', title: 'Rendez-vous', desc: 'Calendrier interactif, rappels WhatsApp automatiques' },
      { icon: 'Star', title: 'Programme Fidélité', desc: 'Points, bonus anniversaire, récompenses automatiques' },
      { icon: 'Package', title: 'Gestion Stock', desc: 'Inventaire produits, alertes rupture, historique mouvements' },
      { icon: 'BarChart3', title: 'Finances', desc: 'Revenus, dépenses, estimations de profit, export Excel' },
      { icon: 'Megaphone', title: 'Campagnes Marketing', desc: 'Messages personnalisés WhatsApp, segmentation, automatisation' },
    ],
  },
  preview: {
    title: 'Découvrez BeautyFlow en action',
    subtitle: 'Un tableau de bord complet, intuitif et pensé pour votre quotidien',
    caption: 'Vue du tableau de bord — statistiques, rendez-vous, revenus et prestations en temps réel',
    features: [
      'Statistiques clientes en temps réel',
      'Suivi des revenus et rendez-vous',
      'Répartition des prestations',
      'Alertes stock intelligentes',
    ],
  },
  whyUs: {
    title: 'Pourquoi BeautyFlow ?',
    subtitle: 'Conçu pour les salons africains, par des experts qui comprennent votre marché',
    items: [
      { icon: 'Smartphone', title: 'Mobile-First', desc: 'Application installable (PWA), fonctionne même hors ligne' },
      { icon: 'Globe', title: 'Adapté à l\'Afrique', desc: 'Paiement en FCFA, intégration WhatsApp, interface intuitive' },
      { icon: 'Shield', title: 'Données sécurisées', desc: 'Vos données clientes sont protégées et sauvegardées' },
      { icon: 'Zap', title: 'Simple & Rapide', desc: 'Prise en main en 5 minutes, pas besoin de formation' },
    ],
  },
  pricing: {
    title: 'Des tarifs adaptés à chaque salon',
    subtitle: 'Pas de frais cachés. Évoluez à votre rythme.',
    popular: 'Le plus populaire',
    interested: 'Intéressé(e) par ce plan ?',
    contactWhatsapp: 'Contacter via WhatsApp',
    contactEmail: 'Contacter par email',
    plans: [
      {
        key: 'basic',
        name: 'Essentiel',
        price: '5 000',
        description: 'Idéal pour démarrer',
        features: [
          'Jusqu\'à 300 clientes', '2 comptes staff max', 'Gestion rendez-vous',
          'Points fidélité (manuel)', 'Stock & alertes', 'Rapport mensuel simple', '1 campagne/mois',
        ],
      },
      {
        key: 'pro',
        name: 'Professionnel',
        price: '15 000',
        description: 'Pour les salons en croissance',
        popular: true,
        features: [
          'Clientes illimitées', '6 comptes staff max', 'Segmentation VIP',
          'Règles fidélité auto', 'Bonus anniversaire', 'Historique stock',
          'Export Excel/CSV', '5 campagnes/mois', 'Estimation profits',
        ],
      },
      {
        key: 'premium',
        name: 'Premium',
        price: '30 000',
        description: 'Multi-succursales & automatisation',
        features: [
          'Tout illimité', 'Staff illimité', 'Multi-succursales',
          'Automatisation complète', 'Business Intelligence',
          'Campagnes illimitées', 'Support prioritaire', 'Tendances revenus',
        ],
      },
    ],
  },
  testimonials: {
    title: 'Ils nous font confiance',
    subtitle: 'Des salons à travers le Cameroun utilisent BeautyFlow au quotidien',
    items: [
      { name: 'Marie-Claire N.', salon: 'Salon Élégance, Douala', text: 'Depuis qu\'on utilise BeautyFlow, nos clientes reviennent plus souvent. Le programme fidélité fait vraiment la différence !' },
      { name: 'Fatou B.', salon: 'Beauty Queen, Yaoundé', text: 'J\'ai pu gérer 3 succursales facilement grâce au plan Premium. Un outil indispensable pour mon business.' },
      { name: 'Aminata D.', salon: 'Afro Glam Studio, Douala', text: 'L\'application est tellement simple ! Mon staff l\'a adopté en une journée. Les rappels WhatsApp réduisent les no-shows.' },
    ],
  },
  finalCta: {
    title: 'Prêt à transformer votre salon ?',
    subtitle: 'Rejoignez des centaines de salons qui font confiance à BeautyFlow pour gérer et faire croître leur activité.',
    button: 'Commencer maintenant',
    whatsapp: 'Discuter sur WhatsApp',
    email: 'Envoyer un email',
  },
  footer: {
    desc: 'La solution digitale #1 pour les salons de beauté en Afrique.',
    product: 'Produit',
    company: 'Entreprise',
    contact: 'Contact',
    about: 'À propos',
    blog: 'Blog',
    careers: 'Carrières',
    terms: 'Conditions',
    privacy: 'Confidentialité',
    rights: '© 2025 LeaderBright. Tous droits réservés.',
  },
};

function openWhatsApp(planLabel?: string) {
  const msg = planLabel
    ? `Bonjour, je suis intéressé(e) par le plan ${planLabel} de BeautyFlow. Pouvez-vous m'en dire plus ?`
    : `Bonjour, je souhaite en savoir plus sur BeautyFlow pour mon salon.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openEmail(planLabel?: string) {
  const subject = planLabel
    ? `Intérêt pour le plan ${planLabel} — BeautyFlow`
    : `Demande d'information — BeautyFlow`;
  const body = `Bonjour,\n\nJe souhaite en savoir plus sur BeautyFlow${planLabel ? ` (plan ${planLabel})` : ''}.\n\nNom du salon :\nVille :\nTéléphone :\n\nMerci !`;
  window.open(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">BeautyFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {(['features', 'preview', 'pricing', 'testimonials'] as const).map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                {t.nav[s]}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => openWhatsApp()}>{t.login}</Button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground shadow-warm">
              {t.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
            {(['features', 'preview', 'pricing', 'testimonials'] as const).map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="block w-full text-left text-sm py-2 text-muted-foreground font-medium">
                {t.nav[s]}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">{t.login}</Button>
              <Button size="sm" className="flex-1 gradient-primary border-0 text-primary-foreground">{t.cta}</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
              <Badge className="bg-coral-light text-coral-dark border-0 px-4 py-1.5 text-sm font-medium">
                {t.hero.badge}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
                <span className="gradient-text">{t.hero.titleHighlight}</span>{' '}
                {t.hero.titleRest}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="gradient-primary border-0 text-primary-foreground shadow-warm text-base px-8">
                  {t.hero.start} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => openWhatsApp()} className="text-base border-border">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.hero.whatsapp}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-card">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-coral" />
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-muted-foreground ml-2 font-mono">beautyflow.app/dashboard</span>
                </div>
                <img src={dashboardPreview} alt="BeautyFlow Dashboard" className="w-full" width={1280} height={800} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl gradient-warm opacity-60 blur-xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-coral-light opacity-40 blur-2xl" />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 lg:mt-24"
          >
            {t.stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Card className="text-center border-border shadow-card hover:shadow-warm transition-shadow duration-300">
                  <CardContent className="py-6">
                    <p className="text-3xl font-display font-bold gradient-text">{s.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.features.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{t.features.subtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((f, i) => {
              const Icon = iconMap[f.icon] || Sparkles;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Card className="h-full border-border shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-coral" />
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section id="preview" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-coral-light text-coral-dark border-0 px-4 py-1.5 text-sm mb-4">
              <Sparkles className="w-3 h-3 mr-1.5" /> Aperçu de la solution
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.preview.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{t.preview.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2 space-y-4">
              {t.preview.features.map((feat, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-card">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <p className="text-foreground font-medium text-sm">{feat}</p>
                </motion.div>
              ))}
              <div className="pt-4">
                <Button className="gradient-primary border-0 text-primary-foreground shadow-warm" onClick={() => scrollTo('pricing')}>
                  Choisir mon plan <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden shadow-warm border border-border bg-card">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-coral" />
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-muted-foreground ml-2 font-mono">beautyflow.app</span>
                </div>
                <img src={dashboardPreview} alt="BeautyFlow Dashboard" className="w-full" loading="lazy" width={1280} height={800} />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">{t.preview.caption}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img src={salonInterior} alt="Salon de beauté moderne" className="w-full h-[400px] object-cover rounded-2xl" loading="lazy" width={1280} height={720} />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent rounded-2xl" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.whyUs.title}</h2>
              <p className="text-muted-foreground mt-3 mb-8 text-lg">{t.whyUs.subtitle}</p>
              <div className="space-y-5">
                {t.whyUs.items.map((item, i) => {
                  const Icon = iconMap[item.icon] || Sparkles;
                  return (
                    <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.pricing.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{t.pricing.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {t.pricing.plans.map((plan, idx) => (
              <motion.div key={plan.key} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx}>
                <Card className={`relative h-full border-2 transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'border-coral shadow-warm scale-[1.02]' : 'border-border shadow-card hover:shadow-warm'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-primary text-primary-foreground border-0 px-4 py-1">
                        <Crown className="w-3 h-3 mr-1" /> {t.pricing.popular}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 pt-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="font-display font-bold text-xl text-foreground">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">FCFA/mois</span>
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center mb-2">{t.pricing.interested}</p>
                      <Button className="w-full gradient-primary border-0 text-primary-foreground shadow-warm" onClick={() => openWhatsApp(plan.name)}>
                        <MessageCircle className="w-4 h-4 mr-2" /> {t.pricing.contactWhatsapp}
                      </Button>
                      <Button variant="outline" className="w-full border-border" onClick={() => openEmail(plan.name)}>
                        <Mail className="w-4 h-4 mr-2" /> {t.pricing.contactEmail}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{t.testimonials.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{t.testimonials.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border shadow-card hover:shadow-warm transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{item.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.salon}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Sparkles className="w-10 h-10 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">{t.finalCta.title}</h2>
          <p className="text-primary-foreground/80 mt-4 text-lg max-w-xl mx-auto">{t.finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 text-base px-8 shadow-warm">
              {t.finalCta.button} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => openWhatsApp()} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base">
              <MessageCircle className="w-4 h-4 mr-2" /> {t.finalCta.whatsapp}
            </Button>
            <Button size="lg" variant="outline" onClick={() => openEmail()} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base">
              <Mail className="w-4 h-4 mr-2" /> {t.finalCta.email}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-lg text-background">BeautyFlow</span>
              </div>
              <p className="text-background/60 text-sm">{t.footer.desc}</p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => openWhatsApp()} className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-background/70" />
                </button>
                <button onClick={() => openEmail()} className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Mail className="w-4 h-4 text-background/70" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background text-sm mb-4">{t.footer.product}</h4>
              <div className="space-y-2.5 text-sm text-background/60">
                <button onClick={() => scrollTo('features')} className="block hover:text-background/90 transition-colors">{t.nav.features}</button>
                <button onClick={() => scrollTo('pricing')} className="block hover:text-background/90 transition-colors">{t.nav.pricing}</button>
                <button onClick={() => scrollTo('preview')} className="block hover:text-background/90 transition-colors">{t.nav.preview}</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background text-sm mb-4">{t.footer.company}</h4>
              <div className="space-y-2.5 text-sm text-background/60">
                <p className="hover:text-background/90 cursor-pointer transition-colors">{t.footer.about}</p>
                <p className="hover:text-background/90 cursor-pointer transition-colors">{t.footer.blog}</p>
                <p className="hover:text-background/90 cursor-pointer transition-colors">{t.footer.careers}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background text-sm mb-4">{t.footer.contact}</h4>
              <div className="space-y-2.5 text-sm text-background/60">
                <button onClick={() => openWhatsApp()} className="flex items-center gap-2 hover:text-background/90 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </button>
                <button onClick={() => openEmail()} className="flex items-center gap-2 hover:text-background/90 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> {CONTACT_EMAIL}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
