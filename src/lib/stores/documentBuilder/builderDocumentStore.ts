import { makeAutoObservable, runInAction } from 'mobx';
import { BuilderRootStore } from './builderRootStore';
import { DEX_Document } from '@/lib/client-db/clientDbSchema';
import {
  getFullDocumentStructure,
  renameDocument,
} from '@/lib/client-db/clientDbService';

export class BuilderDocumentStore {
  root: BuilderRootStore;
  document: DEX_Document | null = null;
  constructor(root: BuilderRootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  initializeStore = async (documentId: DEX_Document['id']) => {
    try {
      const result = await getFullDocumentStructure(documentId);
      if (!result?.success) {
        return {
          error: result?.error,
        };
      }

      const { document, sections, items, fields } = result;

      runInAction(() => {
        this.document = document;
        this.root.sectionStore.sections = sections
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((section) => ({
            ...section,
            metadata: JSON.parse(section?.metadata || '[]'),
          }));
        this.root.itemStore.items = items
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder);
        this.root.fieldStore.fields = fields;
      });
    } catch (error) {
      console.error('initializeStore error', error);
      return {
        error: 'An error occurred while initializing the document store.',
      };
    }
  };

  renameDocument = async (newValue: string) => {
    if (!this.document) return;
    try {
      await renameDocument(this.document.id, newValue);
      runInAction(() => {
        if (!this.document) return;
        this.document.title = newValue;
      });
    } catch (error) {
      console.error('renameDocument error', error);
      return {
        error:
          'An error occurred while renaming the document. Please try again.',
      };
    }
  };
}
