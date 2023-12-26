import { tourInfoSchema } from '@/src/schema/tour-info'
import { z } from 'zod'

export type TourInfo = z.infer<typeof tourInfoSchema>
