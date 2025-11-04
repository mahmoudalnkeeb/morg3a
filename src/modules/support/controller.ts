import type { Request, Response } from 'express';

import { CreateFaqFolderDTO } from './dtos/create-faq-folder.dto';
import { CreateFaqQuestionDTO } from './dtos/create-faq-question.dto';
import { CreateSupportTicketDTO } from './dtos/create-support-ticket.dto';
import { UpdateFaqFolderDTO } from './dtos/update-faq-folder.dto';
import { UpdateFaqQuestionDTO } from './dtos/update-faq-question.dto';
import { UpdateSupportTicketDTO } from './dtos/update-support-ticket.dto';
import * as supportService from './service';

import { failResponse, successResponse } from '@/utils/messages';

// Support Tickets
export async function getSupportTickets(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const tickets = await supportService.getSupportTickets(page, limit);
  res.json(successResponse(tickets));
}

export async function getSupportTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const ticket = await supportService.getSupportTicket(id);
  res.json(successResponse(ticket));
}

export async function createSupportTicket(req: Request, res: Response) {
  const data = await CreateSupportTicketDTO.parseAsync(req.body);
  const ticket = await supportService.createSupportTicket(data);
  res.status(201).json(successResponse(ticket));
}

export async function updateSupportTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const data = await UpdateSupportTicketDTO.parseAsync(req.body);
  const ticket = await supportService.updateSupportTicket(id, data);
  res.json(successResponse(ticket));
}

export async function deleteSupportTicket(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const deleted = await supportService.deleteSupportTicket(id);
  res.json(successResponse(deleted));
}

// FAQ Folders
export async function getFaqFolders(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const folders = await supportService.getFaqFolders(page, limit);
  res.json(successResponse(folders));
}

export async function getFaqFolder(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const folder = await supportService.getFaqFolder(id);
  res.json(successResponse(folder));
}

export async function createFaqFolder(req: Request, res: Response) {
  const data = await CreateFaqFolderDTO.parseAsync(req.body);
  const folder = await supportService.createFaqFolder(data);
  res.status(201).json(successResponse(folder));
}

export async function updateFaqFolder(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const data = await UpdateFaqFolderDTO.parseAsync(req.body);
  const folder = await supportService.updateFaqFolder(id, data);
  res.json(successResponse(folder));
}

export async function deleteFaqFolder(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const deleted = await supportService.deleteFaqFolder(id);
  res.json(successResponse(deleted));
}

// FAQ Questions
export async function getFaqQuestions(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const questions = await supportService.getFaqQuestions(page, limit);
  res.json(successResponse(questions));
}

export async function getFaqQuestion(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const question = await supportService.getFaqQuestion(id);
  res.json(successResponse(question));
}

export async function createFaqQuestion(req: Request, res: Response) {
  const data = await CreateFaqQuestionDTO.parseAsync(req.body);
  const question = await supportService.createFaqQuestion(data);
  res.status(201).json(successResponse(question));
}

export async function updateFaqQuestion(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const data = await UpdateFaqQuestionDTO.parseAsync(req.body);
  const question = await supportService.updateFaqQuestion(id, data);
  res.json(successResponse(question));
}

export async function deleteFaqQuestion(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const deleted = await supportService.deleteFaqQuestion(id);
  res.json(successResponse(deleted));
}
