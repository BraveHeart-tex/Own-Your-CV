import {
  DOCUMENT_BUILDER_SEARCH_PARAM_VALUES,
  useDocumentBuilderSearchParams,
} from '@/hooks/useDocumentBuilderSearchParams';
import { cn } from '@/lib/utils';
import DocumentBuilderPreviewHeader from './DocumentBuilderPreviewHeader';
import DocumentBuilderPreviewFooter from './DocumentBuilderPreviewFooter';
import { observer } from 'mobx-react-lite';
import DocumentBuilderPreviewContent from './DocumentBuilderPreviewContent';

const DocumentBuilderPreview = observer(() => {
  const { view } = useDocumentBuilderSearchParams();

  return (
    <div
      className={cn(
        'bg-muted-foreground dark:bg-secondary min-h-screen fixed top-0 right-0 w-1/2',
        view === DOCUMENT_BUILDER_SEARCH_PARAM_VALUES.VIEW.PREVIEW &&
          'w-full xl:w-1/2',
        view === DOCUMENT_BUILDER_SEARCH_PARAM_VALUES.VIEW.BUILDER &&
          'hidden xl:block',
      )}
    >
      <div className="h-[90vh] w-[75%] mx-auto pt-4">
        <DocumentBuilderPreviewHeader />
        <DocumentBuilderPreviewContent />
        <DocumentBuilderPreviewFooter />
      </div>
    </div>
  );
});

export default DocumentBuilderPreview;
