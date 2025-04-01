import { Types } from 'mongoose'
import fs from 'fs'
import csv from 'csv-parser'

interface PerformanceDataRecord {
  timestamp: Date
  activePower: number
  energy: number
  facilityId: Types.ObjectId
}

export const parseCsv = async (
  filePath: string,
  facilityId: Types.ObjectId
): Promise<PerformanceDataRecord[]> => {
  return new Promise((resolve, reject) => {
    const results: PerformanceDataRecord[] = []

    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim().toLowerCase(),
          mapValues: ({ value }) => value.trim()
        })
      )
      .on('data', data => {
        if (!data.timestamp || !data.active_power_kw || !data.energy_kwh) {
          throw new Error('CSV file missing required columns')
        }

        const timestamp = new Date(data.timestamp)
        const activePower = parseFloat(data.active_power_kw)
        const energy = parseFloat(data.energy_kwh)

        if (isNaN(timestamp.getTime()) || isNaN(activePower) || isNaN(energy)) {
          throw new Error('Invalid data format')
        }

        results.push({ timestamp, activePower, energy, facilityId })
      })
      .on('end', () => resolve(results))
      .on('error', error => reject(error))
  })
}
