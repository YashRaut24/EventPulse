import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EditableField = ({ 
  label, 
  value, 
  onSave, 
  type = 'text', 
  placeholder = '', 
  multiline = false,
  disabled = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setEditValue(value || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving:', error);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  if (disabled) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">{label}</label>
        <div className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400">
          {value || 'Not set'}
        </div>
        <p className="text-xs text-gray-500">This field cannot be edited</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">{label}</label>
      
      {!isEditing ? (
        <div className="flex items-center justify-between group">
          <div className="flex-1 px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-white">
            {value || <span className="text-gray-400">{placeholder || 'Not set'}</span>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="ml-2 p-2 text-gray-400 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Icon name="Edit2" size={16} />
          </motion.button>
        </div>
      ) : (
        <div className="space-y-2">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-black/60 border border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              placeholder={placeholder}
            />
          ) : (
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-3 py-2 bg-black/60 border border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder={placeholder}
              autoFocus
            />
          )}
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 text-sm flex items-center space-x-1"
            >
              {isSaving ? (
                <>
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Icon name="Check" size={14} />
                  <span>Save</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center space-x-1"
            >
              <Icon name="X" size={14} />
              <span>Cancel</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableField;