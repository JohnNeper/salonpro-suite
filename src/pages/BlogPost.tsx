import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Tag, Globe, Share2, MessageCircle, BookOpen, MapPin } from 'lucide-react';
import { translations, type Lang } from '@/lib/translations';
import { blogPosts } from '@/lib/blog-data';

const WHATSAPP_NUMBER = '+237658315610';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>('fr');
  const c = translations[lang];

  const post = blogPosts.find(p => p.slug === slug);
  const postIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const relatedPosts = blogPosts.filter(p => p.slug !== slug && p.category[lang] === post?.category[lang]).slice(0, 3);
  const fallbackRelated = relatedPosts.length < 3 ? blogPosts.filter(p => p.slug !== slug && !relatedPosts.includes(p)).slice(0, 3 - relatedPosts.length) : [];
  const allRelated = [...relatedPosts, ...fallbackRelated];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Dynamic SEO meta tags
  useEffect(() => {
    if (!post) return;
    document.title = post.seo.metaTitle[lang];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.seo.metaDescription[lang]);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', post.seo.metaTitle[lang]);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.seo.metaDescription[lang]);
    return () => {
      document.title = 'BeautyFlow — Logiciel de gestion pour salons de coiffure en Afrique';
    };
  }, [post, lang]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article non trouvé</h1>
          <Button asChild><Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Retour au blog</Link></Button>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="font-display text-xl font-bold text-foreground mt-6 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) return <li key={i} className="text-muted-foreground ml-4 mb-2 list-disc leading-relaxed">{renderInline(line.replace('- ', ''))}</li>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-3">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const t = {
    fr: { backBlog: 'Retour au blog', share: 'Partager', related: 'Articles similaires', prev: 'Précédent', next: 'Suivant', ctaTitle: '🚀 Envie de tester BeautyFlow ?', ctaSub: 'Rejoignez les 500+ salons africains qui grandissent avec nous', ctaBtn: 'Essai gratuit 14 jours', shareWhatsApp: 'Partager sur WhatsApp' },
    en: { backBlog: 'Back to blog', share: 'Share', related: 'Related articles', prev: 'Previous', next: 'Next', ctaTitle: '🚀 Want to try BeautyFlow?', ctaSub: 'Join the 500+ African salons growing with us', ctaBtn: 'Free 14-day trial', shareWhatsApp: 'Share on WhatsApp' },
  };
  const bt = t[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-display text-xl font-bold gradient-text">BeautyFlow</Link>
            <div className="flex items-center gap-4">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> Blog
              </Link>
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" /> {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <Button className="gradient-primary border-0 text-primary-foreground shadow-warm text-sm" asChild>
                <Link to="/">{c.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article>
        <header className="relative">
          <div className="aspect-[21/9] max-h-[450px] overflow-hidden">
            <img src={post.image} alt={post.title[lang]} className="w-full h-full object-cover" width={800} height={544} />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary/90 text-primary-foreground border-0">{post.category[lang]}</Badge>
                <Badge className="bg-accent/90 text-accent-foreground border-0 text-xs">
                  <MapPin className="w-3 h-3 mr-1" /> {post.author.role[lang]}
                </Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background leading-tight mb-4">
                {post.title[lang]}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-background/70 text-sm">
                <span className="flex items-center gap-2">
                  <span className="text-lg">{post.author.avatar}</span>
                  {post.author.name}
                </span>
                <span>{new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime[lang]}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Share & Back */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {bt.backBlog}
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title[lang] + ' — ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#25D366] hover:underline font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> {bt.shareWhatsApp}
                </a>
                <button
                  onClick={() => navigator.share?.({ title: post.title[lang], url: shareUrl }).catch(() => {})}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Share2 className="w-4 h-4" /> {bt.share}
                </button>
              </div>
            </div>

            {/* Article body */}
            <div className="prose-custom">
              {renderContent(post.content[lang])}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
              <Tag className="w-4 h-4 text-muted-foreground mt-1" />
              {post.tags[lang].map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>

            {/* Inline CTA */}
            <div className="gradient-warm rounded-2xl p-8 mt-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
              }} />
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">{bt.ctaTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">{bt.ctaSub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="gradient-primary border-0 text-primary-foreground shadow-warm" asChild>
                  <Link to="/">{bt.ctaBtn} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5" asChild>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Prev / Next */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {prevPost ? (
                <Link to={`/blog/${prevPost.slug}`} className="flex-1 p-4 rounded-xl border border-border hover:shadow-card transition-all group">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><ArrowLeft className="w-3 h-3" /> {bt.prev}</span>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{prevPost.title[lang]}</p>
                </Link>
              ) : <div className="flex-1" />}
              {nextPost && (
                <Link to={`/blog/${nextPost.slug}`} className="flex-1 p-4 rounded-xl border border-border hover:shadow-card transition-all group text-right">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end mb-1">{bt.next} <ArrowRight className="w-3 h-3" /></span>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{nextPost.title[lang]}</p>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">{bt.related}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {allRelated.map(rp => (
            <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group">
              <div className="rounded-xl overflow-hidden border border-border/50 hover:shadow-warm transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={rp.image} alt={rp.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={544} />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">{rp.category[lang]}</Badge>
                  <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">{rp.title[lang]}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/70 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          {c.footer.rights}
        </div>
      </footer>

      {/* WhatsApp */}
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
