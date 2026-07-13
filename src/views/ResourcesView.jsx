import React from 'react';
import { Search, Filter, MoreVertical, FileText, Image, Table, Box, ArrowUpRight, Folder, ChevronRight, Plus, X, UploadCloud } from 'lucide-react';
import '../components/ResourcesView.css';

export default function ResourcesView({
  setActiveTab,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  showAddModal,
  setShowAddModal,
  newFileName,
  setNewFileName,
  newFileProject,
  setNewFileProject,
  newFileSize,
  setNewFileSize,
  newFileBadge,
  setNewFileBadge,
  activeMenuId,
  setActiveMenuId,
  isEditing,
  editingFileId,
  files,
  directories,
  filteredFiles,
  handleAddNewFile,
  handleEditClick,
  handleDeleteClick,
  handleCloseModal,
  handleFileChange,
  submitNewFile
}) {
  const getFileIcon = (type) => {
    switch (type) {
      case 'csv':
        return <Table size={22} />;
      case 'pdf':
        return <FileText size={22} />;
      case 'image':
        return <Image size={22} />;
      default:
        return <Box size={22} />;
    }
  };

  return (
    <div className="view-animate">
      {/* Header bar */}
      <div className="header-wrapper">
        <div className="search-wrapper-header">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search files, papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-right">
          <button className="btn btn-secondary" onClick={() => setActiveTab('premium')}>
            Upgrade Storage
          </button>
          <button className="btn btn-primary" onClick={handleAddNewFile}>
            <Plus size={16} />
            <span>Add Resource</span>
          </button>
          <div className="user-profile-btn">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="profile" />
          </div>
        </div>
      </div>

      <div className="content-body">
        {/* Main Resource grid */}
        <div className="resources-layout-grid">
          
          {/* Left panel: files list */}
          <div className="files-list-panel">
            <div className="panel-header-filter">
              <h3>Stored Resources</h3>
              
              <div className="filter-pills-row">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`filter-pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('pdf')}
                  className={`filter-pill-btn ${activeFilter === 'pdf' ? 'active' : ''}`}
                >
                  PDFs
                </button>
                <button
                  onClick={() => setActiveFilter('csv')}
                  className={`filter-pill-btn ${activeFilter === 'csv' ? 'active' : ''}`}
                >
                  CSVs
                </button>
                <button
                  onClick={() => setActiveFilter('image')}
                  className={`filter-pill-btn ${activeFilter === 'image' ? 'active' : ''}`}
                >
                  Images
                </button>
              </div>
            </div>

            {/* List of files */}
            <div className="files-cards-list-scroller">
              {filteredFiles.map((file) => (
                <div key={file.id} className="file-item-card">
                  <div className="file-card-icon-box">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="file-card-middle">
                    <div className="file-title-row">
                      <h4>{file.name}</h4>
                      <span className="badge badge-milestone">{file.badge}</span>
                    </div>
                    <div className="file-meta-row">
                      <span className="file-project-tag">{file.project}</span>
                      <span className="file-dot-separator">•</span>
                      <span className="file-size-tag">{file.size}</span>
                      <span className="file-dot-separator">•</span>
                      <span className="file-date-tag">{file.date}</span>
                    </div>
                  </div>

                  <div className="file-card-right">
                    <button className="btn-icon" onClick={() => alert(`Opening preview for ${file.name}`)}>
                      <ArrowUpRight size={16} />
                    </button>
                    
                    {/* Floating Dropdown Edit/Delete Actions */}
                    <div className="file-card-menu-container">
                      <button 
                        className={`file-card-dots ${activeMenuId === file.id ? 'active' : ''}`}
                        onClick={() => setActiveMenuId(activeMenuId === file.id ? null : file.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeMenuId === file.id && (
                        <div className="file-dropdown-menu">
                          <button type="button" onClick={() => handleEditClick(file)}>
                            Edit File
                          </button>
                          <button type="button" className="delete-btn" onClick={() => handleDeleteClick(file.id)}>
                            Delete File
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredFiles.length === 0 && (
                <div className="empty-files-placeholder">
                  No files found matching your search.
                </div>
              )}
            </div>
          </div>

          {/* Right panel: directory and usage chart */}
          <div className="resources-widgets-panel">
            
            {/* Storage usage panel card */}
            <div className="storage-card-panel">
              <h4>Storage Space</h4>
              
              <div className="storage-donut-section">
                {/* SVG Donut Chart */}
                <div className="storage-donut-visual">
                  <svg className="donut" width="120" height="120" viewBox="0 0 40 40">
                    <circle className="donut-hole" cx="20" cy="20" r="16" fill="transparent"></circle>
                    <circle className="donut-ring" cx="20" cy="20" r="16" fill="transparent" stroke="#f1f3f2" strokeWidth="3"></circle>
                    <circle className="donut-segment" cx="20" cy="20" r="16" fill="transparent" stroke="#22573e" strokeWidth="3" strokeDasharray="75 25" strokeDashoffset="25"></circle>
                    <g className="donut-text">
                      <text x="50%" y="46%" className="donut-number">7.5</text>
                      <text x="50%" y="64%" className="donut-label">GB of 10GB</text>
                    </g>
                  </svg>
                </div>

                <div className="storage-breakdown-details">
                  <div className="breakdown-row">
                    <span className="dot-bullet bullet-pdf"></span>
                    <span className="breakdown-label">PDF Documents</span>
                    <span className="breakdown-val">3.4 GB</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="dot-bullet bullet-csv"></span>
                    <span className="breakdown-label">CSV & Datasets</span>
                    <span className="breakdown-val">2.8 GB</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="dot-bullet bullet-image"></span>
                    <span className="breakdown-label">Images & Figures</span>
                    <span className="breakdown-val">1.3 GB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directories panel card */}
            <div className="directories-card-panel">
              <div className="directory-header-row">
                <h4>Project Directories</h4>
                <button className="btn-icon btn-sm" onClick={() => alert('New Folder coming soon!')}>
                  <Plus size={14} />
                </button>
              </div>

              <div className="directories-list-container">
                {directories.map((dir, idx) => (
                  <div key={idx} className="dir-item-row">
                    <div className="dir-item-left">
                      <Folder size={16} className="dir-folder-icon" />
                      <span>{dir}</span>
                    </div>
                    <ChevronRight size={14} className="dir-arrow" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Resource Modal Popup */}
      {showAddModal && (
        <div className="share-modal-overlay" onClick={handleCloseModal}>
          <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>{isEditing ? 'Ubah File Resource' : 'Tambah File Resource'}</h3>
              <button className="share-modal-close" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={submitNewFile} className="share-modal-body">
              {/* File Title */}
              <div className="share-link-section">
                <label>Judul File</label>
                <input 
                  type="text" 
                  placeholder="e.g. Analysis_Findings" 
                  value={newFileName} 
                  onChange={(e) => setNewFileName(e.target.value)}
                  required
                  className="share-link-input"
                  style={{ backgroundColor: 'var(--white)' }}
                />
              </div>

              {/* Project Name */}
              <div className="share-link-section">
                <label>Nama Project</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cognitive Science Thesis" 
                  value={newFileProject} 
                  onChange={(e) => setNewFileProject(e.target.value)}
                  className="share-link-input"
                  style={{ backgroundColor: 'var(--white)' }}
                />
              </div>

              {/* Category / Milestone Badge */}
              <div className="share-access-section">
                <label>Tag Kategori</label>
                <select 
                  value={newFileBadge} 
                  onChange={(e) => setNewFileBadge(e.target.value)}
                  className="share-access-select"
                >
                  <option value="MILESTONE 1">MILESTONE 1</option>
                  <option value="MILESTONE 2">MILESTONE 2</option>
                  <option value="DRAFT PHASE">DRAFT PHASE</option>
                  <option value="ASSET PACK">ASSET PACK</option>
                  <option value="REFERENCE">REFERENCE</option>
                </select>
              </div>

              {/* File size & Upload dropzone */}
              {!isEditing && (
                <div className="share-link-section">
                  <label>Upload File (Word, PDF, Excel, JPG, dll.)</label>
                  <div className="file-upload-dropzone">
                    <input 
                      type="file" 
                      id="dropzone-file-input"
                      onChange={handleFileChange}
                      className="hidden-file-input"
                    />
                    <label htmlFor="dropzone-file-input" className="dropzone-label-card">
                      <UploadCloud size={32} className="dropzone-upload-icon" />
                      <span className="dropzone-main-text">Klik untuk pilih file dari komputer Anda</span>
                      <span className="dropzone-subtext">Mendukung Word, PDF, JPG, PNG, CSV, Excel, dll.</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Read-Only Size indicator */}
              {newFileSize && (
                <div className="share-link-section" style={{ marginTop: '-0.25rem' }}>
                  <label>Ukuran File Terdeteksi</label>
                  <input 
                    type="text" 
                    value={newFileSize} 
                    readOnly
                    className="share-link-input"
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-block-action">
                {isEditing ? 'Simpan Perubahan' : 'Upload & Tambahkan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
