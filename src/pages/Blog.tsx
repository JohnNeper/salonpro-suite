import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Clock, Search, Tag, BookOpen, Globe, Menu, X, MessageCircle } from 'lucide-react';
import { translations, type Lang } from '@/lib/translations';
import { blogPosts } from '@/lib/blog-data';

const WHATSAPP_NUMBER = '+237658315610';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

export default function Blog() {
  const [lang, setLang] = useState<Lang>('fr');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const c = translations[lang];

  const categories = [...new Set(blogPosts.map(p => p.category[lang]))];

  const filtered = blogPosts.filter(post => {
    const matchSearch = search === '' ||
      post.title[lang].toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt[lang].toLowerCase().includes(search.toLowerCase()) ||
      post.tags[lang].some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = !activeCategory || post.category[lang] === activeCategory;
    return matchSearch && matchCategory;
  });

  const blogT = {
    fr: {
      title: 'Le Blog BeautyFlow',
      subtitle: 'Conseils, tendances et stratégies pour faire prospérer votre salon de beauté en Afrique',
      searchPlaceholder: 'Rechercher un article...',
      allCategories: 'Tous',
      readMore: 'Lire l\'article',
      noResults: 'Aucun article trouvé',
      noResultsSub: 'Essayez avec d\'autres mots-clés',
      backHome: 'Retour à l\'accueil',
      newsletter: 'Recevez nos meilleurs conseils',
      newsletterSub: 'Inscrivez-vous pour recevoir des astuces exclusives pour votre salon chaque semaine.',
      subscribe: 'S\'inscrire',
      emailPlaceholder: 'Votre email',
      ctaTitle: 'Prêt à transformer votre salon ?',
      ctaSub: 'Essayez BeautyFlow gratuitement pendant 14 jours',
      ctaBtn: 'Commencer l\'essai gratuit',
    },
    en: {
      title: 'The BeautyFlow Blog',
      subtitle: 'Tips, trends and strategies to grow your beauty salon in Africa',
      searchPlaceholder: 'Search articles...',
      allCategories: 'All',
      readMore: 'Read article',
      noResults: 'No articles found',
      noResultsSub: 'Try different keywords',
      backHome: 'Back to home',
      newsletter: 'Get our best tips',
      newsletterSub: 'Subscribe to receive exclusive salon tips every week.',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Your email',
      ctaTitle: 'Ready to transform your salon?',
      ctaSub: 'Try BeautyFlow free for 14 days',
      ctaBtn: 'Start free trial',
    },
  };
  const t = blogT[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-display text-xl font-bold gradient-text">BeautyFlow</Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.backHome}</Link>
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" /> {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <Button className="gradient-primary border-0 text-primary-foreground shadow-warm text-sm" asChild>
                <Link to="/">{c.cta}</Link>
              </Button>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-border/50 bg-background p-4 space-y-3">
            <Link to="/" className="block text-sm text-muted-foreground">{t.backHome}</Link>
            <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="flex items-center gap-1 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" /> {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Button className="gradient-primary border-0 text-primary-foreground w-full" asChild>
              <Link to="/">{c.cta}</Link>
            </Button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 gradient-hero overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" /> Blog
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-card rounded-2xl shadow-card p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'gradient-primary text-primary-foreground shadow-warm' : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'}`}
            >
              {t.allCategories}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-primary text-primary-foreground shadow-warm' : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{t.noResults}</h3>
            <p className="text-muted-foreground">{t.noResultsSub}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} lang={lang} index={i} readMore={t.readMore} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="gradient-warm rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{t.newsletter}</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">{t.newsletterSub}</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button className="gradient-primary border-0 text-primary-foreground shadow-warm px-6">
              {t.subscribe}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t.ctaTitle}</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">{t.ctaSub}</p>
          <Button size="lg" className="bg-card text-foreground hover:bg-card/90 shadow-lg" asChild>
            <Link to="/">{t.ctaBtn} <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/70 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          {c.footer.rights}
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </a>
    </div>
  );
}

function BlogCard({ post, lang, index, readMore }: { post: typeof blogPosts[0]; lang: Lang; index: number; readMore: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="group overflow-hidden border-border/50 hover:shadow-warm transition-all duration-300 hover:-translate-y-1 h-full">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.image}
              alt={post.title[lang]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <Badge className="absolute top-4 left-4 bg-card/90 text-foreground border-0 backdrop-blur-sm text-xs">
              {post.category[lang]}
            </Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span>{new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime[lang]}</span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title[lang]}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {post.excerpt[lang]}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{post.author.avatar}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.author.role[lang]}</p>
                </div>
              </div>
              <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {readMore} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
