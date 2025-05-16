
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  language: 'html' | 'css' | 'js';
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  language, 
  value, 
  onChange,
  height = '300px'
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange(newValue);
  };

  // Handle Tab key press to insert spaces instead of changing focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent focus change
      
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      // Insert 2 spaces at cursor position
      const spaces = '  ';
      const newValue = internalValue.substring(0, start) + spaces + internalValue.substring(end);
      
      // Update the value
      setInternalValue(newValue);
      onChange(newValue);
      
      // Move cursor position after the inserted spaces
      // We need to use setTimeout to ensure this happens after React's state update
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + spaces.length;
      }, 0);
    }
  };

  const getLanguageClass = () => {
    switch (language) {
      case 'html':
        return 'bg-editor-background text-blue-300';
      case 'css':
        return 'bg-editor-background text-green-300';
      case 'js':
        return 'bg-editor-background text-yellow-300';
      default:
        return 'bg-editor-background text-editor-text';
    }
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'js':
        return 'JavaScript';
      default:
        // Fix: Use a string literal instead of calling toUpperCase on language
        return 'CODE'; // Fallback label
    }
  };

  return (
    <div className="code-editor-container w-full rounded-md border bg-editor-background">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-700">
        <div className={cn("text-sm font-medium", language === 'html' ? "text-blue-300" : language === 'css' ? "text-green-300" : "text-yellow-300")}>
          {getLanguageLabel()}
        </div>
      </div>
      <textarea
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "code-editor w-full px-4 py-3 outline-none",
          getLanguageClass(),
          "font-mono text-sm"
        )}
        style={{ height, resize: 'none' }}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
