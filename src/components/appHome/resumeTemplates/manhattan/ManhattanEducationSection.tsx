import { Text, View } from '@react-pdf/renderer';
import { manhattanTemplateStyles } from './manhattan.styles';
import { TemplateDataSection } from '@/lib/types/documentBuilder.types';
import { getEducationSectionEntries } from '@/components/appHome/resumeTemplates/resumeTemplates.helpers';
import ManhattanSectionEntry from './ManhattanSectionEntry';

const ManhattanEducationSection = ({
  section,
}: {
  section: TemplateDataSection;
}) => {
  const sectionEntries = getEducationSectionEntries(section);
  if (!sectionEntries.length) return null;

  return (
    <View style={manhattanTemplateStyles.section}>
      <Text style={manhattanTemplateStyles.sectionLabel}>{section.title}</Text>
      <View style={{ gap: 15 }}>
        {sectionEntries.map((entry) => (
          <ManhattanSectionEntry
            entry={entry}
            key={entry.entryId}
            subtitleKey="school"
            titleKey="degree"
          />
        ))}
      </View>
    </View>
  );
};

export default ManhattanEducationSection;
