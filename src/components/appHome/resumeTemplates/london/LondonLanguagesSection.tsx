import { TemplateDataSection } from '@/lib/types/documentBuilder.types';
import { LONDON_FONT_SIZE, londonTemplateStyles } from './london.styles';
import ResumeLanguagesSection from '../shared/ResumeLanguagesSection';

const LondonLanguagesSection = ({
  section,
}: {
  section: TemplateDataSection;
}) => {
  return (
    <ResumeLanguagesSection
      fontSize={LONDON_FONT_SIZE}
      section={section}
      styles={londonTemplateStyles}
    />
  );
};

export default LondonLanguagesSection;
