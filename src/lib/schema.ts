import { FieldName, SectionType, SelectType } from '@/lib/types';

type IdType = number;

export interface DEX_Document {
  id: IdType;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface DEX_Section {
  id: IdType;
  documentId: IdType;
  title: string;
  defaultTitle: string;
  type: SectionType;
  displayOrder: number;
  metadata?: string;
}

export interface DEX_Item {
  id: IdType;
  sectionId: IdType;
  containerType: 'collapsible' | 'static';
  displayOrder: number;
}

interface BaseFieldProps {
  id: IdType;
  itemId: IdType;
  name: FieldName;
}

interface StringField extends BaseFieldProps {
  type: 'string';
  value: string;
}

interface TextareaField extends BaseFieldProps {
  type: 'textarea';
  value: string;
}

interface RichTextField extends BaseFieldProps {
  type: 'rich-text';
  value: 'string';
}

interface DateMonthField extends BaseFieldProps {
  type: 'date-month';
  value: string;
}

export interface SelectField extends BaseFieldProps {
  type: 'select';
  selectType: SelectType;
  value: string;
  options: string[];
}

export const FIELD_TYPES = {
  STRING: 'string',
  RICH_TEXT: 'rich-text',
  DATE_MONTH: 'date-month',
  SELECT: 'select',
  TEXTAREA: 'textarea',
} as const;

export const CONTAINER_TYPES = {
  STATIC: 'static',
  COLLAPSIBLE: 'collapsible',
} as const;

export type DEX_Field =
  | StringField
  | DateMonthField
  | SelectField
  | RichTextField
  | TextareaField;
