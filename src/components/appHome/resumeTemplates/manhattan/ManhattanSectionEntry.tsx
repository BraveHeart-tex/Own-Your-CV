import { WithEntryId } from '@/lib/types/documentBuilder.types';
import { Text, View } from '@react-pdf/renderer';
import { MANHATTAN_FONT_SIZE } from './manhattan.styles';
import { pdfHtmlRenderers } from '../resumeTemplates.constants';
import { Html } from 'react-pdf-html';

interface ManhattanSectionEntryProps<T extends Record<string, string>> {
  entry: WithEntryId<T>;
  titleKey: keyof T;
  subtitleKey: keyof T;
}

const ManhattanSectionEntry = <T extends Record<string, string>>({
  entry,
  titleKey,
  subtitleKey,
}: ManhattanSectionEntryProps<T>) => {
  return (
    <View key={entry.entryId}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: MANHATTAN_FONT_SIZE, fontWeight: 'bold' }}>
            {entry[titleKey]}
          </Text>
          <Text style={{ fontSize: MANHATTAN_FONT_SIZE }}>
            {entry[subtitleKey]}
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Text style={{ fontSize: MANHATTAN_FONT_SIZE, fontWeight: 'bold' }}>
            {entry.startDate} - {entry.endDate}
          </Text>
          <Text style={{ fontSize: MANHATTAN_FONT_SIZE }}>{entry.city}</Text>
        </View>
      </View>

      {entry.description && (
        <View style={{ marginTop: 0 }}>
          <Html
            style={{ fontSize: MANHATTAN_FONT_SIZE }}
            renderers={pdfHtmlRenderers}
          >
            {entry.description}
          </Html>
        </View>
      )}
    </View>
  );
};
export default ManhattanSectionEntry;
