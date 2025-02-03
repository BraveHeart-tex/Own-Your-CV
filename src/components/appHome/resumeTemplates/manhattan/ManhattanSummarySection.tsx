import {
  MANHATTAN_FONT_SIZE,
  manhattanTemplateStyles,
} from './manhattan.styles';
import { Text, View } from '@react-pdf/renderer';
import { PdfTemplateData } from '@/lib/types/documentBuilder.types';
import Html from 'react-pdf-html';
import { pdfHtmlRenderers } from '@/components/appHome/resumeTemplates/resumeTemplates.constants';

const ManhattanSummarySection = ({
  summarySection,
}: {
  summarySection: PdfTemplateData['summarySection'];
}) => {
  if (!summarySection?.summary) return null;

  return (
    <View style={manhattanTemplateStyles.section}>
      <Text style={manhattanTemplateStyles.sectionLabel}>
        {summarySection.sectionName}
      </Text>
      <View
        style={{
          marginTop: 2,
        }}
      >
        <Html
          style={{ fontSize: MANHATTAN_FONT_SIZE }}
          renderers={pdfHtmlRenderers}
        >
          {summarySection.summary}
        </Html>
      </View>
    </View>
  );
};

export default ManhattanSummarySection;
