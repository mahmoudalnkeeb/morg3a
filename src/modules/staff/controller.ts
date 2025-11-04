import type { Request, Response } from 'express';

import { CreateStaffDTO } from './dtos/create-staff.dto';
import { UpdateStaffDTO } from './dtos/update-staff.dto';
import * as staffService from './service';

import { failResponse, successResponse } from '@/utils/messages';

export async function getStaff(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const staff = await staffService.getStaff(page, limit);
  res.json(successResponse(staff));
}

export async function getStaffMember(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const staffMember = await staffService.getStaffMember(id);
  res.json(successResponse(staffMember));
}

export async function createStaff(req: Request, res: Response) {
  const data = await CreateStaffDTO.parseAsync(req.body);
  const staffMember = await staffService.createStaff(data);
  res.status(201).json(successResponse(staffMember));
}

export async function updateStaff(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const data = await UpdateStaffDTO.parseAsync(req.body);
  const staffMember = await staffService.updateStaff(id, data);
  res.json(successResponse(staffMember));
}

export async function deleteStaff(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const deleted = await staffService.deleteStaff(id);
  res.json(successResponse(deleted));
}
