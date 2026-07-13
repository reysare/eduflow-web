import React, { useState, useEffect } from 'react';
import Sidebar from '../views/Sidebar';
import DashboardView from '../views/DashboardView';
import RoadmapView from '../views/RoadmapView';
import PremiumView from '../views/PremiumView';
import ResourcesView from '../views/ResourcesView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // =========================================================================
  // DASHBOARD VIEW LOGIC
  // =========================================================================
  const [roadmapInput, setRoadmapInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [weeks, setWeeks] = useState([
    { number: 1, title: 'Foundational Principles', desc: 'Introduction to core concept historical context.', status: 'completed' },
    { number: 2, title: 'Advanced Theory', desc: 'Deep dive into mathematical modeling and complex theorem.', status: 'active' },
    { number: 3, title: 'Practical Application', desc: 'Case studies and simulated experimental data analysis.', status: 'locked' },
    { number: 4, title: 'Final Assessment', desc: 'Comprehensive review and knowledge validation exam.', status: 'locked' },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      column: 'todo',
      tag: 'RESEARCH',
      title: 'Literature Review: Neural Nets',
      desc: 'Analyze 2023 papers on transformer architectures in medical imaging.',
      comments: 0,
      date: 'Oct 12',
      avatars: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'],
      type: 'link',
      isPrivate: false,
    },
    {
      id: 2,
      column: 'todo',
      tag: 'DRAFTING',
      title: 'Abstract Submission',
      desc: 'Finalize the abstract for the International Tech Symposium.',
      comments: 3,
      date: 'Tomorrow',
      avatars: ['https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150'],
      type: 'locked',
      urgent: true,
      isPrivate: true,
    },
    {
      id: 3,
      column: 'inprogress',
      tag: 'DATA ANALYSIS',
      tagExtra: 'HIGH PRIORITY',
      title: 'Dataset Cleaning',
      desc: 'Processing raw sensory data from the IoT laboratory nodes.',
      comments: 0,
      date: 'Oct 20',
      avatars: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'],
      type: 'progress',
      progress: 65,
      locked: true,
      isPrivate: true,
    },
    {
      id: 4,
      column: 'done',
      tag: 'ADMIN',
      title: 'Team Onboarding',
      desc: 'All 5 research assistants have been granted workspace access.',
      comments: 1,
      date: 'Oct 01',
      avatars: ['https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'],
      type: 'completed',
      isPrivate: false,
    }
  ]);

  const [activities, setActivities] = useState([
    { id: 1, type: 'edit', user: 'Sarah', target: 'Research Roadmap', time: '2 minutes ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 2, type: 'complete', user: 'Michael', target: 'API Integration', time: '15 minutes ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    { id: 3, type: 'upload', user: 'Emily', target: 'Dataset_v2.csv', time: '1 hour ago', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { id: 4, type: 'join', user: 'Dr. Aris', target: 'Workspace', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  ]);

  const [activeTaskIdMenu, setActiveTaskIdMenu] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTask, setShareTask] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [shareAccess, setShareAccess] = useState('restricted');
  const [isCopied, setIsCopied] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLinkValue] = useState('https://eduflow.app/invite/eduflow-workspace-493');
  const [isInviteCopied, setIsInviteCopied] = useState(false);

  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);

  const allMembers = [
    { name: 'Sarah Lee', role: 'Project Manager', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'Michael Tan', role: 'Fullstack Developer', status: 'online', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    { name: 'Emily Rose', role: 'Data Scientist', status: 'offline', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { name: 'Dr. Aris', role: 'Research Director', status: 'online', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { name: 'Jordan Smith', role: 'Content Writer', status: 'offline', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Maria Garcia', role: 'Researcher', status: 'online', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { name: 'Liam Chen', role: 'UI/UX Designer', status: 'offline', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
  ];

  const allTasksDone = tasks.every(t => t.column === 'done');

  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    if (!roadmapInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const topic = roadmapInput;
      setWeeks([
        { number: 1, title: `Introduction to ${topic}`, desc: 'Basics, core components, and definitions.', status: 'completed' },
        { number: 2, title: `Intermediate study of ${topic}`, desc: 'Practical methodologies and data structures.', status: 'active' },
        { number: 3, title: `Advanced analysis of ${topic}`, desc: 'Complex implementations and scalability.', status: 'locked' },
        { number: 4, title: `Final Project & Evaluation`, desc: `Presenting research findings on ${topic}.`, status: 'locked' },
      ]);
      
      const newActivity = {
        id: Date.now(),
        type: 'edit',
        user: 'You',
        target: `Generated roadmap for: "${topic}"`,
        time: 'Just now',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      };
      setActivities([newActivity, ...activities]);
      setIsGenerating(false);
      setRoadmapInput('');
    }, 1500);
  };

  const handleMoveTask = (taskId, newCol) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, column: newCol } : t));
  };

  const handleTogglePrivate = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, isPrivate: !t.isPrivate } : t));
  };

  const handleShareClick = (task) => {
    setShareTask(task);
    setShareLink(`https://eduflow.app/task/${task.id}`);
    setIsCopied(false);
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendInviteEmail = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    alert(`Undangan berhasil dikirim ke: ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLinkValue);
    setIsInviteCopied(true);
    setTimeout(() => setIsInviteCopied(false), 2000);
  };

  const getActivityDetailDesc = (act) => {
    if (!act) return '';
    switch (act.user) {
      case 'Sarah':
        return 'Sarah memperbarui draf roadmap akademik untuk Literature Review, menambahkan modul analisis neural network dan mengoreksi detail Week 1.';
      case 'Michael':
        return 'Michael menyelesaikan integrasi API backend untuk paper summarization service dan meluncurkan endpoint ke lingkungan staging.';
      case 'Emily':
        return 'Emily mengunggah file data sekunder Dataset_v2.csv berisi data sensor IoT laboratorium yang telah dibersihkan sebanyak 12,000 baris.';
      case 'Dr. Aris':
        return 'Dr. Aris resmi bergabung ke dalam Workspace kolaborasi EduFlow Pro sebagai Peninjau Akademik senior.';
      default:
        return `${act.user} melakukan tindakan ${act.type} pada target ${act.target}.`;
    }
  };

  // =========================================================================
  // ROADMAP VIEW LOGIC
  // =========================================================================
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [searchWorkspace, setSearchWorkspace] = useState('');
  const [phases, setPhases] = useState([
    { id: 1, label: 'Task 1', title: 'Literature Review', completed: true, active: true },
    { id: 2, label: 'Task 2', title: 'Research Proposal', completed: true, active: false },
    { id: 3, label: 'Task 3', title: 'Data Collection', completed: false, active: false },
    { id: 4, label: 'Task 4', title: 'Final Synthesis', completed: false, active: false },
  ]);

  const [logs, setLogs] = useState([
    { id: 1, type: 'upload', user: 'Jordan Smith', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', action: 'uploaded Dataset_v3.csv', time: '10 MINS AGO', fileName: 'Dataset_v3.csv', fileSize: '2.4 MB' },
    { id: 2, type: 'comment', user: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', action: "commented on Liam Chen's Post 'Research Proposal'", time: '1 HOUR AGO', comment: 'Added notes on methodology section.' },
    { id: 3, type: 'move', user: 'Liam Chen', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', action: 'moved Research Proposal from In Progress to Review', time: '3 HOURS AGO', targetName: 'Research Proposal', targetStatus: 'Review' },
    { id: 4, type: 'revision', user: 'Sarah Lee', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', action: 'revised Synthesis Outline', time: 'YESTERDAY', revisionNotes: 'Updated structure based on new findings.' },
    { id: 5, type: 'complete', user: 'Jordan Smith', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', action: 'completed task Source Gathering', time: 'YESTERDAY' }
  ]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSelectPhase = (id) => {
    setPhases(phases.map(p => ({ ...p, active: p.id === id })));
    triggerToast(`Switched to Task ${id}: ${phases.find(p => p.id === id).title}`);
  };

  const filteredLogs = logs.filter(log => {
    if (activeSubTab === 'all') return true;
    if (activeSubTab === 'uploads' && log.type === 'upload') return true;
    if (activeSubTab === 'comments' && log.type === 'comment') return true;
    if (activeSubTab === 'revisions' && log.type === 'revision') return true;
    if (activeSubTab === 'updates' && (log.type === 'move' || log.type === 'complete')) return true;
    return false;
  });

  const handleAddComment = () => {
    const text = prompt('Enter a mock comment:');
    if (!text) return;
    
    const newLog = {
      id: Date.now(),
      type: 'comment',
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      action: "commented on Literature Review & Analysis",
      time: 'JUST NOW',
      comment: text
    };
    setLogs([newLog, ...logs]);
    triggerToast('Added comment to feed.');
  };

  // =========================================================================
  // PREMIUM VIEW LOGIC
  // =========================================================================
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [progressVal, setProgressVal] = useState(75);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [upgradedPlanName, setUpgradedPlanName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressVal((prev) => {
        if (prev >= 98) return 70;
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const handleUpgradeAction = (planName) => {
    setUpgradedPlanName(planName);
    setShowSuccessModal(true);
  };

  // =========================================================================
  // RESOURCES VIEW LOGIC
  // =========================================================================
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileProject, setNewFileProject] = useState('');
  const [newFileSize, setNewFileSize] = useState('');
  const [newFileBadge, setNewFileBadge] = useState('MILESTONE 2');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFileId, setEditingFileId] = useState(null);

  const [files, setFiles] = useState([
    { id: 1, name: 'Dataset_v3.csv', project: 'Quantitative Analysis Project', date: 'Oct 12, 2023', size: '2.4 MB', type: 'csv', badge: 'MILESTONE 2' },
    { id: 2, name: 'Literature_Review_Final.pdf', project: 'Cognitive Science Thesis', date: 'Oct 10, 2023', size: '1.1 MB', type: 'pdf', badge: 'DRAFT PHASE' },
    { id: 3, name: 'Architecture_Mockup.jpg', project: 'Design Principles 101', date: 'Oct 08, 2023', size: '4.8 MB', type: 'image', badge: 'ASSET PACK' },
    { id: 4, name: 'Research_Notes.docx', project: 'Ethical Tech Seminar', date: 'Oct 05, 2023', size: '0.8 MB', type: 'docx', badge: 'REFERENCE' }
  ]);

  const [directories] = useState([
    'Economics 302', 'Theses Assets', 'Lab Results', 'Final Submissions', 'Reading List'
  ]);

  const handleAddNewFile = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (file) => {
    setNewFileName(file.name);
    setNewFileProject(file.project);
    setNewFileSize(file.size);
    setNewFileBadge(file.badge);
    setIsEditing(true);
    setEditingFileId(file.id);
    setActiveMenuId(null);
    setShowAddModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus file ini?')) {
      setFiles(files.filter(f => f.id !== id));
    }
    setActiveMenuId(null);
  };

  const handleCloseModal = () => {
    setNewFileName('');
    setNewFileProject('');
    setNewFileSize('');
    setNewFileBadge('MILESTONE 2');
    setIsEditing(false);
    setEditingFileId(null);
    setShowAddModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewFileName(file.name);
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB >= 0.1) {
      setNewFileSize(`${sizeInMB.toFixed(1)} MB`);
    } else {
      setNewFileSize(`${(file.size / 1024).toFixed(0)} KB`);
    }
  };

  const submitNewFile = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    
    const parts = newFileName.split('.');
    const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'pdf';
    
    let type = 'pdf';
    if (['csv', 'xlsx', 'tsv'].includes(ext)) type = 'csv';
    else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) type = 'image';
    else if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) type = 'docx';

    if (isEditing) {
      setFiles(files.map(f => f.id === editingFileId ? {
        ...f,
        name: newFileName,
        project: newFileProject.trim() || 'General Workspace',
        size: newFileSize.trim() || '1.0 MB',
        type: type,
        badge: newFileBadge
      } : f));
      setIsEditing(false);
      setEditingFileId(null);
    } else {
      const newFile = {
        id: Date.now(),
        name: newFileName,
        project: newFileProject.trim() || 'General Workspace',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        size: newFileSize.trim() || '1.0 MB',
        type: type,
        badge: newFileBadge
      };
      setFiles([newFile, ...files]);
    }
    
    setNewFileName('');
    setNewFileProject('');
    setNewFileSize('');
    setNewFileBadge('MILESTONE 2');
    setShowAddModal(false);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pdf' && file.type === 'pdf') return true;
    if (activeFilter === 'csv' && file.type === 'csv') return true;
    if (activeFilter === 'image' && file.type === 'image') return true;
    return false;
  });

  // =========================================================================
  // VIEW RENDERER
  // =========================================================================
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return React.createElement(DashboardView, {
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
        });
      case 'roadmap':
        return React.createElement(RoadmapView, {
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
        });
      case 'premium':
        return React.createElement(PremiumView, {
          selectedPlan,
          setSelectedPlan,
          progressVal,
          showSuccessModal,
          setShowSuccessModal,
          upgradedPlanName,
          handleUpgradeAction
        });
      case 'resources':
        return React.createElement(ResourcesView, {
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
        });
      default:
        return React.createElement(DashboardView, null);
    }
  };

  return React.createElement(
    'div',
    { className: 'app-container' },
    React.createElement(Sidebar, { activeTab: activeTab, setActiveTab: setActiveTab }),
    React.createElement(
      'div',
      { className: 'main-content' },
      renderActiveView()
    )
  );
}
