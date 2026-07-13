import React from 'react';
import { Sparkles, CheckCircle2, Lock, MoreHorizontal, MessageSquare, Calendar, Share2, UserPlus, FileText, ArrowRight, Check, X } from 'lucide-react';
import '../components/DashboardView.css';

export default function DashboardView({
  roadmapInput,
  setRoadmapInput,
  isGenerating,
  weeks,
  tasks,
  activities,
  activeTaskIdMenu,
  setActiveTaskIdMenu,
  showShareModal,
  setShowShareModal,
  shareTask,
  shareLink,
  shareAccess,
  setShareAccess,
  isCopied,
  showInviteModal,
  setShowInviteModal,
  inviteEmail,
  setInviteEmail,
  inviteLinkValue,
  isInviteCopied,
  showMembersModal,
  setShowMembersModal,
  showActivityModal,
  setShowActivityModal,
  activeActivity,
  setActiveActivity,
  allMembers,
  allTasksDone,
  handleGenerateRoadmap,
  handleMoveTask,
  handleTogglePrivate,
  handleShareClick,
  handleCopyLink,
  handleSendInviteEmail,
  handleCopyInviteLink,
  getActivityDetailDesc
}) {
  const renderTaskCard = (task) => {
    return (
      <div key={task.id} className="task-card">
        <div className="task-card-header">
          <div className="task-card-tags">
            <span className={`badge badge-${task.tag.toLowerCase().replace(' ', '')}`}>{task.tag}</span>
            {task.tagExtra && <span className="badge badge-priority">{task.tagExtra}</span>}
          </div>
          
          <div className="task-menu-container">
            <button 
              className={`task-card-more ${activeTaskIdMenu === task.id ? 'active' : ''}`}
              onClick={() => setActiveTaskIdMenu(activeTaskIdMenu === task.id ? null : task.id)}
            >
              <MoreHorizontal size={16} />
            </button>
            {activeTaskIdMenu === task.id && (
              <div className="task-dropdown-menu">
                <button type="button" onClick={() => { handleMoveTask(task.id, 'todo'); setActiveTaskIdMenu(null); }}>
                  Pindah ke To-Do
                </button>
                <button type="button" onClick={() => { handleMoveTask(task.id, 'inprogress'); setActiveTaskIdMenu(null); }}>
                  Pindah ke In Progress
                </button>
                <button type="button" onClick={() => { handleMoveTask(task.id, 'done'); setActiveTaskIdMenu(null); }}>
                  Pindah ke Done
                </button>
                <button 
                  type="button" 
                  className="toggle-private-btn"
                  onClick={() => { handleTogglePrivate(task.id); setActiveTaskIdMenu(null); }}
                >
                  {task.isPrivate ? 'Jadikan Publik' : 'Jadikan Pribadi (Self)'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <h4 className="task-card-title">{task.title}</h4>
        <p className="task-card-desc">{task.desc}</p>
        
        {task.type === 'progress' && task.column !== 'done' && !allTasksDone && (
          <div className="task-card-progress-wrapper">
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${task.progress}%` }}></div>
            </div>
            <div className="progress-text">{task.progress}% Complete</div>
          </div>
        )}

        <div className="task-card-footer">
          <div className="task-card-left">
            <div className="avatar-group">
              {task.avatars.map((url, idx) => (
                <img key={idx} src={url} alt="member" className="avatar-img" />
              ))}
            </div>
            {task.comments > 0 && (
              <div className="task-meta-item">
                <MessageSquare size={14} />
                <span>{task.comments}</span>
              </div>
            )}
            {task.date && (
              <div className={`task-meta-item ${task.urgent ? 'urgent' : ''}`}>
                <Calendar size={14} />
                <span>{task.date}</span>
              </div>
            )}
          </div>
          
          <div className="task-card-actions">
            {(allTasksDone || task.column === 'done') ? (
              <CheckCircle2 size={16} className="task-action-icon text-completed" title="Tugas Selesai" />
            ) : task.isPrivate ? (
              <Lock size={16} className="task-action-icon text-locked" title="Khusus Diri Sendiri (Pribadi)" onClick={() => handleTogglePrivate(task.id)} />
            ) : (
              <Share2 size={16} className="task-action-icon text-link pointer-cursor" title="Bagikan Tugas" onClick={() => handleShareClick(task)} />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="view-animate">
      <div className="header-wrapper">
        <div className="header-left">
          <h1>AI Academic Roadmap</h1>
          <p>Generate academic study plans and manage research roadmap workflows.</p>
        </div>
        <div className="header-right">
          <button className="btn btn-secondary" onClick={() => setShowInviteModal(true)}>Invite via ID</button>
          <button className="btn btn-primary" onClick={() => setShowInviteModal(true)}>Copy Link</button>
          <div className="user-profile-btn">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="profile" />
          </div>
        </div>
      </div>

      <div className="content-body">
        {/* Topic Input Generator */}
        <div className="roadmap-generator-panel">
          <div className="generator-header">
            <div className="spark-circle-icon">
              <Sparkles size={20} />
            </div>
            <div className="generator-title-text">
              <h3>Create Custom AI Study Plan</h3>
              <p>Type in any course topic or research query to map out your timeline.</p>
            </div>
          </div>
          
          <form onSubmit={handleGenerateRoadmap} className="roadmap-input-row">
            <input
              type="text"
              placeholder="e.g. Machine Learning, Constitutional Law, Quantum Mechanics..."
              value={roadmapInput}
              onChange={(e) => setRoadmapInput(e.target.value)}
              disabled={isGenerating}
              className="roadmap-generator-input"
            />
            <button type="submit" disabled={isGenerating} className="btn btn-primary btn-generate">
              {isGenerating ? 'Generating Plan...' : 'Generate Roadmap'}
            </button>
          </form>
        </div>

        {/* Dynamic Horizontal Weeks Roadmap */}
        <div className="weeks-timeline-scroller">
          <div className="timeline-horizontal-row">
            {weeks.map((week) => (
              <div key={week.number} className={`timeline-week-card ${week.status}`}>
                <div className="week-card-top">
                  <span className="week-number-label">WEEK {week.number}</span>
                  {week.status === 'completed' && <CheckCircle2 size={16} className="week-icon-status text-completed" />}
                  {week.status === 'active' && <Sparkles size={16} className="week-icon-status text-active" />}
                  {week.status === 'locked' && <Lock size={16} className="week-icon-status text-locked" />}
                </div>
                <h4 className="week-card-title">{week.title}</h4>
                <p className="week-card-desc">{week.desc}</p>
                
                {week.status === 'active' && (
                  <div className="timeline-active-badge">Active Study Node</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Task Columns */}
        <div className="kanban-section">
          {/* Column 1: To-Do */}
          <div className="kanban-column">
            <div className="column-header">
              <div className="column-title">
                <h3>To-Do</h3>
                <span className="column-count">{tasks.filter(t => t.column === 'todo').length}</span>
              </div>
              <button className="column-more"><MoreHorizontal size={18} /></button>
            </div>
            <div className="column-cards-container">
              {tasks.filter(t => t.column === 'todo').map(renderTaskCard)}
              {tasks.filter(t => t.column === 'todo').length === 0 && (
                <div className="empty-column-placeholder">No tasks in To-Do</div>
              )}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="kanban-column">
            <div className="column-header">
              <div className="column-title">
                <h3>In Progress</h3>
                <span className="column-count">{tasks.filter(t => t.column === 'inprogress').length}</span>
              </div>
              <button className="column-more"><MoreHorizontal size={18} /></button>
            </div>
            <div className="column-cards-container">
              {tasks.filter(t => t.column === 'inprogress').map(renderTaskCard)}
              {tasks.filter(t => t.column === 'inprogress').length === 0 && (
                <div className="empty-column-placeholder">No tasks in In Progress</div>
              )}
            </div>
          </div>

          {/* Column 3: Done */}
          <div className="kanban-column">
            <div className="column-header">
              <div className="column-title">
                <h3>Done</h3>
                <span className="column-count">{tasks.filter(t => t.column === 'done').length}</span>
              </div>
              <button className="column-more"><MoreHorizontal size={18} /></button>
            </div>
            <div className="column-cards-container">
              {tasks.filter(t => t.column === 'done').map(renderTaskCard)}
              {tasks.filter(t => t.column === 'done').length === 0 && (
                <div className="empty-column-placeholder">No tasks completed</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom panels: Members and Activity */}
        <div className="dashboard-bottom-grid">
          {/* Team Members Card */}
          <div className="team-card-panel">
            <div className="team-panel-header">
              <h3>Your Team Member</h3>
              <button className="btn btn-outline-green btn-sm" onClick={() => setShowInviteModal(true)}>
                <UserPlus size={16} />
                <span>Invite Member</span>
              </button>
            </div>
            
            <div className="team-avatars-display">
              <div className="avatars-stacked-row">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Sarah" className="stacked-avatar" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="Michael" className="stacked-avatar" />
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" alt="Emily" className="stacked-avatar" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" alt="Aris" className="stacked-avatar" />
                <div className="stacked-avatar-plus">+12</div>
              </div>
            </div>
            
            <button className="team-view-all" onClick={() => setShowMembersModal(true)}>View All Members</button>
          </div>

          {/* Live Activity Card */}
          <div className="activity-card-panel">
            <div className="activity-panel-header">
              <h3>Live Activity</h3>
              <p>Real-time team updates</p>
            </div>

            <div className="activity-feed">
              {activities.map((act) => (
                <div key={act.id} className="activity-item">
                  <img src={act.avatar} alt={act.user} className="activity-avatar" />
                  <div className="activity-details-row">
                    <div className="activity-details">
                      <p>
                        <strong>{act.user}</strong>{' '}
                        {act.type === 'edit' && 'updated'}
                        {act.type === 'complete' && 'completed'}
                        {act.type === 'upload' && 'uploaded'}
                        {act.type === 'join' && 'joined'}
                        {' '}
                        <span className="activity-target">{act.target}</span>
                      </p>
                      <span className="activity-time">{act.time}</span>
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm btn-activity-view"
                      onClick={() => { setActiveActivity(act); setShowActivityModal(true); }}
                    >
                      Lihat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Task Modal (Google Drive Style) */}
      {showShareModal && shareTask && (
        <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Bagikan Tugas</h3>
              <button className="share-modal-close" onClick={() => setShowShareModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="share-modal-body">
              <h4 className="share-task-title">{shareTask.title}</h4>
              <p className="share-task-desc">{shareTask.desc}</p>
              
              <div className="share-access-section">
                <label>Akses Umum</label>
                <div className="access-dropdown-row">
                  <select 
                    value={shareAccess} 
                    onChange={(e) => setShareAccess(e.target.value)}
                    className="share-access-select"
                  >
                    <option value="restricted">Dibatasi (Hanya orang yang ditambahkan)</option>
                    <option value="anyone_viewer">Siapa saja yang memiliki link (Pelihat)</option>
                    <option value="anyone_editor">Siapa saja yang memiliki link (Editor)</option>
                  </select>
                </div>
                <p className="access-info-text">
                  {shareAccess === 'restricted' && 'Hanya pengguna terdaftar di Workspace ini yang dapat membuka.'}
                  {shareAccess === 'anyone_viewer' && 'Siapa saja di internet yang memiliki link ini dapat melihat tugas.'}
                  {shareAccess === 'anyone_editor' && 'Siapa saja di internet yang memiliki link ini dapat mengedit tugas.'}
                </p>
              </div>
              
              <div className="share-link-section">
                <label>Salin Link</label>
                <div className="share-link-row">
                  <input 
                    type="text" 
                    value={shareLink} 
                    readOnly 
                    className="share-link-input"
                  />
                  <button 
                    className={`btn ${isCopied ? 'btn-outline-green' : 'btn-primary'} share-copy-btn`}
                    onClick={handleCopyLink}
                  >
                    {isCopied ? 'Tersalin!' : 'Salin Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="share-modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Undang Anggota</h3>
              <button className="share-modal-close" onClick={() => setShowInviteModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="share-modal-body">
              {/* Email section */}
              <form onSubmit={handleSendInviteEmail} className="share-link-section">
                <label>Undang via Email</label>
                <div className="share-link-row">
                  <input 
                    type="email" 
                    placeholder="nama@email.com" 
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                    className="share-link-input"
                  />
                  <button type="submit" className="btn btn-primary share-copy-btn">
                    Kirim
                  </button>
                </div>
              </form>

              {/* Link ID section */}
              <div className="share-link-section" style={{ marginTop: '0.5rem' }}>
                <label>Undang via Link ID</label>
                <div className="share-link-row">
                  <input 
                    type="text" 
                    value={inviteLinkValue} 
                    readOnly 
                    className="share-link-input"
                  />
                  <button 
                    className={`btn ${isInviteCopied ? 'btn-outline-green' : 'btn-primary'} share-copy-btn`}
                    onClick={handleCopyInviteLink}
                  >
                    {isInviteCopied ? 'Tersalin!' : 'Salin Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Members Modal */}
      {showMembersModal && (
        <div className="share-modal-overlay" onClick={() => setShowMembersModal(false)}>
          <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Anggota Tim ({allMembers.length})</h3>
              <button className="share-modal-close" onClick={() => setShowMembersModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="share-modal-body modal-scrollable-list">
              <div className="members-list-container">
                {allMembers.map((member, idx) => (
                  <div key={idx} className="member-list-item">
                    <img src={member.avatar} alt={member.name} className="member-item-avatar" />
                    <div className="member-item-info">
                      <h4 className="member-item-name">{member.name}</h4>
                      <p className="member-item-role">{member.role}</p>
                    </div>
                    <div className="member-item-status">
                      <span className={`status-dot ${member.status}`}></span>
                      <span className="status-label">{member.status === 'online' ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Activity Detail Modal */}
      {showActivityModal && activeActivity && (
        <div className="share-modal-overlay" onClick={() => setShowActivityModal(false)}>
          <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Detail Aktivitas Tim</h3>
              <button className="share-modal-close" onClick={() => setShowActivityModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="share-modal-body">
              <div className="activity-detail-header-row">
                <img src={activeActivity.avatar} alt={activeActivity.user} className="activity-detail-avatar" />
                <div>
                  <h4 className="activity-detail-user">{activeActivity.user}</h4>
                  <span className="activity-detail-time">{activeActivity.time}</span>
                </div>
              </div>

              <div className="activity-detail-box">
                <p className="activity-detail-desc-text">
                  {getActivityDetailDesc(activeActivity)}
                </p>
              </div>

              <button className="btn btn-primary btn-block-action" onClick={() => setShowActivityModal(false)}>
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
