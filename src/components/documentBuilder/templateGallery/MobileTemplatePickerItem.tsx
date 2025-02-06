'use client';
import { observer } from 'mobx-react-lite';
import { CheckIcon } from 'lucide-react';
import { selectedOptionImageClassNames } from '@/components/appHome/resumeTemplates/resumeTemplates.constants';
import Image from 'next/image';
import { CarouselItem } from '@/components/ui/carousel';
import { builderRootStore } from '@/lib/stores/documentBuilder/builderRootStore';
import { cn } from '@/lib/utils/stringUtils';
import { action } from 'mobx';
import { TemplateOption } from '@/lib/types/documentBuilder.types';

interface MobileTemplatePickerItemProps {
  template: TemplateOption;
}

const MobileTemplatePickerItem = observer(
  ({ template }: MobileTemplatePickerItemProps) => {
    const isSelected =
      builderRootStore.documentStore.document?.templateType === template.value;
    return (
      <CarouselItem className="basis-1/3 sm:basis-1/4 md:basis-1/5 px-1 py-1 pl-4">
        <div
          className={cn(
            'relative aspect-[3/4] cursor-pointer rounded-lg overflow-hidden transition-all border-transparent',
            isSelected && selectedOptionImageClassNames,
          )}
          onClick={action(async () => {
            await builderRootStore.documentStore.changeDocumentTemplateType(
              template.value,
            );
          })}
        >
          <Image
            src={template.image}
            alt={template.name}
            loading="lazy"
            fill
            className="object-cover"
          />
          {isSelected && (
            <span className="bg-primary text-primary-foreground dark:bg-background dark:text-foreground top-1/2 left-1/2 absolute flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full">
              <CheckIcon />
            </span>
          )}
          <div className="bg-gradient-to-t from-black/90 to-transparent absolute inset-x-0 bottom-0 p-2">
            <p className="text-xs font-medium text-center text-white">
              {template.name}
            </p>
          </div>
        </div>
      </CarouselItem>
    );
  },
);

export default MobileTemplatePickerItem;
