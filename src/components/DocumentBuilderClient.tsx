'use client';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useTransition } from 'react';
import { documentBuilderStore } from '@/lib/documentBuilderStore';
import { observer } from 'mobx-react-lite';
import { showErrorToast } from '@/components/ui/sonner';
import DocumentBuilderHeader from '@/components/DocumentBuilderHeader';
import DocumentSections from '@/components/DocumentSections';
import AddSectionWidget from '@/components/AddSectionWidget';
import { DEX_Document } from '@/lib/schema';
import { useDocumentBuilderSearchParams } from '@/hooks/useDocumentBuilderSearchParams';

const DocumentBuilderClient = observer(
  ({ documentId }: { documentId: DEX_Document['id'] }) => {
    const navigate = useNavigate();
    const { view } = useDocumentBuilderSearchParams();

    const [, startTransition] = useTransition();

    useEffect(() => {
      if (!documentId || documentBuilderStore.document?.id === documentId) {
        return;
      }

      startTransition(async () => {
        const result = await documentBuilderStore.initializeStore(documentId);
        if (result?.error) {
          showErrorToast(result.error);
          navigate('/documents');
        }
      });
    }, [documentId, navigate]);

    return (
      <TooltipProvider>
        <div
          className={cn(
            'bg-background min-h-screen px-6 md:p-12 py-14 h-screen relative w-1/2 hide-scrollbar',
            view === 'builder' && 'w-full xl:w-1/2',
            view === 'preview' && 'hidden xl:block',
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  navigate('/documents');
                  setTimeout(() => {
                    documentBuilderStore.resetState();
                  }, 100);
                }}
                variant="outline"
                className="top-2 left-2 absolute"
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Documents page</p>
            </TooltipContent>
          </Tooltip>
          <div className="max-w-screen-2xl flex items-center justify-center mx-auto">
            <DocumentBuilderHeader />
          </div>
          <div className="max-w-screen-2xl grid gap-6 pb-8 mx-auto mt-4">
            <DocumentSections />
            <AddSectionWidget />
          </div>
        </div>
      </TooltipProvider>
    );
  },
);

export default DocumentBuilderClient;
