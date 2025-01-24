'use client';
import { observer } from 'mobx-react-lite';
import EditableSectionTitle from '@/components/EditableSectionTitle';
import { documentBuilderStore } from '@/lib/documentBuilderStore';
import SectionItem from '@/components/SectionItem';
import SectionDescription from '@/components/SectionDescription';
import { CONTAINER_TYPES, DEX_Section } from '@/lib/schema';
import AddNewItemButton from '@/components/AddNewItemButton';
import ItemsDndContext from '@/components/ItemsDndContext';
import DraggableSectionContainer from '@/components/DraggableSectionContainer';
import { FIXED_SECTIONS } from '@/lib/constants';
import { ReactNode } from 'react';
import SectionMetadataOptions from '@/components/SectionMetadataOptions';

const DocumentSection = observer(
  ({ sectionId }: { sectionId: DEX_Section['id'] }) => {
    const items = documentBuilderStore.getItemsBySectionId(sectionId);

    const ContainerElement = ({ children }: { children: ReactNode }) => {
      if (
        FIXED_SECTIONS.includes(
          documentBuilderStore.getSectionById(sectionId)
            ?.type as (typeof FIXED_SECTIONS)[number],
        )
      ) {
        return <section>{children}</section>;
      }

      return (
        <DraggableSectionContainer sectionId={sectionId}>
          {children}
        </DraggableSectionContainer>
      );
    };

    return (
      <ContainerElement>
        <div className="flex flex-col gap-1">
          <EditableSectionTitle sectionId={sectionId} />
          <SectionDescription sectionId={sectionId} />
          <SectionMetadataOptions sectionId={sectionId} />
        </div>
        <ItemsDndContext items={items}>
          {items
            .slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => (
              <SectionItem itemId={item.id} key={item.id} />
            ))}
        </ItemsDndContext>
        {items.every(
          (item) => item.containerType === CONTAINER_TYPES.COLLAPSIBLE,
        ) && <AddNewItemButton sectionId={sectionId} />}
      </ContainerElement>
    );
  },
);

export default DocumentSection;
