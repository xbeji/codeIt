
import React, { useRef, useEffect, useState } from 'react';
import { generateIframeContent } from '@/utils/iframeUtils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PreviewPaneProps {
  html: string;
  css: string;
  js: string;
  height?: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ html, css, js, height = '300px' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [promptDialogOpen, setPromptDialogOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [promptDefaultValue, setPromptDefaultValue] = useState('');
  const [promptResult, setPromptResult] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const refreshIframe = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const content = generateIframeContent(html, css, js);
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();
      }
    }
  };

  useEffect(() => {
    refreshIframe();
  }, [html, css, js]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'alert' && event.data.message) {
          setAlertMessage(event.data.message);
        } else if (event.data.type === 'prompt' && event.data.message) {
          setPromptMessage(event.data.message);
          setPromptDefaultValue(event.data.defaultValue || '');
          setPromptDialogOpen(true);
        } else if (event.data.type === 'confirm' && event.data.message) {
          setConfirmMessage(event.data.message);
          setConfirmDialogOpen(true);
        } else if (event.data.type === 'error' && event.data.message) {
          console.error('JavaScript error:', event.data.message);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handlePromptSubmit = () => {
    setPromptDialogOpen(false);
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'promptResult',
        result: promptResult
      }, '*');
    }
  };

  const handleConfirmResult = (result: boolean) => {
    setConfirmDialogOpen(false);
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'confirmResult',
        result: result
      }, '*');
    }
  };

  return (
    <div className="w-full">
      <div className="preview-container w-full border rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b bg-gray-100">
          <div className="text-sm font-medium text-gray-700">Preview</div>
          <button 
            onClick={refreshIframe} 
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Refresh
          </button>
        </div>
        <div className="bg-white" style={{ height }}>
          <iframe 
            ref={iframeRef}
            className="preview-iframe"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {/* Alert Dialog */}
      {alertMessage && (
        <Alert className="mt-4">
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>
            {alertMessage}
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={() => setAlertMessage(null)}
            >
              OK
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Prompt Dialog */}
      <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prompt</DialogTitle>
            <DialogDescription>{promptMessage}</DialogDescription>
          </DialogHeader>
          <Input
            value={promptResult}
            onChange={(e) => setPromptResult(e.target.value)}
            placeholder={promptDefaultValue}
            className="mt-2"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setPromptDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePromptSubmit}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => handleConfirmResult(false)}>Cancel</Button>
            <Button onClick={() => handleConfirmResult(true)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewPane;
