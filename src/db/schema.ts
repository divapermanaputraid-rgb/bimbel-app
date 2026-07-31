import { pgTable, uuid, text, integer, timestamp, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// We reference the existing users table from public schema
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
  nama: text('nama').notNull(),
  role: text('role').notNull(),
  kelas: integer('kelas'),
  level: integer('level').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Roadmap Templates (Guru buat 1x per semester)
export const roadmapTemplates = pgTable('roadmap_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  guruId: uuid('guru_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  kelas: integer('kelas').notNull(),
  subjectId: text('subject_id').notNull(),
  semester: text('semester').notNull(),
  title: text('title'),
  totalPertemuan: integer('total_pertemuan').default(0),
  status: text('status').default('active'), // active, draft, archived
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Template Items (Materi per pertemuan)
export const templateItems = pgTable('template_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id').notNull().references(() => roadmapTemplates.id, { onDelete: 'cascade' }),
  pertemuanKe: integer('pertemuan_ke').notNull(),
  unitId: text('unit_id').notNull(),
  unitTitle: text('unit_title').notNull(),
  babId: integer('bab_id').notNull(),
  urutan: integer('urutan').notNull(),
  tipe: text('tipe').default('baru'), // baru, review
  reviewFromPertemuan: integer('review_from_pertemuan'),
  catatanGuru: text('catatan_guru'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Pertemuan Schedule (Jadwal aktual per kelas)
export const pertemuanSchedule = pgTable('pertemuan_schedule', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id').notNull().references(() => roadmapTemplates.id, { onDelete: 'cascade' }),
  pertemuanKe: integer('pertemuan_ke').notNull(),
  tanggalRencana: date('tanggal_rencana'),
  tanggalAktual: date('tanggal_aktual'),
  status: text('status').default('terjadwal'), // terjadwal, selesai, libur
  catatan: text('catatan'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Relations (Biar query pake Prisma-like syntax gampang)
export const roadmapTemplatesRelations = relations(roadmapTemplates, ({ one, many }) => ({
  guru: one(users, {
    fields: [roadmapTemplates.guruId],
    references: [users.id],
  }),
  items: many(templateItems),
  schedules: many(pertemuanSchedule),
}));

export const templateItemsRelations = relations(templateItems, ({ one }) => ({
  template: one(roadmapTemplates, {
    fields: [templateItems.templateId],
    references: [roadmapTemplates.id],
  }),
}));

export const pertemuanScheduleRelations = relations(pertemuanSchedule, ({ one }) => ({
  template: one(roadmapTemplates, {
    fields: [pertemuanSchedule.templateId],
    references: [roadmapTemplates.id],
  }),
}));
