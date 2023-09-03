import { tourInfoSchema } from '@/src/schema/TourInfo'
import { z } from 'zod'

export type ToursInfo = z.infer<typeof tourInfoSchema>
