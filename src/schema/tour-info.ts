import { z } from 'zod'

const pricingOptionSchema = z.object({
  name: z.string(),
  copy: z.array(z.string()),
  price: z.number(),
})

const itineraryItemSchema = z.object({
  day: z.number(),
  title: z.string(),
  description: z.array(z.string()),
})

export const tourInfoSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  currentlyOffered: z.boolean(),
  days: z.number(),
  loop: z.boolean(),
  distance: z.number(),
  pricingOptions: z.array(pricingOptionSchema),
  coverImage: z.string(),
  hook: z.string(),
  copy: z.array(z.string()),
  itinerary: z.array(itineraryItemSchema),
})
