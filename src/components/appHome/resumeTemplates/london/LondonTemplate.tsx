import { Document, Page } from '@react-pdf/renderer';
import LondonPersonalDetailsSection from '@/components/appHome/resumeTemplates/london/LondonPersonalDetailsSection';
import LondonSummarySection from '@/components/appHome/resumeTemplates/london/London.SummarySection';
import { londonTemplateStyles } from '@/components/appHome/resumeTemplates/london/london.styles';
import LondonWorkExperienceSection from '@/components/appHome/resumeTemplates/london/LondonWorkExperienceSection';
import LondonEducationSection from '@/components/appHome/resumeTemplates/london/LondonEducationSection';
import LondonLinksSection from '@/components/appHome/resumeTemplates/london/LondonLinksSection';
import LondonLanguagesSection from '@/components/appHome/resumeTemplates/london/LondonLanguagesSection';
import LondonInternshipsSection from '@/components/appHome/resumeTemplates/london/LondonInternshipsSection';
import LondonCoursesSection from '@/components/appHome/resumeTemplates/london/LondonCoursesSection';
import LondonHobbiesSection from '@/components/appHome/resumeTemplates/london/LondonHobbiesSection';
import LondonCustomSection from '@/components/appHome/resumeTemplates/london/LondonCustomSection';
import LondonSkillsSection from '@/components/appHome/resumeTemplates/london/LondonSkillsSection';
import LondonReferencesSection from '@/components/appHome/resumeTemplates/london/LondonReferencesSection';
import { INTERNAL_SECTION_TYPES } from '@/lib/stores/documentBuilder/documentBuilder.constants';
import { PdfTemplateData } from '@/lib/types/documentBuilder.types';

const LondonTemplate = ({
  templateData,
}: {
  templateData: PdfTemplateData;
}) => {
  const { personalDetails, summarySection } = templateData;

  const renderSections = () => {
    return templateData.sections.map((section) => {
      if (section.type === INTERNAL_SECTION_TYPES.WORK_EXPERIENCE) {
        return (
          <LondonWorkExperienceSection section={section} key={section.id} />
        );
      }

      if (section.type === INTERNAL_SECTION_TYPES.EDUCATION) {
        return <LondonEducationSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.WEBSITES_SOCIAL_LINKS) {
        return <LondonLinksSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.LANGUAGES) {
        return <LondonLanguagesSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.INTERNSHIPS) {
        return <LondonInternshipsSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.COURSES) {
        return <LondonCoursesSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.HOBBIES) {
        return <LondonHobbiesSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.CUSTOM) {
        return <LondonCustomSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.SKILLS) {
        return <LondonSkillsSection section={section} key={section.id} />;
      }

      if (section.type === INTERNAL_SECTION_TYPES.REFERENCES) {
        return <LondonReferencesSection section={section} key={section.id} />;
      }

      return null;
    });
  };

  return (
    <Document>
      <Page size="A4" style={londonTemplateStyles.page}>
        <LondonPersonalDetailsSection personalDetails={personalDetails} />
        <LondonSummarySection summarySection={summarySection} />
        {renderSections()}
      </Page>
    </Document>
  );
};

export default LondonTemplate;
