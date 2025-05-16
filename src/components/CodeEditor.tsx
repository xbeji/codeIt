
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
        return language.toUpperCase();
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
