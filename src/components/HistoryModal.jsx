import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { X, Edit2, Trash2, Clock } from 'lucide-react';
import './HistoryModal.css';

const HistoryModal = ({ isOpen, onClose, user, onLoadResume }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch history whenever the modal opens and a user is logged in
  useEffect(() => {
    if (isOpen && user) {
      fetchHistory();
    }
  }, [isOpen, user]);

  // Fetch the user's past resumes from Supabase, ordered by most recent first
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a single history record
  const handleDelete = async (id) => {
    // Prompt the user to confirm before proceeding with irreversible deletion
    if (!window.confirm('Are you sure you want to delete this resume from history?')) return;
    
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Remove the deleted item from local state so the UI updates instantly
      setHistory(history.filter(h => h.id !== id));
    } catch (err) {
      alert('Error deleting resume: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content history-modal-content">
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Clock size={24} color="var(--primary-blue)" />
          <h2 style={{ margin: 0 }}>Resume History</h2>
        </div>

        {loading ? (
          <p className="text-muted">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-muted">You have no saved resumes in your history yet.</p>
        ) : (
          <div className="history-list">
            {history.map((item) => {
              const name = item.data?.personalInfo?.fullName || 'Untitled Resume';
              const date = new Date(item.created_at).toLocaleString();
              
              return (
                <div key={item.id} className="history-item">
                  <div className="history-info">
                    <strong>{name}</strong>
                    <span className="history-date">{date}</span>
                    <span className="history-template-badge">Template: {item.template || 'colored'}</span>
                  </div>
                  <div className="history-actions">
                    <button 
                      className="btn-icon" 
                      onClick={() => {
                        onLoadResume(item.data, item.template);
                        onClose();
                      }}
                      title="Load into Editor"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn-icon danger" 
                      onClick={() => handleDelete(item.id)}
                      title="Delete Resume"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
