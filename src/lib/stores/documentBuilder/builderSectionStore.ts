import { makeAutoObservable, runInAction } from 'mobx';
import { BuilderRootStore } from './builderRootStore';
import {
  MetadataValue,
  ParsedSectionMetadata,
  SectionMetadataKey,
  SectionType,
  SectionWithParsedMetadata,
} from '@/lib/types/documentBuilder.types';
import { DEX_Section } from '@/lib/client-db/clientDbSchema';
import {
  bulkUpdateSections,
  deleteSection,
  updateSection,
} from '@/lib/client-db/clientDbService';
import { getItemInsertTemplate } from '@/lib/helpers/documentBuilderHelpers';
import { OtherSectionOption } from '@/components/documentBuilder/AddSectionWidget';
import { clientDb } from '@/lib/client-db/clientDb';

export class BuilderSectionStore {
  root: BuilderRootStore;
  sections: SectionWithParsedMetadata[] = [];
  constructor(root: BuilderRootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  getSectionById = (sectionId: DEX_Section['id']) => {
    return this.sections.find((section) => section.id === sectionId);
  };

  reOrderSections = async (sections: SectionWithParsedMetadata[]) => {
    if (sections.length === 0) return;

    const newDisplayOrders = sections.map((section, index) => ({
      id: section.id,
      displayOrder: index + 1,
    }));

    const changedSections = newDisplayOrders.filter((newOrder) => {
      const prevItem = this.sections.find(
        (section) => section.id === newOrder.id,
      );
      return prevItem && prevItem.displayOrder !== newOrder.displayOrder;
    });

    runInAction(() => {
      this.sections.forEach((section) => {
        const newOrder = newDisplayOrders.find((o) => o.id === section.id);
        if (newOrder && newOrder?.displayOrder !== section.displayOrder) {
          section.displayOrder = newOrder.displayOrder;
        }
      });
    });

    if (changedSections.length) {
      try {
        await bulkUpdateSections(
          changedSections.map((section) => ({
            key: section.id,
            changes: {
              displayOrder: section.displayOrder,
            },
          })),
        );
      } catch (error) {
        console.error('bulkUpdateSections error', error);
      }
    }
  };

  addNewSection = async (option: Omit<OtherSectionOption, 'icon'>) => {
    const template = getItemInsertTemplate(option.type);
    if (!template) return;

    if (!this.root.documentStore.document) return;

    await clientDb.transaction(
      'rw',
      [clientDb.sections, clientDb.fields, clientDb.items],
      async () => {
        if (!this.root.documentStore.document) return;

        const sectionDto = {
          displayOrder: this.sections.reduce(
            (acc, curr) => Math.max(acc, curr.displayOrder),
            1,
          ),
          title: option.title,
          defaultTitle: option.defaultTitle,
          type: option.type,
          metadata: option?.metadata,
          documentId: this.root.documentStore.document.id,
        };

        const sectionId = await clientDb.sections.add(sectionDto);

        runInAction(() => {
          this.sections.push({
            ...sectionDto,
            id: sectionId,
            metadata: option?.metadata ? JSON.parse(option?.metadata) : [],
          });
        });

        await this.root.itemStore.addNewItemEntry(sectionId);
      },
    );
  };

  removeSection = async (sectionId: DEX_Section['id']) => {
    const section = this.sections.find((section) => section.id === sectionId);
    if (!section) return;

    const itemIdsToKeep = this.root.itemStore.items
      .filter((item) => item.sectionId !== sectionId)
      .map((item) => item.id);

    runInAction(() => {
      this.sections = this.sections.filter(
        (section) => section.id !== sectionId,
      );
      this.root.itemStore.items = this.root.itemStore.items.filter(
        (item) => item.sectionId !== sectionId,
      );
      this.root.fieldStore.fields = this.root.fieldStore.fields.filter(
        (field) => itemIdsToKeep.includes(field.itemId),
      );
    });

    await deleteSection(sectionId);
  };

  renameSection = async (sectionId: DEX_Section['id'], value: string) => {
    const section = this.sections.find((section) => section.id === sectionId);
    if (!section) return;

    await updateSection(sectionId, {
      title: value,
    });

    runInAction(() => {
      section.title = value;
    });
  };

  getSectionMetadataOptions = (
    sectionId: DEX_Section['id'],
  ): ParsedSectionMetadata[] => {
    const section = this.getSectionById(sectionId);
    if (!section || !section?.metadata) return [];
    return section?.metadata || [];
  };

  updateSectionMetadata = async (
    sectionId: DEX_Section['id'],
    data: {
      key: SectionMetadataKey;
      value: MetadataValue;
    },
  ) => {
    const section = this.getSectionById(sectionId);
    if (!section) return;

    const metadata = section.metadata.find(
      (metadata) => metadata.key === data.key,
    );

    runInAction(() => {
      if (metadata) {
        metadata.value = data.value;
      }
    });

    await updateSection(sectionId, {
      metadata: JSON.stringify(
        section.metadata.map((metadata) => ({
          ...metadata,
          value: metadata.key === data.key ? data.value : metadata.value,
        })),
      ),
    });
  };

  getSectionNameByType = (sectionType: SectionType): string => {
    return (
      this.sections.find((section) => section.type === sectionType)?.title || ''
    );
  };

  get sectionsWithItems() {
    return this.sections.map((section) => {
      return {
        ...section,
        items: this.root.itemStore.getItemsBySectionId(section.id),
      };
    });
  }
}
