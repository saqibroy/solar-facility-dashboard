import { Schema, model, Types } from 'mongoose'
import { BaseDocument } from './BaseDocument'

export interface IPerformanceData extends BaseDocument {
  timestamp: Date
  activePower: number
  energy: number
  facilityId: Types.ObjectId
  facilityId_string?: string
}

const PerformanceDataSchema = new Schema<IPerformanceData>({
  timestamp: { type: Date, required: true },
  activePower: { type: Number, required: true },
  energy: { type: Number, required: true },
  facilityId: { type: Schema.Types.ObjectId, ref: 'Facility', required: true }
})

// Virtual for document ID
PerformanceDataSchema.virtual('id').get(function () {
  return this._id.toString()
})

// Virtual for facilityId string conversion
PerformanceDataSchema.virtual('facilityId_string').get(function () {
  return this.facilityId.toString()
})

// Include virtuals in output
PerformanceDataSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    ret.facilityId = ret.facilityId.toString()
    delete ret._id
    return ret
  }
})

PerformanceDataSchema.set('toObject', { virtuals: true })

export const PerformanceData = model<IPerformanceData>('PerformanceData', PerformanceDataSchema)
