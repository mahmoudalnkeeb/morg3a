import { db } from "@/db";
import { createSupportRepository } from "./repository";
import type { CreateSupportTicketDTO } from "./dtos/create-support-ticket.dto";
import type { CreateFaqFolderDTO } from "./dtos/create-faq-folder.dto";
import type { CreateFaqQuestionDTO } from "./dtos/create-faq-question.dto";
import { UpdateSupportTicketDTO } from "./dtos/update-support-ticket.dto";
import { UpdateFaqFolderDTO } from "./dtos/update-faq-folder.dto";
import { UpdateFaqQuestionDTO } from "./dtos/update-faq-question.dto";
import { NotFoundError } from "@/utils/errors";

const supportRepo = createSupportRepository(db);

// Support Tickets
export async function getSupportTickets(page = 1, limit = 10) {
  return supportRepo.getSupportTickets(page, limit);
}

export async function getSupportTicket(id: number) {
  const ticket = await supportRepo.getSupportTicket(id);
  if (!ticket) throw new NotFoundError("Support ticket not found");
  return ticket;
}

export async function createSupportTicket(data: CreateSupportTicketDTO) {
  const newTicket = await supportRepo.createSupportTicket(data);
  return newTicket;
}

export async function updateSupportTicket(id: number, data: UpdateSupportTicketDTO) {
  const existing = await supportRepo.getSupportTicket(id);
  if (!existing) throw new NotFoundError("Support ticket not found");

  const updated = await supportRepo.updateSupportTicket(id, data);
  return updated;
}

export async function deleteSupportTicket(id: number) {
  const existing = await supportRepo.getSupportTicket(id);
  if (!existing) throw new NotFoundError("Support ticket not found");

  const deleted = await supportRepo.deleteSupportTicket(id);
  return deleted;
}

// FAQ Folders
export async function getFaqFolders(page = 1, limit = 10) {
  return supportRepo.getFaqFolders(page, limit);
}

export async function getFaqFolder(id: number) {
  const folder = await supportRepo.getFaqFolder(id);
  if (!folder) throw new NotFoundError("FAQ folder not found");
  return folder;
}

export async function createFaqFolder(data: CreateFaqFolderDTO) {
  const newFolder = await supportRepo.createFaqFolder(data);
  return newFolder;
}

export async function updateFaqFolder(id: number, data: UpdateFaqFolderDTO) {
  const existing = await supportRepo.getFaqFolder(id);
  if (!existing) throw new NotFoundError("FAQ folder not found");

  const updated = await supportRepo.updateFaqFolder(id, data);
  return updated;
}

export async function deleteFaqFolder(id: number) {
  const existing = await supportRepo.getFaqFolder(id);
  if (!existing) throw new NotFoundError("FAQ folder not found");

  const deleted = await supportRepo.deleteFaqFolder(id);
  return deleted;
}

// FAQ Questions
export async function getFaqQuestions(page = 1, limit = 10) {
  return supportRepo.getFaqQuestions(page, limit);
}

export async function getFaqQuestion(id: number) {
  const question = await supportRepo.getFaqQuestion(id);
  if (!question) throw new NotFoundError("FAQ question not found");
  return question;
}

export async function createFaqQuestion(data: CreateFaqQuestionDTO) {
  const newQuestion = await supportRepo.createFaqQuestion(data);
  return newQuestion;
}

export async function updateFaqQuestion(id: number, data: UpdateFaqQuestionDTO) {
  const existing = await supportRepo.getFaqQuestion(id);
  if (!existing) throw new NotFoundError("FAQ question not found");

  const updated = await supportRepo.updateFaqQuestion(id, data);
  return updated;
}

export async function deleteFaqQuestion(id: number) {
  const existing = await supportRepo.getFaqQuestion(id);
  if (!existing) throw new NotFoundError("FAQ question not found");

  const deleted = await supportRepo.deleteFaqQuestion(id);
  return deleted;
}
