'use client';
import { observer } from 'mobx-react-lite';
import { type LucideIcon } from 'lucide-react';
import { DEX_Item, DEX_Section } from '@/lib/client-db/clientDbSchema';
import { Button } from '@/components/ui/button';
import { action } from 'mobx';
import { cn } from '@/lib/utils/stringUtils';
import {
  builderSectionTitleClassNames,
  INTERNAL_SECTION_TYPES,
  OTHER_SECTION_OPTIONS,
} from '@/lib/stores/documentBuilder/documentBuilder.constants';
import { TemplatedSectionType } from '@/lib/types/documentBuilder.types';
import { builderRootStore } from '@/lib/stores/documentBuilder/builderRootStore';

export interface OtherSectionOption
  extends Omit<
    DEX_Section,
    'id' | 'documentId' | 'displayOrder' | 'defaultName'
  > {
  type: TemplatedSectionType;
  icon: LucideIcon;
  containerType: DEX_Item['containerType'];
}

const AddSectionWidget = observer(() => {
  const handleAddSection = action(async (option: OtherSectionOption) => {
    const result = await builderRootStore.sectionStore.addNewSection(option);
    if (result?.itemId) {
      builderRootStore.UIStore.focusFirstFieldInItem(result.itemId);
    }
  });

  return (
    <article className="space-y-2">
      <h3 className={cn(builderSectionTitleClassNames, 'text-2xl')}>
        Add New Section
      </h3>
      <div className="md:grid-cols-2 grid gap-2">
        {OTHER_SECTION_OPTIONS.map((option) => (
          <Button
            variant="ghost"
            disabled={
              option.type !== INTERNAL_SECTION_TYPES.CUSTOM &&
              builderRootStore.sectionStore.sections.some(
                (section) => section.type === option.type,
              )
            }
            onClick={() => handleAddSection(option)}
            key={option.type}
            className="flex items-center justify-start gap-2 px-0 text-base"
          >
            <option.icon />
            {option.title}
          </Button>
        ))}
      </div>
    </article>
  );
});

export default AddSectionWidget;
