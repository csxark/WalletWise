import { useState } from 'react';
import {
    Wallet,
    TrendingUp,
    Shield,
    BarChart3,
    PiggyBank,
    Target,
    Zap,
    Users,
    Star,
    Plus,
    ArrowRight,
    Play,
    Menu,
    X,
    Moon,
    Sun,
    Sparkles,
    CreditCard,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HomePageProps {
    onSignIn: () => void;
    onSignUp: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSignIn, onSignUp }) => {
    const { isDark, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: BarChart3,
            title: "Smart Analytics",
            description: "Detailed insights into your spending patterns with beautiful visualizations and trend analysis.",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Shield,
            title: "Bank-Grade Security",
            description: "Your financial data is protected with enterprise-level encryption and security protocols.",
            color: "from-green-500 to-green-600"
        },
        {
            icon: Target,
            title: "Goal Tracking",
            description: "Set and achieve your financial goals with intelligent recommendations and progress tracking.",
            color: "from-purple-500 to-purple-600"
        },
        // {
        //     icon: Smartphone,
        //     title: "Mobile First",
        //     description: "Seamlessly manage your finances on any device with our responsive, intuitive interface.",
        //     color: "from-orange-500 to-orange-600"
        // },
        {
            icon: Zap,
            title: "Real-time Sync",
            description: "Instant synchronization across all your devices with offline support and automatic backups.",
            color: "from-yellow-500 to-yellow-600"
        },
        {
            icon: PiggyBank,
            title: "Smart Savings",
            description: "Automated savings recommendations based on your income patterns and spending habits.",
            color: "from-pink-500 to-pink-600"
        }
    ];

    const testimonials = [
    {
        name: "Arjun Mehta",
        role: "Computer Science Student",
        content: "WalletWise is perfect for managing my hostel expenses and pocket money. Helped me track where my ₹8,000 monthly allowance goes!",
        rating: 5,
        avatar: "AM"
    },
    {
        name: "Sneha Reddy",
        role: "Engineering Student",
        content: "Love how I can split mess bills and track study material costs with my roommates. The budget alerts saved me from overspending on books!",
        rating: 5,
        avatar: "SR"
    },
    {
        name: "Karan Singh",
        role: "MBA Student",
        content: "Essential for college life! Tracks everything from canteen expenses to project costs. The savings goals feature helped me save for my laptop!",
        rating: 5,
        avatar: "KS"
    }
];


    // const pricingPlans = [
    //     {
    //         name: "Standard",
    //         price: "Free",
    //         description: "Perfect for getting started with smart finance management",
    //         features: [
    //             "Unlimited transactions",
    //             "Basic analytics",
    //             "Mobile app access",
    //             "Email support",
    //             "Data export"
    //         ],
    //         popular: false
    //     },
    //     {
    //         name: "Smart",
    //         price: "₹299/month",
    //         description: "Advanced features for serious financial planning",
    //         features: [
    //             "Everything in Standard",
    //             "AI-powered insights",
    //             "Goal tracking & recommendations",
    //             "Priority support",
    //             "Advanced analytics",
    //             "Custom categories",
    //             "Automated savings tips"
    //         ],
    //         popular: true
    //     }
    // ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
            }`}>
            {/* Navigation */}
            <nav className={`backdrop-blur-md shadow-lg border-b sticky top-0 z-50 ${isDark
                    ? 'bg-slate-900/95 border-slate-700/50'
                    : 'bg-white/95 border-gray-200/50'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className={`h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl ${isDark
                                    ? 'bg-gradient-to-br from-yellow-500 via-yellow-500 to-amber-500 shadow-yellow-500/25'
                                    : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/25'
                                }`}>
                                <Wallet className="h-5 w-5 lg:h-7 lg:w-7 text-white" />
                            </div>
                            <div>
                                <h1 className={`text-xl lg:text-2xl font-bold bg-clip-text text-transparent ${isDark
                                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                    }`}>
                                    WalletWise
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase hidden sm:block">
                                    Smart Finance
                                </p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium transition-colors">
                                Features
                            </a>
                            {/* <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium transition-colors">
                                Pricing
                            </a> */}
                            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium transition-colors">
                                Reviews
                            </a>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center space-x-3 lg:space-x-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 lg:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${isDark
                                        ? 'text-gray-300 hover:bg-slate-800 hover:text-yellow-300'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                            >
                                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            {/* Desktop Auth Buttons */}
                            <div className="hidden sm:flex items-center space-x-3">
                                <button
                                    onClick={onSignIn}
                                    className="px-4 lg:px-6 py-2 lg:py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-semibold transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={onSignUp}
                                    className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg ${isDark
                                            ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-amber-700 shadow-yellow-500/25'
                                            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/25'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 dark:border-slate-700 py-4 space-y-4">
                            <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium transition-colors">
                                Features
                            </a>
                            {/* <a href="#pricing" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium transition-colors">
                                Pricing
                            </a> */}
                            <a href="#testimonials" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-medium transition-colors">
                                Reviews
                            </a>
                            <div className="flex flex-col sm:hidden space-y-3 pt-4 border-t border-gray-200 dark:border-slate-700">
                                <button
                                    onClick={onSignIn}
                                    className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 font-semibold transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={onSignUp}
                                    className={`text-left px-4 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${isDark
                                            ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 shadow-yellow-500/25'
                                            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-blue-500/25'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium ${isDark
                                    ? 'bg-yellow-900/20 border-yellow-800 text-yellow-400'
                                    : 'bg-blue-50 border-blue-200 text-blue-700'
                                }`}>
                                <Sparkles className="h-4 w-4" />
                                <span>Trusted by 50+ users across India</span>
                            </div>
                        </div>

                        <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8 bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
                                : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                            }`}>
                            Smart Finance
                            <br />
                            <span className={`bg-clip-text text-transparent ${isDark
                                    ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                    : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                }`}>
                                Made Simple
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                            Take control of your financial future with insights, beautiful analytics, and smart recommendations that help you save more and spend wisely.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 lg:mb-16">
                            <button
                                onClick={onSignUp}
                                className={`group flex items-center space-x-3 px-8 lg:px-12 py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl text-white transition-all duration-300 hover:scale-105 shadow-2xl ${isDark
                                        ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 hover:from-amber-500 hover:via-yellow-700 hover:to-amber-700 shadow-yellow-500/30'
                                        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/30'
                                    }`}
                            >
                                <span>Start Today</span>
                                <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="group flex items-center space-x-3 px-6 lg:px-8 py-4 lg:py-5 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
                                <div className={`p-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-100'
                                    }`}>
                                    <Play className="h-4 w-4 lg:h-5 lg:w-5" />
                                </div>
                                <span>Watch Demo</span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className={`text-2xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'
                                    }`}>
                                    50+
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'
                                    }`}>
                                    ₹100K+
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Money Managed</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'
                                    }`}>
                                    4.8★
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Rating</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'
                                    }`}>
                                    99.9%
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl ${isDark ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                    <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl ${isDark ? 'bg-amber-500' : 'bg-indigo-500'
                        }`}></div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-20">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
                                : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                            }`}>
                            Powerful Features for
                            <br />
                            <span className={`bg-clip-text text-transparent ${isDark
                                    ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                    : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                }`}>
                                Smart Finance
                            </span>
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Everything you need to take control of your finances, make smarter decisions, and achieve your financial goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`group p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 ${isDark
                                            ? 'bg-slate-800/95 border-slate-700'
                                            : 'bg-white/95 border-gray-100'
                                        }`}
                                >
                                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className={`py-16 lg:py-24 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50/50'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-20">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
                                : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                            }`}>
                            How WalletWise Works
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Get started in minutes and transform your financial management with our simple 5-step process.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                step: "01",
                                title: "Sign Up & Connect",
                                description: "Create your account and get instant access to your personalized dashboard.",
                                icon: Users,
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                step: "02",
                                title: "Click Add Button",
                                description: "Simply click the add button on the top right corner to open the transaction form.",
                                icon: Plus,
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                step: "03",
                                title: "Add Income/Expense",
                                description: "Fill in your transaction details including amount, category, date, and description.",
                                icon: CreditCard,
                                color: "from-green-500 to-green-600"
                            },
                            {
                                step: "04",
                                title: "View Dashboard",
                                description: "All your income and expenses automatically appear on your dashboard and transaction history.",
                                icon: BarChart3,
                                color: "from-orange-500 to-orange-600"
                            },
                            {
                                step: "05",
                                title: "Track & Analyze",
                                description: "Access detailed analytics and insights to monitor your financial progress effortlessly.",
                                icon: TrendingUp,
                                color: "from-red-500 to-red-600"
                            }
                        ].map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="relative mb-6 lg:mb-8">
                                        <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto shadow-xl`}>
                                            <Icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                                        </div>
                                        <div className={`absolute -top-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold text-white ${isDark ? 'bg-yellow-600' : 'bg-blue-600'
                                            }`}>
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-20">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
                                : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                            }`}>
                            Loved by Users
                            <br />
                            <span className={`bg-clip-text text-transparent ${isDark
                                    ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                    : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                }`}>
                                Across India
                            </span>
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Join thousands of satisfied users who have transformed their financial lives with WalletWise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 ${isDark
                                        ? 'bg-slate-800/95 border-slate-700'
                                        : 'bg-white/95 border-gray-100'
                                    }`}
                            >
                                <div className="flex items-center space-x-1 mb-4 lg:mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 fill-current ${isDark ? 'text-yellow-400' : 'text-yellow-500'
                                            }`} />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 lg:mb-8 leading-relaxed italic">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-white ${isDark ? 'bg-yellow-600' : 'bg-blue-600'
                                        }`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            {/* <section id="pricing" className={`py-16 lg:py-24 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50/50'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-20">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
                                : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                            }`}>
                            Simple, Transparent
                            <br />
                            <span className={`bg-clip-text text-transparent ${isDark
                                    ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                    : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                }`}>
                                Pricing
                            </span>
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Start free and upgrade when you're ready for advanced features. No hidden fees, cancel anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 ${plan.popular
                                        ? isDark
                                            ? 'bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-500/50'
                                            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                                        : isDark
                                            ? 'bg-slate-800/95 border-slate-700'
                                            : 'bg-white/95 border-gray-100'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-white ${isDark ? 'bg-yellow-600' : 'bg-blue-600'
                                        }`}>
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-6 lg:mb-8">
                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {plan.name}
                                    </h3>
                                    <div className={`text-3xl lg:text-5xl font-bold mb-2 ${plan.popular
                                            ? isDark ? 'text-yellow-400' : 'text-blue-600'
                                            : 'text-gray-900 dark:text-white'
                                        }`}>
                                        {plan.price}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {plan.description}
                                    </p>
                                </div>

                                <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center space-x-3">
                                            <CheckCircle className={`h-5 w-5 ${plan.popular
                                                    ? isDark ? 'text-yellow-400' : 'text-blue-600'
                                                    : 'text-green-500'
                                                }`} />
                                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={onSignUp}
                                    className={`w-full py-3 lg:py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg ${plan.popular
                                            ? isDark
                                                ? 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-amber-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-amber-900 text-white shadow-yellow-500/25'
                                                : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-blue-500/25'
                                            : isDark
                                                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                >
                                    {plan.name === 'Standard' ? 'Start Free' : 'Upgrade to Smart'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`relative overflow-hidden rounded-3xl lg:rounded-[2rem] p-8 lg:p-16 text-center ${isDark
                            ? 'bg-gradient-to-br from-yellow-900/20 via-amber-900/20 to-orange-900/20 border border-yellow-500/20'
                            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200'
                        }`}>
                        <div className="relative z-10">
                            <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8 bg-clip-text text-transparent ${isDark
                                    ? 'bg-gradient-to-r from-white via-gray-100 to-gray-200'
                                    : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900'
                                }`}>
                                Ready to Transform
                                <br />
                                <span className={`bg-clip-text text-transparent ${isDark
                                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                    }`}>
                                    Your Finances?
                                </span>
                            </h2>
                            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 lg:mb-12 max-w-3xl mx-auto">
                                Join thousands of users who have already taken control of their financial future. Start your journey today with WalletWise.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <button
                                    onClick={onSignUp}
                                    className={`group flex items-center space-x-3 px-8 lg:px-12 py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl text-white transition-all duration-300 hover:scale-105 shadow-2xl ${isDark
                                            ? 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-amber-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-amber-900 shadow-yellow-500/30'
                                            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/30'
                                        }`}
                                >
                                    <span>Get Started Free</span>
                                    <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={onSignIn}
                                    className="px-6 lg:px-8 py-4 lg:py-5 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
                                >
                                    Already have an account? Sign In
                                </button>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className={`absolute top-1/4 left-1/4 w-32 h-32 lg:w-64 lg:h-64 rounded-full opacity-10 blur-3xl ${isDark ? 'bg-yellow-500' : 'bg-blue-500'
                                }`}></div>
                            <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 lg:w-96 lg:h-96 rounded-full opacity-5 blur-3xl ${isDark ? 'bg-amber-500' : 'bg-indigo-500'
                                }`}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`border-t ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-lg ${isDark
                                        ? 'bg-gradient-to-br from-yellow-500 via-yellow-500 to-amber-500'
                                        : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700'
                                    }`}>
                                    <Wallet className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold bg-clip-text text-transparent ${isDark
                                            ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200'
                                            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
                                        }`}>
                                        WalletWise
                                    </h3>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                                Empowering individuals to take control of their financial future with smart insights, beautiful analytics, and AI-powered recommendations.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'
                                    }`}>
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Bank-Grade Security</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Features</a></li>
                                {/* <li><a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Pricing</a></li> */}
                                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Security</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Reviews</a></li>
                                {/* <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">API</a></li> */}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={`border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center ${isDark ? 'border-slate-700' : 'border-gray-200'
                        }`}>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            © 2025 WalletWise. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Made with ❤️ in India</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;