import { Facility } from './models/Facility'
import { PerformanceData } from './models/PerformanceData'
import { IUser, User } from './models/User'

export interface MyContext {
  models: {
    Facility: typeof Facility
    PerformanceData: typeof PerformanceData
    User: typeof User
  }
  user: IUser | null
}
