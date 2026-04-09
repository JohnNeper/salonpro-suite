export type Lang = 'fr' | 'en';

export const translations: Record<Lang, typeof fr> = { fr, en };

const fr = {
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
    badge: 'Aperçu de la solution',
    title: 'Découvrez BeautyFlow en action',
    subtitle: 'Un tableau de bord complet, intuitif et pensé pour votre quotidien',
    caption: 'Vue du tableau de bord — statistiques, rendez-vous, revenus et prestations en temps réel',
    choosePlan: 'Choisir mon plan',
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
    perMonth: 'FCFA/mois',
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
  whatsappMsg: {
    withPlan: (plan: string) => `Bonjour, je suis intéressé(e) par le plan ${plan} de BeautyFlow. Pouvez-vous m'en dire plus ?`,
    general: `Bonjour, je souhaite en savoir plus sur BeautyFlow pour mon salon.`,
  },
  emailMsg: {
    subjectPlan: (plan: string) => `Intérêt pour le plan ${plan} — BeautyFlow`,
    subjectGeneral: `Demande d'information — BeautyFlow`,
    bodyPlan: (plan: string) => `Bonjour,\n\nJe souhaite en savoir plus sur BeautyFlow (plan ${plan}).\n\nNom du salon :\nVille :\nTéléphone :\n\nMerci !`,
    bodyGeneral: `Bonjour,\n\nJe souhaite en savoir plus sur BeautyFlow.\n\nNom du salon :\nVille :\nTéléphone :\n\nMerci !`,
  },
};

const en = {
  nav: { features: 'Features', pricing: 'Pricing', preview: 'Preview', testimonials: 'Testimonials' },
  cta: 'Get Started',
  login: 'Log In',
  hero: {
    badge: '🚀 The #1 solution for salons in Africa',
    titleHighlight: 'Manage your salon',
    titleRest: 'like a true professional',
    subtitle: 'Retain your clients, manage appointments, inventory and finances — all in one place. Simple, powerful, built for your reality.',
    start: 'Get started now',
    whatsapp: 'Message us on WhatsApp',
  },
  stats: [
    { value: '500+', label: 'Active salons' },
    { value: '50K+', label: 'Clients managed' },
    { value: '98%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' },
  ],
  features: {
    title: 'Everything your salon needs',
    subtitle: 'A complete platform to digitize and grow your business',
    items: [
      { icon: 'Users', title: 'Client Management', desc: 'Complete client file with history, referrals and VIP segmentation' },
      { icon: 'Calendar', title: 'Appointments', desc: 'Interactive calendar, automatic WhatsApp reminders' },
      { icon: 'Star', title: 'Loyalty Program', desc: 'Points, birthday bonuses, automatic rewards' },
      { icon: 'Package', title: 'Inventory', desc: 'Product inventory, stock alerts, movement history' },
      { icon: 'BarChart3', title: 'Finances', desc: 'Revenue, expenses, profit estimates, Excel export' },
      { icon: 'Megaphone', title: 'Marketing', desc: 'Personalized WhatsApp messages, segmentation, automation' },
    ],
  },
  preview: {
    badge: 'Solution Preview',
    title: 'See BeautyFlow in action',
    subtitle: 'A complete, intuitive dashboard designed for your daily operations',
    caption: 'Dashboard view — real-time stats, appointments, revenue and services overview',
    choosePlan: 'Choose my plan',
    features: [
      'Real-time client statistics',
      'Revenue & appointment tracking',
      'Service distribution overview',
      'Smart stock alerts',
    ],
  },
  whyUs: {
    title: 'Why BeautyFlow?',
    subtitle: 'Built for African salons, by experts who understand your market',
    items: [
      { icon: 'Smartphone', title: 'Mobile-First', desc: 'Installable app (PWA), works even offline' },
      { icon: 'Globe', title: 'Made for Africa', desc: 'FCFA pricing, WhatsApp integration, intuitive UI' },
      { icon: 'Shield', title: 'Secure Data', desc: 'Your client data is protected and backed up' },
      { icon: 'Zap', title: 'Simple & Fast', desc: '5-minute setup, no training needed' },
    ],
  },
  pricing: {
    title: 'Pricing that fits every salon',
    subtitle: 'No hidden fees. Scale at your pace.',
    popular: 'Most popular',
    interested: 'Interested in this plan?',
    contactWhatsapp: 'Contact via WhatsApp',
    contactEmail: 'Contact by email',
    perMonth: 'FCFA/month',
    plans: [
      {
        key: 'basic',
        name: 'Essential',
        price: '5,000',
        description: 'Perfect to get started',
        features: [
          'Up to 300 clients', '2 staff accounts max', 'Appointment management',
          'Loyalty points (manual)', 'Stock & alerts', 'Simple monthly report', '1 campaign/month',
        ],
      },
      {
        key: 'pro',
        name: 'Professional',
        price: '15,000',
        description: 'For growing salons',
        popular: true,
        features: [
          'Unlimited clients', '6 staff accounts max', 'VIP segmentation',
          'Auto loyalty rules', 'Birthday bonus', 'Stock history',
          'Excel/CSV export', '5 campaigns/month', 'Profit estimation',
        ],
      },
      {
        key: 'premium',
        name: 'Premium',
        price: '30,000',
        description: 'Multi-branch & automation',
        features: [
          'Everything unlimited', 'Unlimited staff', 'Multi-branch',
          'Full automation', 'Business Intelligence',
          'Unlimited campaigns', 'Priority support', 'Revenue trends',
        ],
      },
    ],
  },
  testimonials: {
    title: 'Trusted by salons',
    subtitle: 'Salons across Cameroon use BeautyFlow daily',
    items: [
      { name: 'Marie-Claire N.', salon: 'Salon Élégance, Douala', text: 'Since we started using BeautyFlow, our clients come back more often. The loyalty program really makes a difference!' },
      { name: 'Fatou B.', salon: 'Beauty Queen, Yaoundé', text: 'I managed 3 branches easily with the Premium plan. An essential tool for my business.' },
      { name: 'Aminata D.', salon: 'Afro Glam Studio, Douala', text: 'The app is so simple! My staff adopted it in a day. WhatsApp reminders reduce no-shows.' },
    ],
  },
  finalCta: {
    title: 'Ready to transform your salon?',
    subtitle: 'Join hundreds of salons that trust BeautyFlow to manage and grow their business.',
    button: 'Get started now',
    whatsapp: 'Chat on WhatsApp',
    email: 'Send an email',
  },
  footer: {
    desc: 'The #1 digital solution for beauty salons in Africa.',
    product: 'Product',
    company: 'Company',
    contact: 'Contact',
    about: 'About',
    blog: 'Blog',
    careers: 'Careers',
    terms: 'Terms',
    privacy: 'Privacy',
    rights: '© 2025 LeaderBright. All rights reserved.',
  },
  whatsappMsg: {
    withPlan: (plan: string) => `Hello, I'm interested in the ${plan} plan of BeautyFlow. Can you tell me more?`,
    general: `Hello, I'd like to learn more about BeautyFlow for my salon.`,
  },
  emailMsg: {
    subjectPlan: (plan: string) => `Interest in ${plan} plan — BeautyFlow`,
    subjectGeneral: `Information request — BeautyFlow`,
    bodyPlan: (plan: string) => `Hello,\n\nI'd like to learn more about BeautyFlow (${plan} plan).\n\nSalon name:\nCity:\nPhone:\n\nThank you!`,
    bodyGeneral: `Hello,\n\nI'd like to learn more about BeautyFlow.\n\nSalon name:\nCity:\nPhone:\n\nThank you!`,
  },
};

export { fr, en };
