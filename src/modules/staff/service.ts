import type { CreateStaffDTO } from './dtos/create-staff.dto';
import { type UpdateStaffDTO } from './dtos/update-staff.dto';
import { createStaffRepository } from './repository';

import { db } from '@/db';
import { NotFoundError } from '@/utils/errors';

const staffRepo = createStaffRepository(db);

export async function getStaff(page = 1, limit = 10) {
  return staffRepo.getStaff(page, limit);
}

export async function getStaffMember(id: number) {
  const staffMember = await staffRepo.getStaffMember(id);
  if (!staffMember) throw new NotFoundError('Staff member not found');
  return staffMember;
}

export async function createStaff(data: CreateStaffDTO) {
  const newStaff = await staffRepo.createStaff(data);
  return newStaff;
}

export async function updateStaff(id: number, data: UpdateStaffDTO) {
  const existing = await staffRepo.getStaffMember(id);
  if (!existing) throw new NotFoundError('Staff member not found');

  const updated = await staffRepo.updateStaff(id, data);
  return updated;
}

export async function deleteStaff(id: number) {
  const existing = await staffRepo.getStaffMember(id);
  if (!existing) throw new NotFoundError('Staff member not found');

  const deleted = await staffRepo.deleteStaff(id);
  return deleted;
}
