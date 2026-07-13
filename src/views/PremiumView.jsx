import React from 'react';
import { Sparkles, Brain, BarChart3, Database, Check, X, ArrowRight, Play } from 'lucide-react';
import '../components/PremiumView.css';

export default function PremiumView({
  selectedPlan,
  setSelectedPlan,
  progressVal,
  showSuccessModal,
  setShowSuccessModal,
  upgradedPlanName,
  handleUpgradeAction
}) {
  return (
    <div className="view-animate">
      {/* Header bar */}
      <div className="header-wrapper">
        <div className="header-left">
          <span className="premium-logo-badge">EDUFLOW PRO</span>
          <h1>Elevate Your Academic Intelligence.</h1>
          <p className="premium-subtitle-desc">
            Unlock advanced neural research tools, unlimited AI paper synthesis, and real-time collaboration with world-class peers.
          </p>
        </div>
        <div className="header-right">
          <button className="btn btn-secondary">Invite via ID</button>
          <button className="btn btn-primary">Copy Link</button>
          <div className="user-profile-btn">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="profile" />
          </div>
        </div>
      </div>

      <div className="content-body">
        {/* Banner with card side-by-side */}
        <div className="premium-banner-layout">
          <div className="premium-hero-text">
            <h2>Experience next-level neural analysis.</h2>
            <p>Our proprietary AI-driven academic workflow saves researchers over 15 hours a week in discovery, summarizing, and outline generation.</p>
            <div className="premium-hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => handleUpgradeAction(selectedPlan)}>
                <span>Upgrade to Pro</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => alert('Watch Demo coming soon!')}>
                <Play size={16} fill="currentColor" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* AI active widget card */}
          <div className="ai-active-card-premium">
            <div className="ai-active-header">
              <div className="ai-spark-circle">
                <Sparkles size={18} />
              </div>
              <div className="ai-active-meta">
                <h4>AI Synthesis Active</h4>
                <p>Processing 42 research nodes...</p>
              </div>
            </div>
            
            <div className="ai-active-progress-row">
              <span>Advanced Analytics</span>
              <div className="ai-progress-outer">
                <div className="ai-progress-inner" style={{ width: `${progressVal}%` }}></div>
              </div>
              <span className="ai-progress-percentage">{progressVal}% Complete</span>
            </div>
          </div>
        </div>

        {/* Why Upgrade Grid */}
        <div className="why-upgrade-section">
          <h3>Why upgrade to Premium?</h3>
          <div className="why-upgrade-grid">
            <div className="why-card">
              <div className="why-icon-box bg-purple">
                <Brain size={20} />
              </div>
              <h4>Unlimited AI Synthesis</h4>
              <p>Generate comprehensive literature reviews and research summaries without any daily limits.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box bg-green">
                <BarChart3 size={20} />
              </div>
              <h4>Deep Scholarly Analytics</h4>
              <p>Track citations, check impact indexes, and cross-reference multiple paper timelines.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box bg-teal">
                <Database size={20} />
              </div>
              <h4>Unlimited File Vault</h4>
              <p>Upload PDFs, CSVs, images, and docx up to 10GB storage limit. Clean metadata auto-parsed.</p>
            </div>
          </div>
        </div>

        {/* Pricing Layout */}
        <div className="premium-pricing-section">
          <h3>Find the plan that fits you</h3>
          <div className="pricing-tabs-selector">
            <button
              onClick={() => setSelectedPlan('weekly')}
              className={`plan-tab-item ${selectedPlan === 'weekly' ? 'active' : ''}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`plan-tab-item ${selectedPlan === 'monthly' ? 'active' : ''}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`plan-tab-item ${selectedPlan === 'annual' ? 'active' : ''}`}
            >
              Annual
            </button>
          </div>

          <div className="pricing-cards-container">
            {/* Free tier */}
            <div className="pricing-card free-tier">
              <div className="price-header">
                <h4>Free Plan</h4>
                <p>For individuals starting out</p>
                <div className="price-tag-value">
                  <span className="currency">$</span>
                  <span className="val">0</span>
                  <span className="period">/forever</span>
                </div>
              </div>
              <ul className="price-features-list">
                <li><Check size={16} /> <span>1 Active Workspace</span></li>
                <li><Check size={16} /> <span>5 AI Queries/day</span></li>
                <li><Check size={16} /> <span>100MB File storage limit</span></li>
                <li className="disabled"><X size={16} /> <span>Custom roadmap models</span></li>
                <li className="disabled"><X size={16} /> <span>Real-time collaboration feed</span></li>
              </ul>
              <button className="btn btn-secondary btn-block" onClick={() => alert('Sudah aktif di Plan Free!')}>
                Current Plan
              </button>
            </div>

            {/* Premium Pro tier */}
            <div className="pricing-card pro-tier popular">
              <div className="popular-badge">MOST POPULAR</div>
              <div className="price-header">
                <h4>Premium Pro</h4>
                <p>For professional researchers</p>
                <div className="price-tag-value">
                  <span className="currency">$</span>
                  {selectedPlan === 'weekly' && <span className="val">2.99</span>}
                  {selectedPlan === 'monthly' && <span className="val">9.99</span>}
                  {selectedPlan === 'annual' && <span className="val">79.99</span>}
                  <span className="period">/{selectedPlan}</span>
                </div>
              </div>
              <ul className="price-features-list">
                <li><Check size={16} /> <span>Unlimited Workspaces</span></li>
                <li><Check size={16} /> <span>Unlimited AI Queries</span></li>
                <li><Check size={16} /> <span>10GB Secure File Storage</span></li>
                <li><Check size={16} /> <span>Custom AI Roadmap generator</span></li>
                <li><Check size={16} /> <span>Real-time collaboration + comment threads</span></li>
              </ul>
              <button className="btn btn-primary btn-block" onClick={() => handleUpgradeAction(selectedPlan)}>
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="comparison-table-wrapper">
          <h3>Compare details side-by-side</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free Plan</th>
                <th>Premium Pro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI Roadmap Timeline</td>
                <td>Static only</td>
                <td>Dynamic Generation</td>
              </tr>
              <tr>
                <td>Max File Upload Size</td>
                <td>10 MB</td>
                <td>500 MB</td>
              </tr>
              <tr>
                <td>Workspace Members</td>
                <td>Up to 3 members</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Priority Server API Speed</td>
                <td>Standard</td>
                <td>3x Faster Processing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Modal Alert */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="success-confetti-strip" />
            
            <div className="success-modal-body">
              <div className="success-sparkles-icon">
                <Sparkles size={28} />
              </div>
              
              <h2>Terimakasih Telah Upgrade!</h2>
              <p>Akun Anda telah ditingkatkan menjadi premium dengan paket:</p>
              
              <div className="success-plan-badge">
                {upgradedPlanName.toUpperCase()} PLAN
              </div>
              
              <p className="success-welcome-text">
                Sekarang Anda memiliki akses penuh tanpa batas ke semua fitur AI Academic Roadmap, visual chart, dan kolaborasi real-time. Selamat meneliti!
              </p>

              <button className="btn btn-primary btn-block" onClick={() => setShowSuccessModal(false)}>
                Mulai Meneliti Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
