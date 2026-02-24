import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/api/*', cors())

// API de contato (simula envio de e-mail)
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, company, service, message } = body

    if (!name || !email || !message) {
      return c.json({ success: false, error: 'Campos obrigatórios faltando.' }, 400)
    }

    // Simula processamento
    console.log('Novo contato:', { name, email, phone, company, service, message })

    return c.json({
      success: true,
      message: 'Mensagem recebida com sucesso! Em breve entraremos em contato.'
    })
  } catch (e) {
    return c.json({ success: false, error: 'Erro ao processar a requisição.' }, 500)
  }
})

// Rota principal
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smart Visio – Inteligência de Dados para o seu Negócio</title>
  <meta name="description" content="A Smart Visio transforma dados em decisões estratégicas com dashboards intuitivos, relatórios automatizados e inteligência de negócios para impulsionar sua empresa." />
  <meta name="keywords" content="dashboards, inteligência de dados, business intelligence, relatórios, análise de dados, Fortaleza" />

  <!-- Open Graph -->
  <meta property="og:title" content="Smart Visio – Inteligência de Dados" />
  <meta property="og:description" content="Transforme dados em decisões estratégicas com a Smart Visio." />
  <meta property="og:type" content="website" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" />

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'sans-serif'] },
          colors: {
            primary: {
              50:  '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            },
            accent: {
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
            }
          },
          animation: {
            'float': 'float 6s ease-in-out infinite',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'slide-up': 'slideUp 0.6s ease-out forwards',
            'fade-in': 'fadeIn 0.8s ease-out forwards',
            'counter': 'counter 2s ease-out forwards',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
            slideUp: {
              '0%': { opacity: '0', transform: 'translateY(30px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            }
          }
        }
      }
    }
  </script>

  <style>
    * { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; }

    /* Gradient text */
    .gradient-text {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Hero gradient background */
    .hero-bg {
      background: radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.10) 0%, transparent 60%),
                  #0f172a;
    }

    /* Glass card */
    .glass {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.10);
    }

    .glass-light {
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.6);
    }

    /* Glow effects */
    .glow-blue { box-shadow: 0 0 40px rgba(59,130,246,0.3); }
    .glow-purple { box-shadow: 0 0 40px rgba(139,92,246,0.3); }
    .glow-btn { box-shadow: 0 0 20px rgba(59,130,246,0.4); }

    /* Animated grid */
    .grid-bg {
      background-image: linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
                        linear-gradient(to right, rgba(59,130,246,0.05) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Card hover */
    .feature-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    }

    /* Pricing card */
    .pricing-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .pricing-card:hover {
      transform: translateY(-6px);
    }

    /* Nav scroll effect */
    .nav-scrolled {
      background: rgba(15,23,42,0.95) !important;
      backdrop-filter: blur(20px);
      box-shadow: 0 1px 30px rgba(0,0,0,0.3);
    }

    /* Progress bars animation */
    .progress-bar {
      width: 0;
      transition: width 1.5s ease-in-out;
    }

    /* Testimonial card */
    .testimonial-card {
      transition: all 0.3s ease;
    }
    .testimonial-card:hover {
      transform: scale(1.02);
    }

    /* Mobile menu */
    #mobile-menu {
      transition: all 0.3s ease;
      max-height: 0;
      overflow: hidden;
    }
    #mobile-menu.open {
      max-height: 500px;
    }

    /* Floating particles */
    .particle {
      position: absolute;
      border-radius: 50%;
      animation: float 8s ease-in-out infinite;
    }

    /* Counter animation */
    .count-up { opacity: 0; }
    .count-up.visible { opacity: 1; }

    /* Scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Section gradient divider */
    .section-divider {
      background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent);
      height: 1px;
    }

    /* Dashboard mockup */
    .dashboard-card {
      background: rgba(30,41,59,0.9);
      border: 1px solid rgba(59,130,246,0.2);
      border-radius: 12px;
    }

    /* Badge */
    .badge {
      background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2));
      border: 1px solid rgba(59,130,246,0.3);
    }

    /* Input focus */
    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 3px; }

    /* Gradient border */
    .gradient-border {
      position: relative;
      background: linear-gradient(#0f172a, #0f172a) padding-box,
                  linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
      border: 2px solid transparent;
    }

    /* Chart bar animation */
    .chart-bar {
      transition: height 1s ease-in-out;
      height: 0;
    }
    .chart-bar.animated {
      height: var(--target-height);
    }

    /* Typewriter cursor */
    .cursor::after {
      content: '|';
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    /* Notification pulse */
    .notif-pulse {
      animation: notifPulse 2s ease-in-out infinite;
    }
    @keyframes notifPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }

    /* Star rating */
    .star { color: #fbbf24; }

    /* WhatsApp btn */
    .whatsapp-btn {
      background: linear-gradient(135deg, #25d366, #128c7e);
      transition: all 0.3s ease;
    }
    .whatsapp-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(37,211,102,0.4);
    }

    @media (max-width: 768px) {
      .hero-title { font-size: 2.5rem !important; }
    }
  </style>
</head>
<body class="bg-slate-950 text-white antialiased">

  <!-- ======================== NAVBAR ======================== -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <i class="fas fa-chart-line text-white text-lg"></i>
        </div>
        <span class="text-xl font-bold">
          <span class="text-white">Smart</span><span class="gradient-text">Visio</span>
        </span>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-8">
        <a href="#features" class="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:text-blue-400">Soluções</a>
        <a href="#why" class="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:text-blue-400">Por que nós</a>
        <a href="#pricing" class="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:text-blue-400">Planos</a>
        <a href="#services" class="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:text-blue-400">Serviços</a>
        <a href="#testimonials" class="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:text-blue-400">Clientes</a>
        <a href="#contact" class="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:text-blue-400">Contato</a>
      </div>

      <!-- CTA + Mobile toggle -->
      <div class="flex items-center gap-3">
        <a href="#contact" class="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 glow-btn hover:scale-105">
          <i class="fas fa-rocket text-xs"></i>
          Começar agora
        </a>
        <button id="menu-toggle" class="lg:hidden p-2 text-slate-300 hover:text-white">
          <i class="fas fa-bars text-xl" id="menu-icon"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="lg:hidden">
      <div class="mt-4 p-4 rounded-2xl glass space-y-3 mx-0">
        <a href="#features" class="block text-slate-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onclick="closeMobileMenu()">Soluções</a>
        <a href="#why" class="block text-slate-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onclick="closeMobileMenu()">Por que nós</a>
        <a href="#pricing" class="block text-slate-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onclick="closeMobileMenu()">Planos</a>
        <a href="#services" class="block text-slate-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onclick="closeMobileMenu()">Serviços</a>
        <a href="#testimonials" class="block text-slate-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onclick="closeMobileMenu()">Clientes</a>
        <a href="#contact" class="block text-slate-300 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-white/5 transition-all" onclick="closeMobileMenu()">Contato</a>
        <a href="#contact" class="block w-full text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold py-3 rounded-xl mt-2" onclick="closeMobileMenu()">
          Começar agora <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  </nav>

  <!-- ======================== HERO ======================== -->
  <section class="relative min-h-screen hero-bg grid-bg flex items-center overflow-hidden pt-20">
    <!-- Particles -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="particle w-2 h-2 bg-blue-500/40 top-1/4 left-1/6" style="animation-delay:0s"></div>
      <div class="particle w-3 h-3 bg-violet-500/30 top-1/3 right-1/4" style="animation-delay:2s"></div>
      <div class="particle w-1.5 h-1.5 bg-cyan-500/40 bottom-1/3 left-1/3" style="animation-delay:4s"></div>
      <div class="particle w-2 h-2 bg-blue-400/30 top-2/3 right-1/5" style="animation-delay:1s"></div>
      <div class="particle w-4 h-4 bg-violet-400/20 top-1/5 right-1/3" style="animation-delay:3s"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
      <!-- Left Content -->
      <div class="space-y-8">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span class="text-blue-300 font-medium">+200 empresas já transformaram seus dados</span>
        </div>

        <!-- Headline -->
        <div class="space-y-3">
          <h1 class="hero-title text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            Transforme dados em
            <span class="block gradient-text">decisões inteligentes</span>
          </h1>
          <p class="text-lg text-slate-400 leading-relaxed max-w-lg">
            A Smart Visio combina <strong class="text-slate-200">dashboards interativos</strong>, 
            <strong class="text-slate-200">relatórios automatizados</strong> e 
            <strong class="text-slate-200">inteligência de dados</strong> para impulsionar 
            a produtividade e os resultados do seu negócio.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#contact" class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 glow-btn hover:scale-105 text-base">
            <i class="fas fa-rocket"></i>
            Quero começar agora
          </a>
          <a href="#features" class="inline-flex items-center justify-center gap-2 glass hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-base border border-white/10">
            <i class="fas fa-play-circle text-blue-400"></i>
            Ver como funciona
          </a>
        </div>

        <!-- Trust badges -->
        <div class="flex items-center gap-6 pt-2">
          <div class="flex -space-x-2">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">AM</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">RS</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">CP</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">+</div>
          </div>
          <div>
            <div class="flex">
              <i class="star fas fa-star text-sm"></i>
              <i class="star fas fa-star text-sm"></i>
              <i class="star fas fa-star text-sm"></i>
              <i class="star fas fa-star text-sm"></i>
              <i class="star fas fa-star text-sm"></i>
            </div>
            <p class="text-slate-400 text-xs mt-0.5">+200 clientes satisfeitos</p>
          </div>
        </div>
      </div>

      <!-- Right: Dashboard Mockup -->
      <div class="relative animate-float hidden lg:block">
        <!-- Main dashboard card -->
        <div class="dashboard-card p-6 shadow-2xl glow-blue">
          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="text-white font-semibold text-sm">Visão Geral do Negócio</h3>
              <p class="text-slate-400 text-xs">Fevereiro 2025</p>
            </div>
            <div class="flex gap-1">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>

          <!-- Stats row -->
          <div class="grid grid-cols-3 gap-3 mb-5">
            <div class="bg-blue-600/20 rounded-xl p-3 border border-blue-500/20">
              <p class="text-slate-400 text-xs mb-1">Receita</p>
              <p class="text-white font-bold text-lg">R$248k</p>
              <p class="text-green-400 text-xs flex items-center gap-1">
                <i class="fas fa-arrow-up text-xs"></i>+18%
              </p>
            </div>
            <div class="bg-violet-600/20 rounded-xl p-3 border border-violet-500/20">
              <p class="text-slate-400 text-xs mb-1">Clientes</p>
              <p class="text-white font-bold text-lg">1,429</p>
              <p class="text-green-400 text-xs flex items-center gap-1">
                <i class="fas fa-arrow-up text-xs"></i>+23%
              </p>
            </div>
            <div class="bg-cyan-600/20 rounded-xl p-3 border border-cyan-500/20">
              <p class="text-slate-400 text-xs mb-1">Conversão</p>
              <p class="text-white font-bold text-lg">68.5%</p>
              <p class="text-green-400 text-xs flex items-center gap-1">
                <i class="fas fa-arrow-up text-xs"></i>+5%
              </p>
            </div>
          </div>

          <!-- Chart area -->
          <div class="bg-slate-800/50 rounded-xl p-4 mb-4">
            <p class="text-slate-400 text-xs mb-3 flex items-center justify-between">
              <span>Evolução Mensal</span>
              <span class="text-blue-400">Ver mais →</span>
            </p>
            <div class="flex items-end gap-2 h-24">
              <div class="flex-1 bg-blue-600/30 rounded-t chart-bar" data-height="40%" style="--target-height: 40%"></div>
              <div class="flex-1 bg-blue-600/40 rounded-t chart-bar" data-height="60%" style="--target-height: 60%"></div>
              <div class="flex-1 bg-blue-600/50 rounded-t chart-bar" data-height="45%" style="--target-height: 45%"></div>
              <div class="flex-1 bg-blue-600/60 rounded-t chart-bar" data-height="75%" style="--target-height: 75%"></div>
              <div class="flex-1 bg-blue-600/70 rounded-t chart-bar" data-height="55%" style="--target-height: 55%"></div>
              <div class="flex-1 bg-blue-600/80 rounded-t chart-bar" data-height="85%" style="--target-height: 85%"></div>
              <div class="flex-1 bg-gradient-to-t from-blue-600 to-violet-500 rounded-t chart-bar" data-height="100%" style="--target-height: 100%"></div>
            </div>
            <div class="flex justify-between mt-2">
              <span class="text-slate-500 text-xs">Ago</span>
              <span class="text-slate-500 text-xs">Set</span>
              <span class="text-slate-500 text-xs">Out</span>
              <span class="text-slate-500 text-xs">Nov</span>
              <span class="text-slate-500 text-xs">Dez</span>
              <span class="text-slate-500 text-xs">Jan</span>
              <span class="text-blue-400 text-xs font-semibold">Fev</span>
            </div>
          </div>

          <!-- Progress metrics -->
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="text-slate-400 text-xs w-20">Vendas</span>
              <div class="flex-1 bg-slate-700 rounded-full h-1.5">
                <div class="bg-gradient-to-r from-blue-500 to-violet-500 h-1.5 rounded-full progress-bar" style="width: 82%"></div>
              </div>
              <span class="text-slate-300 text-xs w-8">82%</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-slate-400 text-xs w-20">Engajamento</span>
              <div class="flex-1 bg-slate-700 rounded-full h-1.5">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full progress-bar" style="width: 67%"></div>
              </div>
              <span class="text-slate-300 text-xs w-8">67%</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-slate-400 text-xs w-20">Satisfação</span>
              <div class="flex-1 bg-slate-700 rounded-full h-1.5">
                <div class="bg-gradient-to-r from-green-500 to-cyan-500 h-1.5 rounded-full progress-bar" style="width: 98%"></div>
              </div>
              <span class="text-slate-300 text-xs w-8">98%</span>
            </div>
          </div>
        </div>

        <!-- Floating notification card -->
        <div class="absolute -top-6 -right-8 dashboard-card p-3 notif-pulse w-52">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <i class="fas fa-check text-green-400 text-xs"></i>
            </div>
            <div>
              <p class="text-white text-xs font-semibold">Meta atingida!</p>
              <p class="text-slate-400 text-xs">+R$ 48k vs mês anterior</p>
            </div>
          </div>
        </div>

        <!-- Floating small card -->
        <div class="absolute -bottom-6 -left-8 dashboard-card p-3 w-44">
          <p class="text-slate-400 text-xs mb-1">NPS Score</p>
          <p class="text-white font-bold text-xl">94 <span class="text-green-400 text-sm">↑</span></p>
          <div class="flex gap-0.5 mt-1">
            <div class="h-1.5 flex-1 bg-green-500 rounded-full"></div>
            <div class="h-1.5 flex-1 bg-green-500 rounded-full"></div>
            <div class="h-1.5 flex-1 bg-green-500 rounded-full"></div>
            <div class="h-1.5 flex-1 bg-green-400 rounded-full"></div>
            <div class="h-1.5 flex-1 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        <!-- Blur glow -->
        <div class="absolute inset-0 -z-10 bg-blue-600/10 blur-3xl rounded-full"></div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-slate-500 text-xs">Rolar para baixo</span>
      <i class="fas fa-chevron-down text-slate-500 text-sm"></i>
    </div>
  </section>

  <!-- ======================== STATS ======================== -->
  <section id="stats" class="py-20 bg-slate-900 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center reveal">
          <div class="text-4xl lg:text-5xl font-black gradient-text mb-2" data-count="98" data-suffix="%">0%</div>
          <p class="text-slate-400 text-sm font-medium">Satisfação dos clientes</p>
        </div>
        <div class="text-center reveal">
          <div class="text-4xl lg:text-5xl font-black gradient-text mb-2" data-count="45" data-suffix="%" data-prefix="+">+0%</div>
          <p class="text-slate-400 text-sm font-medium">Aumento de produtividade</p>
        </div>
        <div class="text-center reveal">
          <div class="text-4xl lg:text-5xl font-black gradient-text mb-2">24/7</div>
          <p class="text-slate-400 text-sm font-medium">Suporte especializado</p>
        </div>
        <div class="text-center reveal">
          <div class="text-4xl lg:text-5xl font-black gradient-text mb-2" data-count="5" data-suffix="+ anos">0 anos</div>
          <p class="text-slate-400 text-sm font-medium">de experiência no mercado</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== FEATURES ======================== -->
  <section id="features" class="py-24 bg-slate-950 relative overflow-hidden">
    <div class="absolute inset-0 grid-bg opacity-50"></div>
    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm mb-4">
          <i class="fas fa-bolt text-yellow-400 text-xs"></i>
          <span class="text-blue-300">Nossas soluções</span>
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-white mb-4">
          Tecnologia e inteligência<br/>
          <span class="gradient-text">a favor do seu negócio</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Combinamos o que há de mais avançado em tecnologia para impulsionar seu crescimento 
          com dados reais e insights acionáveis.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Feature 1 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.1s">
          <div class="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-chart-bar text-blue-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Dashboards Intuitivos</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Visualize dados complexos de forma simples e tome decisões baseadas em informações precisas e em tempo real.
          </p>
          <div class="mt-4 pt-4 border-t border-white/5">
            <a href="#contact" class="text-blue-400 text-sm font-medium hover:text-blue-300 flex items-center gap-1 group">
              Saiba mais 
              <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.2s">
          <div class="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-file-alt text-violet-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Relatórios Automatizados</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Economize tempo com relatórios gerados automaticamente e personalizados para as necessidades da sua empresa.
          </p>
          <div class="mt-4 pt-4 border-t border-white/5">
            <a href="#contact" class="text-violet-400 text-sm font-medium hover:text-violet-300 flex items-center gap-1 group">
              Saiba mais 
              <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.3s">
          <div class="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-plug text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Integração Total</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Conecte-se facilmente com outros sistemas e centralize todas as informações do seu negócio em um único lugar.
          </p>
          <div class="mt-4 pt-4 border-t border-white/5">
            <a href="#contact" class="text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center gap-1 group">
              Saiba mais 
              <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.4s">
          <div class="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-brain text-pink-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Inteligência de Dados</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Algoritmos avançados que transformam dados brutos em insights acionáveis e previsões estratégicas para o seu negócio.
          </p>
          <div class="mt-4 pt-4 border-t border-white/5">
            <a href="#contact" class="text-pink-400 text-sm font-medium hover:text-pink-300 flex items-center gap-1 group">
              Saiba mais 
              <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== WHY CHOOSE ======================== -->
  <section id="why" class="py-24 bg-slate-900 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Visual -->
        <div class="relative reveal">
          <!-- Central big card -->
          <div class="dashboard-card p-6 shadow-2xl">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-white font-semibold">Performance Score</h4>
              <span class="badge px-3 py-1 rounded-full text-xs text-blue-300">Ao vivo</span>
            </div>
            <!-- Donut chart simulation -->
            <div class="flex items-center gap-6 mb-6">
              <div class="relative w-32 h-32">
                <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(59,130,246,0.1)" stroke-width="12"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad1)" stroke-width="12"
                          stroke-dasharray="219.9" stroke-dashoffset="39.6" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#3b82f6"/>
                      <stop offset="100%" style="stop-color:#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center flex-col">
                  <span class="text-white font-black text-2xl">82%</span>
                  <span class="text-slate-400 text-xs">Eficiência</span>
                </div>
              </div>
              <div class="space-y-3 flex-1">
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Processos</span><span class="text-white">94%</span>
                  </div>
                  <div class="h-1.5 bg-slate-700 rounded-full">
                    <div class="h-1.5 bg-blue-500 rounded-full progress-bar" style="width:94%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Automação</span><span class="text-white">78%</span>
                  </div>
                  <div class="h-1.5 bg-slate-700 rounded-full">
                    <div class="h-1.5 bg-violet-500 rounded-full progress-bar" style="width:78%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Insights</span><span class="text-white">87%</span>
                  </div>
                  <div class="h-1.5 bg-slate-700 rounded-full">
                    <div class="h-1.5 bg-cyan-500 rounded-full progress-bar" style="width:87%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mini metrics -->
            <div class="grid grid-cols-3 gap-3">
              <div class="bg-slate-800 rounded-xl p-3 text-center">
                <i class="fas fa-users text-blue-400 mb-1 text-sm"></i>
                <p class="text-white font-bold text-sm">1.4k</p>
                <p class="text-slate-400 text-xs">Usuários</p>
              </div>
              <div class="bg-slate-800 rounded-xl p-3 text-center">
                <i class="fas fa-file-chart-bar text-violet-400 mb-1 text-sm"></i>
                <p class="text-white font-bold text-sm">348</p>
                <p class="text-slate-400 text-xs">Relatórios</p>
              </div>
              <div class="bg-slate-800 rounded-xl p-3 text-center">
                <i class="fas fa-clock text-cyan-400 mb-1 text-sm"></i>
                <p class="text-white font-bold text-sm">-68%</p>
                <p class="text-slate-400 text-xs">Tempo</p>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="absolute -top-8 -left-8 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
          <div class="absolute -bottom-8 -right-8 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl"></div>
        </div>

        <!-- Right: Benefits list -->
        <div class="space-y-6 reveal">
          <div>
            <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm mb-4">
              <i class="fas fa-star text-yellow-400 text-xs"></i>
              <span class="text-blue-300">Por que escolher a Smart Visio?</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-3">
              Resultados reais,<br/>
              <span class="gradient-text">não apenas promessas</span>
            </h2>
            <p class="text-slate-400 leading-relaxed">
              Descubra como nossa solução pode transformar a maneira como você gerencia, 
              analisa e decide no seu negócio.
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-blue-400 text-sm"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">Automação Inteligente</h4>
                <p class="text-slate-400 text-sm">Automatize tarefas repetitivas e libere sua equipe para focar no que realmente importa.</p>
              </div>
            </div>

            <div class="flex gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-bolt text-violet-400 text-sm"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">Decisões em Tempo Real</h4>
                <p class="text-slate-400 text-sm">Acesse informações atualizadas e tome decisões estratégicas com confiança e agilidade.</p>
              </div>
            </div>

            <div class="flex gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-shield-alt text-cyan-400 text-sm"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">Segurança Total</h4>
                <p class="text-slate-400 text-sm">Proteja seus dados com as mais modernas tecnologias de criptografia e controle de acesso.</p>
              </div>
            </div>

            <div class="flex gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-expand-arrows-alt text-green-400 text-sm"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">Escalabilidade Total</h4>
                <p class="text-slate-400 text-sm">Cresça sem preocupações com uma solução que se adapta perfeitamente ao tamanho do seu negócio.</p>
              </div>
            </div>

            <div class="flex gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-piggy-bank text-orange-400 text-sm"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">Redução de Custos</h4>
                <p class="text-slate-400 text-sm">Otimize recursos e reduza desperdícios com análises precisas e processos eficientes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== TESTIMONIALS ======================== -->
  <section id="testimonials" class="py-24 bg-slate-950 relative overflow-hidden">
    <div class="absolute inset-0 grid-bg opacity-30"></div>
    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm mb-4">
          <i class="fas fa-heart text-red-400 text-xs"></i>
          <span class="text-blue-300">Depoimentos</span>
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-white mb-4">
          O que nossos <span class="gradient-text">clientes dizem</span>
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">
          Conheça as experiências reais de quem já transformou seu negócio com a Smart Visio.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- T1 -->
        <div class="testimonial-card glass rounded-2xl p-6 reveal" style="transition-delay:0.1s">
          <div class="flex gap-1 mb-4">
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
          </div>
          <p class="text-slate-300 leading-relaxed mb-6 text-sm">
            "A Smart Visio revolucionou a forma como gerenciamos nossos projetos. A produtividade 
            aumentou em mais de 40% e as decisões são tomadas com muito mais segurança e embasamento."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">AM</div>
            <div>
              <p class="text-white font-semibold text-sm">Ana Martins</p>
              <p class="text-slate-400 text-xs">Diretora de Operações · TechSoft</p>
            </div>
          </div>
        </div>

        <!-- T2 -->
        <div class="testimonial-card rounded-2xl p-6 gradient-border reveal" style="transition-delay:0.2s; background: rgba(30,41,59,0.8)">
          <div class="flex gap-1 mb-4">
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
          </div>
          <p class="text-slate-300 leading-relaxed mb-6 text-sm">
            "Implementamos a Smart Visio há 6 meses e já percebemos uma redução significativa 
            nos erros operacionais. O suporte é excelente e sempre disponível quando precisamos."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm">RS</div>
            <div>
              <p class="text-white font-semibold text-sm">Ricardo Silva</p>
              <p class="text-slate-400 text-xs">CEO · Inovare Soluções</p>
            </div>
          </div>
        </div>

        <!-- T3 -->
        <div class="testimonial-card glass rounded-2xl p-6 reveal" style="transition-delay:0.3s">
          <div class="flex gap-1 mb-4">
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
            <i class="star fas fa-star text-sm"></i>
          </div>
          <p class="text-slate-300 leading-relaxed mb-6 text-sm">
            "Os dashboards da Smart Visio são incrivelmente intuitivos. Conseguimos visualizar 
            informações complexas de forma simples e tomar decisões estratégicas rapidamente."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">CP</div>
            <div>
              <p class="text-white font-semibold text-sm">Carla Pereira</p>
              <p class="text-slate-400 text-xs">Gerente de Projetos · Global Tech</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Brands -->
      <div class="mt-16 text-center reveal">
        <p class="text-slate-500 text-sm mb-6">Empresas que confiam na Smart Visio</p>
        <div class="flex flex-wrap items-center justify-center gap-8 opacity-40">
          <span class="text-slate-300 font-bold text-lg tracking-wider">TECHSOFT</span>
          <span class="text-slate-300 font-bold text-lg tracking-wider">INOVARE</span>
          <span class="text-slate-300 font-bold text-lg tracking-wider">GLOBAL TECH</span>
          <span class="text-slate-300 font-bold text-lg tracking-wider">NEXUS</span>
          <span class="text-slate-300 font-bold text-lg tracking-wider">DATAFLOW</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== PRICING ======================== -->
  <section id="pricing" class="py-24 bg-slate-900 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm mb-4">
          <i class="fas fa-tag text-green-400 text-xs"></i>
          <span class="text-blue-300">Planos e preços</span>
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-white mb-4">
          Planos que <span class="gradient-text">se adaptam</span><br/>ao seu negócio
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">
          Escolha o plano ideal e comece a transformar sua empresa hoje mesmo.
        </p>
      </div>

      <!-- Plans Grid -->
      <div class="grid md:grid-cols-3 gap-6 items-start">
        <!-- Basic -->
        <div class="pricing-card glass rounded-2xl p-7 reveal" style="transition-delay:0.1s">
          <div class="mb-6">
            <div class="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center mb-4">
              <i class="fas fa-seedling text-blue-400"></i>
            </div>
            <h3 class="text-white font-bold text-xl mb-1">Básico</h3>
            <p class="text-slate-400 text-sm">Ideal para começar a transformar dados em decisões.</p>
          </div>
          <div class="mb-6">
            <div class="flex items-end gap-1">
              <span class="text-slate-400 text-sm">R$</span>
              <span class="text-white font-black text-4xl">597</span>
              <span class="text-slate-400 text-sm mb-1">/mês</span>
            </div>
          </div>
          <ul class="space-y-3 mb-7">
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Diagnóstico inicial do negócio
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Criação de 1 dashboard básico
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Relatório mensal com indicadores
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              1 reunião mensal de análise
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Suporte por e-mail
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Acesso a modelo padrão de controle
            </li>
          </ul>
          <a href="#contact" class="block w-full text-center glass hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl transition-all hover:border-blue-500/50">
            Começar agora
          </a>
        </div>

        <!-- Professional (Featured) -->
        <div class="pricing-card rounded-2xl p-7 bg-gradient-to-b from-blue-600/20 to-violet-600/20 border border-blue-500/30 reveal relative" style="transition-delay:0.2s">
          <!-- Popular badge -->
          <div class="absolute -top-4 left-1/2 -translate-x-1/2">
            <span class="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              ⭐ Mais contratado
            </span>
          </div>
          <div class="mb-6">
            <div class="w-10 h-10 rounded-xl bg-blue-600/30 flex items-center justify-center mb-4">
              <i class="fas fa-rocket text-blue-400"></i>
            </div>
            <h3 class="text-white font-bold text-xl mb-1">Profissional</h3>
            <p class="text-slate-400 text-sm">O mais escolhido por empresas que buscam resultados rápidos.</p>
          </div>
          <div class="mb-6">
            <div class="flex items-end gap-1">
              <span class="text-slate-400 text-sm">R$</span>
              <span class="text-white font-black text-4xl">997</span>
              <span class="text-slate-400 text-sm mb-1">/mês</span>
            </div>
          </div>
          <ul class="space-y-3 mb-7">
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Tudo do plano Básico
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Dashboards interativos
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Análises comparativas
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              2 reuniões mensais
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Templates personalizados
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Suporte por WhatsApp
            </li>
          </ul>
          <a href="#contact" class="block w-full text-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl transition-all glow-btn hover:scale-105">
            Quero este plano
          </a>
        </div>

        <!-- Advanced -->
        <div class="pricing-card glass rounded-2xl p-7 reveal" style="transition-delay:0.3s">
          <div class="mb-6">
            <div class="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center mb-4">
              <i class="fas fa-crown text-violet-400"></i>
            </div>
            <h3 class="text-white font-bold text-xl mb-1">Avançado</h3>
            <p class="text-slate-400 text-sm">Para empresas que querem ir além com previsibilidade total.</p>
          </div>
          <div class="mb-6">
            <div class="flex items-end gap-1">
              <span class="text-slate-400 text-sm">R$</span>
              <span class="text-white font-black text-4xl">1.397</span>
              <span class="text-slate-400 text-sm mb-1">/mês</span>
            </div>
          </div>
          <ul class="space-y-3 mb-7">
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Tudo dos planos anteriores
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Modelos preditivos e simulações
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Indicadores especiais por área/time
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Suporte direto via WhatsApp
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              1 reunião emergencial sob demanda
            </li>
            <li class="flex items-start gap-2.5 text-sm text-slate-300">
              <i class="fas fa-check text-green-400 mt-0.5 flex-shrink-0"></i>
              Relatório executivo mensal
            </li>
          </ul>
          <a href="#contact" class="block w-full text-center glass hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl transition-all hover:border-violet-500/50">
            Começar agora
          </a>
        </div>
      </div>

      <!-- Custom plan CTA -->
      <div class="mt-10 text-center reveal">
        <p class="text-slate-400">
          Precisa de um plano personalizado?
          <a href="#contact" class="text-blue-400 hover:text-blue-300 font-semibold ml-1 underline underline-offset-2">Entre em contato conosco →</a>
        </p>
      </div>
    </div>
  </section>

  <!-- ======================== SERVICES ======================== -->
  <section id="services" class="py-24 bg-slate-950 relative overflow-hidden">
    <div class="absolute inset-0 grid-bg opacity-30"></div>
    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm mb-4">
          <i class="fas fa-tools text-orange-400 text-xs"></i>
          <span class="text-blue-300">Serviços avulsos</span>
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-white mb-4">
          Soluções <span class="gradient-text">personalizadas</span><br/>para sua necessidade
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">
          Além dos planos mensais, oferecemos serviços pontuais para transformar seu negócio.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- S1 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.1s">
          <div class="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-database text-blue-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold mb-2">Organização de Dados</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">
            Transformamos dados espalhados em planilhas, WhatsApp e e-mails em uma base limpa, visual e centralizada.
          </p>
          <div class="pt-3 border-t border-white/5">
            <p class="text-blue-400 font-bold">A partir de R$ 197,90</p>
          </div>
        </div>

        <!-- S2 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.2s">
          <div class="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-search text-violet-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold mb-2">Diagnóstico Estratégico</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">
            Mapeamento completo do seu negócio, análise dos dados disponíveis e plano de ação personalizado.
          </p>
          <div class="pt-3 border-t border-white/5">
            <p class="text-violet-400 font-bold">R$ 797,90</p>
          </div>
        </div>

        <!-- S3 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.3s">
          <div class="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-user-tie text-cyan-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold mb-2">Mentoria Estratégica</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">
            Encontro individual com análise dos seus dados e orientações práticas para decisões mais inteligentes.
          </p>
          <div class="pt-3 border-t border-white/5">
            <p class="text-cyan-400 font-bold">R$ 390 <span class="text-slate-400 font-normal text-xs">/ sessão (1h)</span></p>
          </div>
        </div>

        <!-- S4 -->
        <div class="feature-card glass rounded-2xl p-6 reveal" style="transition-delay:0.4s">
          <div class="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center mb-4">
            <i class="fas fa-tachometer-alt text-pink-400 text-xl"></i>
          </div>
          <h3 class="text-white font-bold mb-2">Dashboard Avulso</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">
            Painel personalizado com explicação de como usar os dados para tomar melhores decisões na sua operação.
          </p>
          <div class="pt-3 border-t border-white/5">
            <p class="text-pink-400 font-bold">R$ 1.000 a R$ 2.000</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== CONTACT ======================== -->
  <section id="contact" class="py-24 bg-slate-900 relative overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 badge px-4 py-2 rounded-full text-sm mb-4">
          <i class="fas fa-envelope text-blue-400 text-xs"></i>
          <span class="text-blue-300">Fale conosco</span>
        </div>
        <h2 class="text-3xl lg:text-5xl font-black text-white mb-4">
          Pronto para <span class="gradient-text">transformar</span><br/>seu negócio?
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">
          Entre em contato hoje mesmo e descubra como a Smart Visio pode revolucionar sua gestão.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-10">
        <!-- Info cards -->
        <div class="lg:col-span-2 space-y-5 reveal">
          <div class="glass rounded-2xl p-5 flex gap-4 items-start hover:bg-white/5 transition-all">
            <div class="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-map-marker-alt text-blue-400"></i>
            </div>
            <div>
              <p class="text-white font-semibold mb-0.5">Localização</p>
              <p class="text-slate-400 text-sm">Fortaleza - CE</p>
              <p class="text-slate-400 text-sm">Atendemos em todo o Brasil</p>
            </div>
          </div>

          <div class="glass rounded-2xl p-5 flex gap-4 items-start hover:bg-white/5 transition-all">
            <div class="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-envelope text-violet-400"></i>
            </div>
            <div>
              <p class="text-white font-semibold mb-0.5">E-mail</p>
              <a href="mailto:contato@smartvisio.com.br" class="text-blue-400 hover:text-blue-300 text-sm">
                contato@smartvisio.com.br
              </a>
            </div>
          </div>

          <div class="glass rounded-2xl p-5 flex gap-4 items-start hover:bg-white/5 transition-all">
            <div class="w-11 h-11 rounded-xl bg-green-600/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
              <i class="fab fa-whatsapp text-green-400 text-lg"></i>
            </div>
            <div>
              <p class="text-white font-semibold mb-0.5">WhatsApp</p>
              <a href="tel:+558534567890" class="text-blue-400 hover:text-blue-300 text-sm">(85) 3456-7890</a>
            </div>
          </div>

          <div class="glass rounded-2xl p-5 flex gap-4 items-start hover:bg-white/5 transition-all">
            <div class="w-11 h-11 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-clock text-cyan-400"></i>
            </div>
            <div>
              <p class="text-white font-semibold mb-0.5">Horário de atendimento</p>
              <p class="text-slate-400 text-sm">Segunda a Sexta</p>
              <p class="text-slate-400 text-sm">9h às 18h</p>
            </div>
          </div>

          <!-- WhatsApp CTA -->
          <a href="https://wa.me/5585999999999?text=Olá! Tenho interesse nas soluções da Smart Visio." 
             target="_blank"
             class="whatsapp-btn flex items-center justify-center gap-3 w-full text-white font-bold py-4 rounded-2xl text-base">
            <i class="fab fa-whatsapp text-xl"></i>
            Conversar no WhatsApp
          </a>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-3 glass rounded-2xl p-7 reveal">
          <h3 class="text-white font-bold text-xl mb-6">Envie uma mensagem</h3>
          <form id="contact-form" class="space-y-4" novalidate>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-400 text-sm mb-1.5" for="name">Nome *</label>
                <input type="text" id="name" name="name" required
                  class="form-input w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all"
                  placeholder="Seu nome completo" />
              </div>
              <div>
                <label class="block text-slate-400 text-sm mb-1.5" for="email">E-mail *</label>
                <input type="email" id="email" name="email" required
                  class="form-input w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all"
                  placeholder="seu@email.com" />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-400 text-sm mb-1.5" for="phone">Telefone</label>
                <input type="tel" id="phone" name="phone"
                  class="form-input w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all"
                  placeholder="(85) 99999-9999" />
              </div>
              <div>
                <label class="block text-slate-400 text-sm mb-1.5" for="company">Empresa</label>
                <input type="text" id="company" name="company"
                  class="form-input w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all"
                  placeholder="Nome da sua empresa" />
              </div>
            </div>

            <div>
              <label class="block text-slate-400 text-sm mb-1.5" for="service">Serviço de interesse</label>
              <select id="service" name="service"
                class="form-input w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm transition-all appearance-none cursor-pointer">
                <option value="" class="bg-slate-800">Selecione um serviço</option>
                <option value="basic" class="bg-slate-800">Plano Básico – R$ 597/mês</option>
                <option value="professional" class="bg-slate-800">Plano Profissional – R$ 997/mês</option>
                <option value="advanced" class="bg-slate-800">Plano Avançado – R$ 1.397/mês</option>
                <option value="data-org" class="bg-slate-800">Organização de Dados</option>
                <option value="diagnostic" class="bg-slate-800">Diagnóstico Estratégico</option>
                <option value="mentoring" class="bg-slate-800">Mentoria Estratégica</option>
                <option value="dashboard" class="bg-slate-800">Dashboard Avulso</option>
                <option value="custom" class="bg-slate-800">Plano Personalizado</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 text-sm mb-1.5" for="message">Mensagem *</label>
              <textarea id="message" name="message" rows="4" required
                class="form-input w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all resize-none"
                placeholder="Conte-nos sobre seu negócio e como podemos ajudar..."></textarea>
            </div>

            <!-- Form status -->
            <div id="form-status" class="hidden"></div>

            <button type="submit" id="submit-btn"
              class="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl transition-all duration-300 glow-btn hover:scale-[1.02] flex items-center justify-center gap-2 text-base">
              <i class="fas fa-paper-plane"></i>
              Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== FOOTER ======================== -->
  <footer class="bg-slate-950 border-t border-slate-800 py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-10">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <i class="fas fa-chart-line text-white"></i>
            </div>
            <span class="text-xl font-bold">
              <span class="text-white">Smart</span><span class="gradient-text">Visio</span>
            </span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
            Transformamos dados em decisões estratégicas para impulsionar a produtividade 
            e os resultados do seu negócio.
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-600/10 transition-all">
              <i class="fab fa-linkedin-in text-sm"></i>
            </a>
            <a href="#" class="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-600/10 transition-all">
              <i class="fab fa-instagram text-sm"></i>
            </a>
            <a href="#" class="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-600/10 transition-all">
              <i class="fab fa-youtube text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm">Navegação</h4>
          <ul class="space-y-2.5">
            <li><a href="#features" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">Soluções</a></li>
            <li><a href="#why" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">Por que nós</a></li>
            <li><a href="#pricing" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">Planos</a></li>
            <li><a href="#services" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">Serviços</a></li>
            <li><a href="#testimonials" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">Clientes</a></li>
            <li><a href="#contact" class="text-slate-400 hover:text-blue-400 text-sm transition-colors">Contato</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm">Contato</h4>
          <ul class="space-y-3">
            <li class="flex gap-2 text-slate-400 text-sm">
              <i class="fas fa-map-marker-alt mt-0.5 text-blue-400"></i>
              Fortaleza - CE
            </li>
            <li class="flex gap-2 text-sm">
              <i class="fas fa-envelope mt-0.5 text-blue-400"></i>
              <a href="mailto:contato@smartvisio.com.br" class="text-slate-400 hover:text-blue-400 transition-colors">
                contato@smartvisio.com.br
              </a>
            </li>
            <li class="flex gap-2 text-sm">
              <i class="fas fa-phone mt-0.5 text-blue-400"></i>
              <a href="tel:+558534567890" class="text-slate-400 hover:text-blue-400 transition-colors">
                (85) 3456-7890
              </a>
            </li>
            <li class="flex gap-2 text-slate-400 text-sm">
              <i class="fas fa-clock mt-0.5 text-blue-400"></i>
              Seg–Sex, 9h–18h
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="section-divider mb-6"></div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-slate-500 text-sm">
          © 2025 Smart Visio. Todos os direitos reservados.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">Política de Privacidade</a>
          <a href="#" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp button -->
  <a href="https://wa.me/5585999999999?text=Olá! Tenho interesse nas soluções da Smart Visio."
     target="_blank"
     class="fixed bottom-6 right-6 z-50 whatsapp-btn w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
     title="Falar no WhatsApp">
    <i class="fab fa-whatsapp text-white text-2xl"></i>
  </a>

  <!-- ======================== JAVASCRIPT ======================== -->
  <script>
    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    });

    // ---- Mobile menu toggle ----
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isOpen = false;

    menuToggle.addEventListener('click', () => {
      isOpen = !isOpen;
      mobileMenu.classList.toggle('open', isOpen);
      menuIcon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
    });

    function closeMobileMenu() {
      isOpen = false;
      mobileMenu.classList.remove('open');
      menuIcon.className = 'fas fa-bars text-xl';
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // ---- Scroll Reveal ----
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ---- Counter Animation ----
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = prefix + Math.floor(current) + suffix;
      }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.getAttribute('data-count')) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // ---- Progress bars animation ----
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => { bar.style.width = width; }, 100);
          });
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.dashboard-card').forEach(card => progressObserver.observe(card));

    // ---- Chart bars animation ----
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.chart-bar').forEach((bar, i) => {
            setTimeout(() => {
              bar.classList.add('animated');
            }, i * 100);
          });
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.dashboard-card').forEach(card => chartObserver.observe(card));

    // ---- Contact Form ----
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    // Phone mask
    document.getElementById('phone').addEventListener('input', function(e) {
      let value = e.target.value.replace(/\\D/g, '');
      if (value.length <= 10) {
        value = value.replace(/(\\d{2})(\\d{4})(\\d{0,4})/, '($1) $2-$3');
      } else {
        value = value.replace(/(\\d{2})(\\d{5})(\\d{0,4})/, '($1) $2-$3');
      }
      e.target.value = value;
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showStatus('error', '<i class="fas fa-exclamation-circle mr-2"></i>Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        showStatus('error', '<i class="fas fa-exclamation-circle mr-2"></i>Por favor, informe um e-mail válido.');
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message
          })
        });

        const data = await response.json();

        if (data.success) {
          showStatus('success', '<i class="fas fa-check-circle mr-2"></i>' + data.message);
          form.reset();
        } else {
          showStatus('error', '<i class="fas fa-exclamation-circle mr-2"></i>' + (data.error || 'Erro ao enviar. Tente novamente.'));
        }
      } catch (err) {
        showStatus('error', '<i class="fas fa-exclamation-circle mr-2"></i>Erro de conexão. Tente novamente.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensagem';
      }
    });

    function showStatus(type, html) {
      statusDiv.classList.remove('hidden');
      if (type === 'success') {
        statusDiv.className = 'flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm';
      } else {
        statusDiv.className = 'flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm';
      }
      statusDiv.innerHTML = html;

      if (type === 'success') {
        setTimeout(() => {
          statusDiv.classList.add('hidden');
        }, 6000);
      }
    }

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('text-blue-400');
        link.classList.add('text-slate-300');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('text-blue-400');
          link.classList.remove('text-slate-300');
        }
      });
    });

    // ---- Typewriter effect in hero ----
    const words = ['decisões inteligentes', 'vantagem competitiva', 'crescimento real', 'resultados expressivos'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeEl = document.querySelector('.gradient-text');

    if (typeEl) {
      function typeWriter() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
          typeEl.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typeEl.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => { isDeleting = true; typeWriter(); }, 2500);
          return;
        }
        if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeWriter, isDeleting ? 50 : 90);
      }
      setTimeout(typeWriter, 1500);
    }

    // ---- Intersection Observer for floating dashboard animation ----
    const dashboards = document.querySelectorAll('.animate-float');
    dashboards.forEach(d => {
      setTimeout(() => {
        d.style.animationPlayState = 'running';
      }, 500);
    });

    console.log('%cSmart Visio', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
    console.log('%cInteligência de dados para o seu negócio.', 'color: #8b5cf6; font-size: 14px;');
  </script>
</body>
</html>`)
})

export default app
