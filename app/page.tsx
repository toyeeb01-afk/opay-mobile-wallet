'use client';

import { useState, useEffect } from 'react';
import {
  Home,
  Gift,
  Wallet,
  CreditCard,
  User,
  Eye,
  EyeOff,
  Plus,
  ArrowDown,
  ArrowUp,
  Send,
  DollarSign,
  Bank,
  Phone,
  Zap,
  TV,
  ShoppingBag,
  Lock,
  Heart,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  ChevronRight,
  Download,
  TrendingUp,
  Calendar,
  X,
  Check,
  Smartphone,
  Shield,
  MoreHorizontal,
  MessageCircle,
  Building2,
  CheckCircle,
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
  status: 'successful' | 'pending' | 'failed';
  icon: string;
}

interface Card {
  id: string;
  type: 'virtual' | 'physical';
  number: string;
  name: string;
  expiry: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface Voucher {
  id: string;
  title: string;
  description: string;
  discount: string;
  expiryDate: string;
  claimed: boolean;
  category: string;
}

interface FinanceProduct {
  id: string;
  name: string;
  type: 'savings' | 'loan';
  amount: number;
  rate: number;
  term: string;
  status: 'active' | 'available';
}

interface AppState {
  balance: number;
  transactions: Transaction[];
  cards: Card[];
  vouchers: Voucher[];
  financeProducts: FinanceProduct[];
  userProfile: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
}

const defaultState: AppState = {
  balance: 5000,
  transactions: [
    {
      id: '1',
      type: 'debit',
      description: 'WhatsApp Alert Charges',
      amount: 100,
      date: 'May 7th, 07:32:05',
      status: 'successful',
      icon: '💬',
    },
    {
      id: '2',
      type: 'debit',
      description: 'Transfer to ELOHO BLESSING OBANOV',
      amount: 1300,
      date: 'May 6th, 18:41:50',
      status: 'successful',
      icon: '🏦',
    },
    {
      id: '3',
      type: 'credit',
      description: 'Airtime Refund',
      amount: 500,
      date: 'May 5th, 10:15:30',
      status: 'successful',
      icon: '📱',
    },
  ],
  cards: [
    {
      id: '1',
      type: 'virtual',
      number: '5399 8765 4321 9012',
      name: 'Debit Card',
      expiry: '12/26',
      balance: 5000,
      status: 'active',
    },
    {
      id: '2',
      type: 'physical',
      number: '5399 87** **** 9012',
      name: 'Physical Card',
      expiry: '12/26',
      balance: 5000,
      status: 'active',
    },
  ],
  vouchers: [
    {
      id: '1',
      title: '20% Off Airtime',
      description: 'Get 20% discount on your next airtime purchase',
      discount: '20%',
      expiryDate: 'May 31, 2026',
      claimed: false,
      category: 'airtime',
    },
    {
      id: '2',
      title: '₦500 Cashback',
      description: 'Spend ₦2000 and get ₦500 back',
      discount: '₦500',
      expiryDate: 'June 15, 2026',
      claimed: false,
      category: 'cashback',
    },
    {
      id: '3',
      title: '15% Off Data',
      description: 'Get 15% discount on data bundles',
      discount: '15%',
      expiryDate: 'June 10, 2026',
      claimed: false,
      category: 'data',
    },
  ],
  financeProducts: [
    {
      id: '1',
      name: 'Savings Plus',
      type: 'savings',
      amount: 0,
      rate: 15,
      term: 'Flexible',
      status: 'available',
    },
    {
      id: '2',
      name: 'Quick Loan',
      type: 'loan',
      amount: 0,
      rate: 5,
      term: '3-12 months',
      status: 'available',
    },
  ],
  userProfile: {
    name: 'MISHAEL OKAFOR',
    email: 'mishael.okafor@email.com',
    phone: '+234 901 234 5678',
    avatar: '👤',
  },
};

export default function WalletApp() {
  const [currentTab, setCurrentTab] = useState<'home' | 'rewards' | 'finance' | 'cards' | 'me'>('home');
  const [state, setState] = useState<AppState>(defaultState);
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [formData, setFormData] = useState({ amount: '', recipient: '', description: '' });

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('walletState');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load wallet state');
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('walletState', JSON.stringify(state));
  }, [state]);

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
    setFormData({ amount: '', recipient: '', description: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (amount > 0) {
      setState((prev) => ({
        ...prev,
        balance: prev.balance + amount,
        transactions: [
          {
            id: Date.now().toString(),
            type: 'credit',
            description: 'Add Money',
            amount,
            date: new Date().toLocaleString(),
            status: 'successful',
            icon: '💳',
          },
          ...prev.transactions,
        ],
      }));
      closeModal();
    }
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (amount > 0 && amount <= state.balance && formData.recipient) {
      setState((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [
          {
            id: Date.now().toString(),
            type: 'debit',
            description: `Transfer to ${formData.recipient}`,
            amount,
            date: new Date().toLocaleString(),
            status: 'successful',
            icon: '🏦',
          },
          ...prev.transactions,
        ],
      }));
      closeModal();
    }
  };

  const handleClaimVoucher = (voucherId: string) => {
    setState((prev) => ({
      ...prev,
      vouchers: prev.vouchers.map((v) =>
        v.id === voucherId ? { ...v, claimed: true } : v
      ),
    }));
  };

  // HOME TAB
  const renderHome = () => (
    <div className="pb-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-600 bg-white">
        <span>21:36</span>
        <div className="flex gap-1">
          <span>📡</span>
          <span>4G+</span>
          <span>📶</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xl">
            👤
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Hi, {state.userProfile.name}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => openModal('help')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Help"
          >
            <HelpCircle size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => openModal('support')}
            className="p-2 hover:bg-gray-100 rounded-lg transition relative"
            title="Support"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm opacity-90 mb-1">Available Balance</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">
                  {showBalance ? `₦${state.balance.toLocaleString()}` : '****'}
                </p>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:bg-white/20 rounded transition"
                >
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-75">Transaction History</p>
              <button className="text-sm font-semibold hover:underline flex items-center gap-1">
                View <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <button
            onClick={() => openModal('add-money')}
            className="bg-white text-teal-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition flex items-center gap-2 ml-auto"
          >
            <Plus size={18} /> Add Money
          </button>
        </div>
      </div>

      {/* Business Service */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer border-l-4 border-teal-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <ShoppingBag size={20} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Business Service - Today&apos;s Sales</p>
              <p className="text-xs text-teal-600 font-semibold">₦0.00</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Recent Transactions</p>
        <div className="space-y-2">
          {state.transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between bg-white p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  {tx.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${tx.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                  {tx.type === 'debit' ? '-' : '+'}₦{tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 font-medium">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => openModal('send-money')}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white hover:bg-gray-50 transition"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Send size={20} className="text-teal-600" />
            </div>
            <span className="text-xs text-gray-900 font-medium text-center">Send Money</span>
          </button>
          <button
            onClick={() => openModal('request-money')}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white hover:bg-gray-50 transition"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <ArrowDown size={20} className="text-teal-600" />
            </div>
            <span className="text-xs text-gray-900 font-medium text-center">Request Money</span>
          </button>
          <button
            onClick={() => setCurrentTab('cards')}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white hover:bg-gray-50 transition"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <CreditCard size={20} className="text-teal-600" />
            </div>
            <span className="text-xs text-gray-900 font-medium text-center">Cards</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Services</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Airtime', icon: '📱', badge: 'new' },
            { name: 'Data', icon: '📡', badge: 'hot' },
            { name: 'Cable', icon: '📺', badge: null },
            { name: 'Power', icon: '💡', badge: null },
            { name: 'Betting', icon: '🎲', badge: null },
            { name: 'Insurance', icon: '🛡️', badge: null },
            { name: 'Loans', icon: '💰', badge: null },
            { name: 'More', icon: '➕', badge: null },
          ].map((service) => (
            <button
              key={service.name}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white hover:bg-gray-50 transition relative"
            >
              {service.badge && (
                <span className="absolute top-1 right-1 text-xs font-bold px-1.5 py-0.5 rounded bg-pink-500 text-white">
                  {service.badge}
                </span>
              )}
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-xl">
                {service.icon}
              </div>
              <span className="text-xs text-gray-900 font-medium text-center">{service.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-semibold mb-1">Saving Challenge 2026</p>
            <p className="text-xs opacity-90">Start saving small, finish big in 2026</p>
          </div>
          <div className="absolute right-0 top-0 text-4xl opacity-20">🎁</div>
        </div>
      </div>
    </div>
  );

  // REWARDS TAB
  const renderRewards = () => (
    <div className="pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b sticky top-0">
        <h1 className="text-xl font-bold text-gray-900">Rewards & Benefits</h1>
        <p className="text-xs text-gray-500">Earn and claim amazing rewards</p>
      </div>

      {/* Rewards Summary */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90 mb-1">Available Points</p>
          <p className="text-2xl font-bold">2,450 pts</p>
          <p className="text-xs opacity-75 mt-2">₦245 equivalent</p>
        </div>
      </div>

      {/* Vouchers Section */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Available Vouchers</p>
        <div className="space-y-3">
          {state.vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="bg-white rounded-lg p-4 border-l-4 border-teal-500 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{voucher.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{voucher.description}</p>
                </div>
                <span className="text-lg font-bold text-teal-600">{voucher.discount}</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-500">Expires: {voucher.expiryDate}</p>
                <button
                  onClick={() => handleClaimVoucher(voucher.id)}
                  disabled={voucher.claimed}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                    voucher.claimed
                      ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {voucher.claimed ? 'Claimed' : 'Claim'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cashback Offers */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Cashback Offers</p>
        <div className="space-y-3">
          {[
            { merchant: 'Airtime Purchase', cashback: '5%', min: '₦100+' },
            { merchant: 'Data Bundles', cashback: '3%', min: '₦50+' },
            { merchant: 'Bill Payments', cashback: '2%', min: '₦500+' },
          ].map((offer, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition">
              <div>
                <p className="text-sm font-medium text-gray-900">{offer.merchant}</p>
                <p className="text-xs text-gray-500">Min: {offer.min}</p>
              </div>
              <p className="text-lg font-bold text-green-600">{offer.cashback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Bonus */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold mb-1">Referral Bonus</p>
              <p className="text-xs opacity-90 mb-3">Invite friends and earn ₦500 per referral</p>
              <button className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition">
                Refer Now
              </button>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
      </div>
    </div>
  );

  // FINANCE TAB
  const renderFinance = () => (
    <div className="pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b sticky top-0">
        <h1 className="text-xl font-bold text-gray-900">Finance</h1>
        <p className="text-xs text-gray-500">Savings & Loans</p>
      </div>

      {/* Savings Section */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Savings Products</p>
        <div className="space-y-3">
          {state.financeProducts
            .filter((p) => p.type === 'savings')
            .map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-600 mt-1">Interest Rate: {product.rate}% per annum</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{product.rate}%</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal('start-savings')}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                  >
                    Start Saving
                  </button>
                  <button className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg text-xs font-semibold hover:bg-green-50 transition">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Loans Section */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Loan Products</p>
        <div className="space-y-3">
          {state.financeProducts
            .filter((p) => p.type === 'loan')
            .map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Tenure: {product.term} | Interest: {product.rate}%
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal('apply-loan')}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                  >
                    Apply Now
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg text-xs font-semibold hover:bg-blue-50 transition">
                    Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Interest Rate Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-4 text-white">
          <p className="text-sm font-semibold mb-1">Special Interest Rates</p>
          <p className="text-xs opacity-90 mb-3">Earn up to 18% on your savings this month</p>
          <button className="bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition">
            View Terms
          </button>
        </div>
      </div>
    </div>
  );

  // CARDS TAB
  const renderCards = () => (
    <div className="pb-24 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b sticky top-0">
        <h1 className="text-xl font-bold text-gray-900">My Cards</h1>
        <p className="text-xs text-gray-500">Manage your payment methods</p>
      </div>

      {/* Cards Display */}
      <div className="px-4 py-4 space-y-4">
        {state.cards.map((card) => (
          <div
            key={card.id}
            className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-xs opacity-75 mb-1">Card Type</p>
                <p className="text-sm font-semibold capitalize">{card.type}</p>
              </div>
              <div className="text-2xl font-bold">•••• {card.number.slice(-4)}</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-75 mb-1">Card Holder</p>
                <p className="text-sm font-semibold">{card.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75 mb-1">Expires</p>
                <p className="text-sm font-semibold">{card.expiry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Actions */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Card Actions</p>
        <div className="space-y-2">
          {[
            { label: 'Order Physical Card', icon: '📮' },
            { label: 'Block Card', icon: '🚫' },
            { label: 'Change PIN', icon: '🔑' },
            { label: 'Card Settings', icon: '⚙️' },
          ].map((action, idx) => (
            <button
              key={idx}
              className="w-full bg-white p-3 rounded-lg flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{action.icon}</span>
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Card Details Section */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Card Details</p>
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className="text-sm font-semibold text-green-600">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Daily Limit</span>
            <span className="text-sm font-semibold text-gray-900">₦500,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Monthly Limit</span>
            <span className="text-sm font-semibold text-gray-900">₦5,000,000</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ME TAB (Profile)
  const renderMe = () => (
    <div className="pb-24 bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <p className="text-lg font-bold">{state.userProfile.name}</p>
            <p className="text-sm opacity-90">{state.userProfile.email}</p>
          </div>
        </div>
        <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm font-semibold transition">
          Edit Profile
        </button>
      </div>

      {/* Account Info */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Account Information</p>
        <div className="bg-white rounded-lg divide-y">
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Phone Number</span>
            <span className="text-sm font-semibold text-gray-900">{state.userProfile.phone}</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Account Status</span>
            <span className="text-sm font-semibold text-green-600">Verified</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">Account Type</span>
            <span className="text-sm font-semibold text-gray-900">Premium</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 py-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Settings</p>
        <div className="space-y-2">
          {[
            { label: 'Security Settings', icon: '🔒' },
            { label: 'Notification Preferences', icon: '🔔' },
            { label: 'Privacy Policy', icon: '📋' },
            { label: 'Help & Support', icon: '❓' },
            { label: 'About OPay', icon: 'ℹ️' },
          ].map((setting, idx) => (
            <button
              key={idx}
              className="w-full bg-white p-3 rounded-lg flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{setting.icon}</span>
                <span className="text-sm font-medium text-gray-900">{setting.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="px-4 py-4">
        <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 p-3 rounded-lg flex items-center justify-between transition">
          <div className="flex items-center gap-3">
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </div>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  // Modal Component
  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in">
        <div className="bg-white w-full rounded-t-3xl p-4 animate-in slide-in-from-bottom-5 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {modalType === 'add-money' && 'Add Money'}
              {modalType === 'send-money' && 'Send Money'}
              {modalType === 'request-money' && 'Request Money'}
              {modalType === 'help' && 'Help & Support'}
              {modalType === 'support' && 'Support'}
              {modalType === 'start-savings' && 'Start Saving'}
              {modalType === 'apply-loan' && 'Apply for Loan'}
            </h2>
            <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition">
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Add Money Form */}
          {modalType === 'add-money' && (
            <form onSubmit={handleAddMoney} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Payment Method</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Debit Card</option>
                  <option>Bank Transfer</option>
                  <option>USSD</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Add Money
              </button>
            </form>
          )}

          {/* Send Money Form */}
          {modalType === 'send-money' && (
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Recipient</label>
                <input
                  type="text"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  placeholder="Enter phone number or email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What is this for?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:bg-gray-400"
                disabled={parseFloat(formData.amount) > state.balance}
              >
                Send Money
              </button>
              {parseFloat(formData.amount) > state.balance && (
                <p className="text-sm text-red-600 text-center">Insufficient balance</p>
              )}
            </form>
          )}

          {/* Request Money Form */}
          {modalType === 'request-money' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Request From</label>
                <input
                  type="text"
                  placeholder="Enter phone number or email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Send Request
              </button>
            </form>
          )}

          {/* Start Savings Form */}
          {modalType === 'start-savings' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Enter amount to save"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Duration</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>24 Months</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Start Saving
              </button>
            </form>
          )}

          {/* Apply Loan Form */}
          {modalType === 'apply-loan' && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Loan Amount (₦)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="Enter loan amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tenure</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Apply for Loan
              </button>
            </form>
          )}

          {/* Help Modal */}
          {modalType === 'help' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">How can we help you?</p>
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm text-gray-900">
                  How to add money to my wallet?
                </button>
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm text-gray-900">
                  How to send money?
                </button>
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm text-gray-900">
                  Transaction fees
                </button>
              </div>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition">
                Contact Support
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground">
      {/* Render current tab */}
      {currentTab === 'home' && renderHome()}
      {currentTab === 'rewards' && renderRewards()}
      {currentTab === 'finance' && renderFinance()}
      {currentTab === 'cards' && renderCards()}
      {currentTab === 'me' && renderMe()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-20 z-40">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center justify-center py-3 w-1/5 transition ${
            currentTab === 'home'
              ? 'text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-semibold mt-1">Home</span>
        </button>
        <button
          onClick={() => setCurrentTab('rewards')}
          className={`flex flex-col items-center justify-center py-3 w-1/5 transition ${
            currentTab === 'rewards'
              ? 'text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Gift size={24} />
          <span className="text-xs font-semibold mt-1">Rewards</span>
        </button>
        <button
          onClick={() => setCurrentTab('finance')}
          className={`flex flex-col items-center justify-center py-3 w-1/5 transition ${
            currentTab === 'finance'
              ? 'text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Wallet size={24} />
          <span className="text-xs font-semibold mt-1">Finance</span>
        </button>
        <button
          onClick={() => setCurrentTab('cards')}
          className={`flex flex-col items-center justify-center py-3 w-1/5 transition ${
            currentTab === 'cards'
              ? 'text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CreditCard size={24} />
          <span className="text-xs font-semibold mt-1">Cards</span>
        </button>
        <button
          onClick={() => setCurrentTab('me')}
          className={`flex flex-col items-center justify-center py-3 w-1/5 transition ${
            currentTab === 'me'
              ? 'text-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User size={24} />
          <span className="text-xs font-semibold mt-1">Me</span>
        </button>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}
