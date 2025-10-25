import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CreateStaffDTO } from "./dtos/create-staff.dto";
import { StaffDTO } from "./dtos/staff.dto";
import { eq } from "drizzle-orm";
import { staff } from "@/db/schema";
import { UpdateStaffDTO } from "./dtos/update-staff.dto";

export function createStaffRepository(db: NodePgDatabase) {
  async function getStaff(page = 1, limit = 10): Promise<StaffDTO[]> {
    const result: StaffDTO[] = await db
      .select()
      .from(staff)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getStaffMember(id: number): Promise<StaffDTO | null> {
    const staffMember: StaffDTO[] = await db
      .select()
      .from(staff)
      .where(eq(staff.id, id))
      .execute();

    return staffMember[0] || null;
  }

  async function createStaff(data: CreateStaffDTO): Promise<StaffDTO> {
    const staffMember: StaffDTO[] = await db
      .insert(staff)
      .values(data)
      .returning();

    return staffMember[0];
  }

  async function updateStaff(
    id: number,
    data: UpdateStaffDTO,
  ): Promise<StaffDTO> {
    const staffMember: StaffDTO[] = await db
      .update(staff)
      .set(data)
      .where(eq(staff.id, id))
      .returning();

    return staffMember[0];
  }

  async function deleteStaff(id: number): Promise<StaffDTO> {
    const staffMember: StaffDTO[] = await db
      .delete(staff)
      .where(eq(staff.id, id))
      .returning();

    return staffMember[0];
  }

  return {
    getStaff,
    getStaffMember,
    createStaff,
    updateStaff,
    deleteStaff,
  };
}
