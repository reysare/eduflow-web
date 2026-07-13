import React from 'react';
import { Search, Calendar, FileText, CheckCircle2, ChevronRight, MessageSquare, Plus, File, RefreshCw } from 'lucide-react';
import '../components/RoadmapView.css';

export default function RoadmapView({
  activeSubTab,
  setActiveSubTab,
  searchWorkspace,
  setSearchWorkspace,
  phases,
  logs,
  showToast,
  toastMessage,
  filteredLogs,
  handleSelectPhase,
  handleAddComment
}) {
  return (
    <div className="view-animate">
      {/* Toast Notification */}
      {showToast && <div className="toast-notification">{toastMessage}</div>}

      {/* Header bar */}
      <div className="header-wrapper">
        <div className="search-wrapper-header">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Workspace..."
            value={searchWorkspace}
            onChange={(e) => setSearchWorkspace(e.target.value)}
          />
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
        {/* Phase selector top bar */}
        <div className="phase-bar-wrapper">
          <div className="phase-tabs-container">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => handleSelectPhase(phase.id)}
                className={`phase-tab-btn ${phase.active ? 'active' : ''}`}
              >
                <div className="phase-badge-row">
                  <span className="phase-tab-tag">{phase.label}</span>
                  {phase.completed && <CheckCircle2 size={14} className="phase-check text-completed" />}
                </div>
                <h4 className="phase-tab-title">{phase.title}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* Phase Info & Progress bar row */}
        <div className="roadmap-main-grid">
          <div className="roadmap-info-panel">
            <div className="roadmap-panel-card">
              <div className="roadmap-card-header-row">
                <span className="task-indicator">ACTIVE MODULE</span>
                <span className="date-indicator">DUE OCT 28</span>
              </div>
              
              <h2>Literature Review & Synthesis</h2>
              <p className="roadmap-panel-card-desc">
                Evaluate recent NLP literature on Transformer architectures, compiling summaries for medical image recognition applications and documenting architectural variances.
              </p>

              <div className="progress-section-block">
                <div className="progress-labels">
                  <span>Task Path Completion</span>
                  <span>65% Done</span>
                </div>
                <div className="progress-outer-bar">
                  <div className="progress-inner-bar" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="roadmap-steps-list">
                <div className="step-item checked">
                  <div className="step-check-circle"><CheckCircle2 size={16} /></div>
                  <div className="step-info">
                    <h5>Search & Filter Academic Papers</h5>
                    <p>Scrape journals on IEEE, PubMed, and ArXiv databases.</p>
                  </div>
                </div>
                <div className="step-item checked">
                  <div className="step-check-circle"><CheckCircle2 size={16} /></div>
                  <div className="step-info">
                    <h5>Extract Model Configurations</h5>
                    <p>Document hyperparameter setups and pretraining weights.</p>
                  </div>
                </div>
                <div className="step-item active">
                  <div className="step-check-circle"><Plus size={16} /></div>
                  <div className="step-info">
                    <h5>Synthesize Core Findings</h5>
                    <p>Analyze performance metrics differences across standard datasets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Tracker */}
          <div className="contribution-log-panel">
            <div className="contribution-header-row">
              <div className="contribution-title-area">
                <h3>Contribution Tracker</h3>
                <p>Team updates log for this task</p>
              </div>
              <button onClick={handleAddComment} className="btn btn-primary btn-sm">
                <Plus size={14} />
                <span>Add Comment</span>
              </button>
            </div>

            {/* Sub Tabs */}
            <div className="contribution-sub-tabs">
              {['all', 'uploads', 'updates', 'comments', 'revisions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`sub-tab-btn ${activeSubTab === tab ? 'active' : ''}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Logs List Container */}
            <div className="logs-scroller-container">
              {filteredLogs.map((log) => (
                <div key={log.id} className="log-row-item">
                  <img src={log.avatar} alt="avatar" className="log-user-avatar" />
                  <div className="log-item-body">
                    <div className="log-meta-top">
                      <span className="log-username">{log.user}</span>
                      <span className="log-timestamp">{log.time}</span>
                    </div>
                    <p className="log-action-text">{log.action}</p>

                    {/* Specific details rendering */}
                    {log.type === 'upload' && (
                      <div className="file-attachment-card">
                        <File size={16} className="text-primary" />
                        <div className="file-attach-details">
                          <span className="file-attach-name">{log.fileName}</span>
                          <span className="file-attach-size">{log.fileSize}</span>
                        </div>
                        <ChevronRight size={16} className="file-arrow-right" />
                      </div>
                    )}

                    {log.type === 'comment' && (
                      <div className="comment-quote-box">
                        <MessageSquare size={14} className="quote-icon" />
                        <p className="comment-quote-text">{log.comment}</p>
                      </div>
                    )}

                    {log.type === 'revision' && (
                      <div className="revision-badge-info">
                        <RefreshCw size={12} />
                        <span>Revision Notes: {log.revisionNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredLogs.length === 0 && (
                <div className="empty-logs-placeholder">
                  No log updates matching this filter
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
