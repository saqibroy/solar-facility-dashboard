import { Schema, model } from 'mongoose'
import { BaseDocument } from './BaseDocument'

export interface IFacility extends BaseDocument {
  name: string
  nominalPower: number
}

const FacilitySchema = new Schema<IFacility>({
  name: { type: String, required: true },
  nominalPower: { type: Number, required: true }
})

// adds runtime behavior
FacilitySchema.virtual('id').get(function () {
  return this._id.toString()
})

// Required to include virtuals in queries
FacilitySchema.set('toJSON', { virtuals: true })
FacilitySchema.set('toObject', { virtuals: true })

export const Facility = model<IFacility>('Facility', FacilitySchema)
