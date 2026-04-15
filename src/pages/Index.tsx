import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users, Calendar, Star, Package, BarChart3, Megaphone,
  Check, ArrowRight, Sparkles, Shield, Smartphone, Globe,
  Zap, Menu, X, Mail, MessageCircle, Crown, Play,
  ChevronDown, TrendingUp, Award, Clock, AlertTriangle,
  CheckCircle2, Video, PhoneCall,
} from 'lucide-react';
import dashboardPreview from '@/assets/dashboard-preview.png';
import salonInterior from '@/assets/salon-interior.jpg';
import heroVideo from '@/assets/salon-hero-video.mp4.asset.json';
import { translations, type Lang } from '@/lib/translations';

const WHATSAPP_NUMBER = '+237658315610';
const CONTACT_EMAIL = 'info@westdigitalhub.com';

const iconMap: Record<string, React.ElementType> = {
  Users, Calendar, Star, Package, BarChart3, Megaphone, Smartphone, Globe, Shield, Zap,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!isInView || isNaN(numericTarget)) return;
    let start = 0;
    const increment = Math.ceil(numericTarget / 40);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  const hasPlus = target.includes('+');
  const hasPercent = target.includes('%');
  const display = isNaN(numericTarget) ? target : `${count.toLocaleString('fr-FR')}${hasPlus ? '+' : ''}${hasPercent ? '%' : ''}${suffix}`;

  return <span ref={ref}>{display}</span>;
}

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lang, setLang] = useState<Lang>('fr');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const c = translations[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'fr' ? 'en' : 'fr');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const openWhatsApp = (planLabel?: string) => {
    const msg = planLabel ? c.whatsappMsg.withPlan(planLabel) : c.whatsappMsg.general;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openEmail = (planLabel?: string) => {
    const subject = planLabel ? c.emailMsg.subjectPlan(planLabel) : c.emailMsg.subjectGeneral;
    const body = planLabel ? c.emailMsg.bodyPlan(planLabel) : c.emailMsg.bodyGeneral;
    window.open(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      {/* Urgency Banner */}
      <div className="bg-foreground text-background text-center py-2.5 px-4 text-sm font-medium relative z-[60]">
        <span>{c.urgency.text}</span>
        <button onClick={() => scrollTo('pricing')} className="ml-3 underline font-bold hover:text-coral-light transition-colors">
          {c.urgency.cta}
        </button>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-[38px] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border shadow-card' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">BeautyFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {(['features', 'pricing', 'testimonials', 'faq'] as const).map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                {c.nav[s]}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-border"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground shadow-warm" onClick={() => openWhatsApp()}>
              {c.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground border border-border"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button className="text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3 overflow-hidden"
            >
              {(['features', 'pricing', 'testimonials', 'faq'] as const).map(s => (
                <button key={s} onClick={() => scrollTo(s)} className="block w-full text-left text-sm py-2 text-muted-foreground font-medium">
                  {c.nav[s]}
                </button>
              ))}
              <Button className="w-full gradient-primary border-0 text-primary-foreground" onClick={() => openWhatsApp()}>
                {c.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero with Video Background */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={salonInterior}
          >
            <source src={heroVideo.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} key={lang + '-hero'} className="space-y-6">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                {c.hero.badge}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] text-primary-foreground">
                <span className="text-coral-light">{c.hero.titleHighlight}</span>{' '}
                <span className="text-primary-foreground">{c.hero.titleRest}</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
                {c.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="gradient-primary border-0 text-primary-foreground shadow-warm text-base px-8 h-14 text-lg" onClick={() => openWhatsApp()}>
                  {c.hero.start} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => openWhatsApp()} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base h-14">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {c.hero.whatsapp}
                </Button>
              </div>
              <p className="text-primary-foreground/50 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" /> {c.hero.noCard}
              </p>
            </motion.div>

            {/* Dashboard preview floating over video */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -5 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10 bg-card/95 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/80">
                  <div className="w-3 h-3 rounded-full bg-coral" />
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-muted-foreground ml-2 font-mono">beautyflow.app/dashboard</span>
                </div>
                <img src={dashboardPreview} alt="BeautyFlow Dashboard" className="w-full" width={1280} height={800} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats with animated counters */}
      <section className="relative z-10 -mt-8">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <Card className="text-center border-border shadow-warm bg-card hover:scale-105 transition-transform duration-300">
                  <CardContent className="py-6">
                    <p className="text-3xl lg:text-4xl font-display font-bold gradient-text">
                      <AnimatedCounter target={s.value} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">{s.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium">{c.socialProof.title}</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {c.socialProof.logos.map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50"
              >
                <Crown className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold text-muted-foreground">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points — Before/After */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.painPoints.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{c.painPoints.subtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {c.painPoints.items.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="border-border shadow-card overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="p-4 bg-destructive/5 border-b border-border flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                      </div>
                      <p className="text-sm text-foreground/70 line-through">{item.before}</p>
                    </div>
                    <div className="p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-coral" />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{item.after}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.features.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{c.features.subtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.features.items.map((f, i) => {
              const Icon = iconMap[f.icon] || Sparkles;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Card className="h-full border-border shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl gradient-warm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-coral" />
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

      {/* Results / Metrics */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground">{c.results.title}</h2>
            <p className="text-primary-foreground/70 mt-4 text-lg">{c.results.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {c.results.items.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10">
                  <p className="text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-2">{item.metric}</p>
                  <p className="text-sm text-primary-foreground/70">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section id="preview" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-coral-light text-coral-dark border-0 px-4 py-1.5 text-sm mb-4">
              <Sparkles className="w-3 h-3 mr-1.5" /> {c.preview.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.preview.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{c.preview.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2 space-y-4">
              {c.preview.features.map((feat, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-card">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <p className="text-foreground font-medium text-sm">{feat}</p>
                </motion.div>
              ))}
              <div className="pt-4">
                <Button className="gradient-primary border-0 text-primary-foreground shadow-warm" onClick={() => scrollTo('pricing')}>
                  {c.preview.choosePlan} <ArrowRight className="w-4 h-4 ml-2" />
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
              <p className="text-center text-sm text-muted-foreground mt-4">{c.preview.caption}</p>
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
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.whyUs.title}</h2>
              <p className="text-muted-foreground mt-3 mb-8 text-lg">{c.whyUs.subtitle}</p>
              <div className="space-y-5">
                {c.whyUs.items.map((item, i) => {
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.pricing.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{c.pricing.subtitle}</p>
          </motion.div>

          <p className="text-center text-sm font-semibold text-coral mb-12">{c.pricing.guarantee}</p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {c.pricing.plans.map((plan, idx) => (
              <motion.div key={plan.key} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx}>
                <Card className={`relative h-full border-2 transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-coral shadow-warm scale-[1.03]' : 'border-border shadow-card hover:shadow-warm'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-primary text-primary-foreground border-0 px-4 py-1 shadow-warm">
                        <Crown className="w-3 h-3 mr-1" /> {c.pricing.popular}
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
                      <span className="text-muted-foreground text-sm">{c.pricing.perMonth}</span>
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
                      <p className="text-xs text-muted-foreground text-center mb-2">{c.pricing.interested}</p>
                      <Button className={`w-full border-0 text-primary-foreground shadow-warm ${plan.popular ? 'gradient-primary' : 'bg-foreground hover:bg-foreground/90'}`} onClick={() => openWhatsApp(plan.name)}>
                        <MessageCircle className="w-4 h-4 mr-2" /> {c.pricing.contactWhatsapp}
                      </Button>
                      <Button variant="outline" className="w-full border-border" onClick={() => openEmail(plan.name)}>
                        <Mail className="w-4 h-4 mr-2" /> {c.pricing.contactEmail}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with results */}
      <section id="testimonials" className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.testimonials.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{c.testimonials.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {c.testimonials.items.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border shadow-card hover:shadow-warm transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed mb-4 italic">"{item.text}"</p>
                    {/* Result badge */}
                    <Badge className="bg-coral-light text-coral-dark border-0 text-xs font-bold mb-4">
                      <TrendingUp className="w-3 h-3 mr-1" /> {item.result}
                    </Badge>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
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

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">{c.faq.title}</h2>
            <p className="text-muted-foreground mt-4 text-lg">{c.faq.subtitle}</p>
          </motion.div>

          <div className="space-y-3">
            {c.faq.items.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}>
                <Card className="border-border shadow-card overflow-hidden">
                  <button
                    className="w-full p-5 flex items-center justify-between text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-foreground text-sm pr-4">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">{c.finalCta.title}</h2>
          <p className="text-primary-foreground/80 mt-4 text-lg max-w-xl mx-auto">{c.finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 text-base px-8 shadow-warm h-14 text-lg" onClick={() => openWhatsApp()}>
              {c.finalCta.button} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => openWhatsApp()} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base h-14">
              <MessageCircle className="w-5 h-5 mr-2" /> {c.finalCta.whatsapp}
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
              <p className="text-background/60 text-sm">{c.footer.desc}</p>
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
              <h4 className="font-semibold text-background text-sm mb-4">{c.footer.product}</h4>
              <div className="space-y-2.5 text-sm text-background/60">
                <button onClick={() => scrollTo('features')} className="block hover:text-background/90 transition-colors">{c.nav.features}</button>
                <button onClick={() => scrollTo('pricing')} className="block hover:text-background/90 transition-colors">{c.nav.pricing}</button>
                <button onClick={() => scrollTo('preview')} className="block hover:text-background/90 transition-colors">{c.nav.preview}</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background text-sm mb-4">{c.footer.company}</h4>
              <div className="space-y-2.5 text-sm text-background/60">
                <p className="hover:text-background/90 cursor-pointer transition-colors">{c.footer.about}</p>
                <p className="hover:text-background/90 cursor-pointer transition-colors">{c.footer.blog}</p>
                <p className="hover:text-background/90 cursor-pointer transition-colors">{c.footer.careers}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-background text-sm mb-4">{c.footer.contact}</h4>
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
            {c.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
