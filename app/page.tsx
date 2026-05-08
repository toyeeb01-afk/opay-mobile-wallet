'use client';

import { useState } from 'react';
import {
  Home,
  Gift,
  Wallet,
  CreditCard,
  User,
  Eye,
  EyeOff,
  ChevronRight,
  Plus,
  Download,
  Upload,
  TrendingUp,
  Phone,
  Zap,
  Smartphone,
  Heart,
  Shield,
  Gift as GiftIcon,
  MoreHorizontal,
  MessageCircle,
  Building2,
  Bell,
  HelpCircle,
  LogOut,
  CheckCircle,
} from 'lucide-react';

const WalletApp = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Status Bar */}
      <div className="bg-background border-b border-border px-4 py-2 flex justify-between items-center text-xs text-foreground">
        <span className="font-semibold">21:36</span>
        <div className="flex gap-1 items-center">
          <span>23.56</span>
          <span>kBits</span>
          <div className="w-4 h-3 border border-foreground rounded-sm flex items-center justify-center text-[8px]">🔒</div>
          <div className="w-4 h-3 border border-foreground rounded-sm flex items-center justify-center text-[8px]">📡</div>
          <div className="w-4 h-3 border border-foreground rounded-sm flex items-center justify-center text-[8px]">📶</div>
          <div className="w-4 h-3 border border-foreground rounded-sm flex items-center justify-center text-[8px]">⭕</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header with User */}
        <div className="bg-background px-4 py-4 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="font-bold text-foreground">Hi, MISHAEL</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="relative flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary hover:bg-muted transition">
              <HelpCircle className="w-5 h-5 text-foreground" />
              <span className="text-[10px] text-accent font-bold">HELP</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary hover:bg-muted transition">
              <MessageCircle className="w-5 h-5 text-foreground" />
            </button>
            <button className="relative flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary hover:bg-muted transition">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-1.5 rounded-full">
                99+
              </span>
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mx-4 mt-4 bg-primary text-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Available Balance</span>
              <button onClick={() => setShowBalance(!showBalance)} className="hover:opacity-70">
                {showBalance ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          <h2 className="text-3xl font-bold mb-6">
            {showBalance ? '₦0.00' : '••••••'}
          </h2>

          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="text-white text-sm font-semibold flex items-center gap-1 hover:underline">
                Transaction History <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <button className="bg-white text-primary px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
              + Add Money
            </button>
          </div>
        </div>

        {/* Business Service */}
        <div className="mx-4 mt-4 bg-secondary rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground text-sm">Business Service - Today&apos;s Sales: <span className="text-primary">₦0.00</span></p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-foreground" />
        </div>

        {/* Transactions */}
        <div className="mx-4 mt-4 space-y-3">
          {/* Transaction Item 1 */}
          <div className="bg-card rounded-xl p-4 flex justify-between items-center border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">WhatsApp Alert Charges</p>
                <p className="text-xs text-muted-foreground">May 7th, 07:32:05</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-accent">-₦100.00</p>
              <p className="text-xs text-primary">Successful</p>
            </div>
          </div>

          {/* Transaction Item 2 */}
          <div className="bg-card rounded-xl p-4 flex justify-between items-center border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Transfer to ELOHO BLESSING OBANOV...</p>
                <p className="text-xs text-muted-foreground">May 6th, 18:41:50</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-accent">-₦1,300.00</p>
              <p className="text-xs text-primary">Successful</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mx-4 mt-6 grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-border hover:bg-secondary transition">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <Download className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-foreground text-center">To OPay</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-border hover:bg-secondary transition">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-foreground text-center">To Bank</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-border hover:bg-secondary transition">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-foreground text-center">Withdraw</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="mx-4 mt-6 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">Airtime</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <div className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Up to 6%
                </div>
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">Data</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">Betting</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">TV</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">SafeBox</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">Loan</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">Play4aChild</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white hover:bg-opacity-90 transition cursor-pointer">
                <MoreHorizontal className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center">More</span>
            </div>
          </div>
        </div>

        {/* Saving Challenge */}
        <div className="mx-4 mt-6 bg-secondary rounded-2xl p-6 border-2 border-dashed border-muted">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-foreground">Saving Challenge 2026</h3>
            <div className="text-3xl">🎁</div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-3xl">🎯</div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">Special Target</h4>
              <p className="text-sm text-muted-foreground mb-3">Start small daily, finish big in 2026</p>
              <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-opacity-90 transition">
                Go
              </button>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-0 py-2">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setActiveNav('home')}
            className={`flex flex-col items-center gap-1 py-3 px-4 rounded-lg transition ${
              activeNav === 'home'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button
            onClick={() => setActiveNav('rewards')}
            className={`flex flex-col items-center gap-1 py-3 px-4 rounded-lg transition ${
              activeNav === 'rewards'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Gift className="w-6 h-6" />
            <span className="text-xs font-semibold">Rewards</span>
          </button>
          <button
            onClick={() => setActiveNav('finance')}
            className={`flex flex-col items-center gap-1 py-3 px-4 rounded-lg transition ${
              activeNav === 'finance'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Wallet className="w-6 h-6" />
            <span className="text-xs font-semibold">Finance</span>
          </button>
          <button
            onClick={() => setActiveNav('cards')}
            className={`flex flex-col items-center gap-1 py-3 px-4 rounded-lg transition ${
              activeNav === 'cards'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs font-semibold">Cards</span>
          </button>
          <button
            onClick={() => setActiveNav('me')}
            className={`flex flex-col items-center gap-1 py-3 px-4 rounded-lg transition ${
              activeNav === 'me'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-semibold">Me</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletApp;
