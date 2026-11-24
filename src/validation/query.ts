import { z } from 'zod';
export const querySchema = z.object({
 text: z.string().trim().min(2, 'Escribí al menos 2 caracteres o la palabra todas.').max(40, 'Usá como máximo 40 caracteres.'),
 filter: z.enum(['all', 'marked'], {error: 'Elegí Todas o Solo marcadas.'})
});
export type Query = z.infer<typeof querySchema>;
