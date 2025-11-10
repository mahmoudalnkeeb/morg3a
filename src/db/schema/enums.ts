import { pgEnum } from 'drizzle-orm/pg-core';

export const staffRoleEnum = pgEnum('staff_role', ['teacher', 'support_agent', 'admin']);
export const documentTypeEnum = pgEnum('document_type', ['lesson', 'mozakra', 'mol5as']);
export const documentMimeTypeEnum = pgEnum('document_mime_type', [
  // pdf
  'application/pdf',

  //  word
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  // excel
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  // powerPoint
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
]);

export const ticketStatusEnum = pgEnum('ticket_status', [
  'open',
  'in_progress',
  'closed',
]);
export const ticketCategoryEnum = pgEnum('ticket_category', [
  'technical',
  'payment',
  'general',
]);
export const userTypeEnum = pgEnum('user_type', ['staff', 'student']);
