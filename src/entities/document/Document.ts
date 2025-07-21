import { BaseEntity } from '../BaseEntity';

export class Document extends BaseEntity {
  documentId!: number;
  title!: string;
  documentType!: string;
}

export class DocumentContent extends BaseEntity {
  documentId!: number;
  content!: string;
  contentType!: string;
} 