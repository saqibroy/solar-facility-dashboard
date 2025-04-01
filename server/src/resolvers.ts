import { Types } from 'mongoose'
import { Resolvers } from './types'
import { generateToken } from './utils/auth.js'

const resolvers: Resolvers = {
  Query: {
    facilities: async (_, __, { models, user }) => {
      try {
        if (!user) throw new Error('Authentication required')
        return await models.Facility.find().lean({ virtuals: true })
      } catch (error) {
        console.error('Error fetching facilities:', error)
        throw new Error('Failed to fetch facilities')
      }
    },
    performanceData: async (_, { facilityId }, { models, user }) => {
      try {
        if (!user) throw new Error('Authentication required')
        return await models.PerformanceData.find({
          facilityId: new Types.ObjectId(facilityId)
        }).lean()
      } catch (error) {
        console.error('Error fetching performance data:', error)
        throw new Error('Failed to fetch performance data')
      }
    },
    me: async (_, __, { user }) => {
      try {
        return user
      } catch (error) {
        console.error('Error fetching user:', error)
        throw new Error('Failed to fetch user data')
      }
    }
  },
  Mutation: {
    createFacility: async (_, { name, nominalPower }, { models, user }) => {
      try {
        if (!user) throw new Error('Authentication required')
        const facility = new models.Facility({ name, nominalPower })
        await facility.save()
        return facility.toObject()
      } catch (error) {
        console.error('Error creating facility:', error)
        throw new Error('Failed to create facility')
      }
    },
    updateFacility: async (_, { id, name, nominalPower }, { models, user }) => {
      try {
        if (!user) throw new Error('Authentication required')
        
        const updates: { name?: string | null; nominalPower?: number | null } = {}
        
        if (name !== undefined) {
          updates.name = name
        }
        
        if (nominalPower !== undefined) {
          updates.nominalPower = nominalPower
        }
    
        const updatedFacility = await models.Facility.findByIdAndUpdate(
          id,
          updates,
          { new: true }
        ).lean()
    
        if (!updatedFacility) {
          throw new Error('Facility not found')
        }
    
        return updatedFacility
      } catch (error) {
        console.error('Error updating facility:', error)
        throw new Error(error instanceof Error ? error.message : 'Failed to update facility')
      }
    },
    deleteFacility: async (_, { id }, { models, user }) => {
      try {
        if (!user) throw new Error('Authentication required')
        await models.Facility.findByIdAndDelete(id)
        await models.PerformanceData.deleteMany({
          facilityId: new Types.ObjectId(id)
        })
        return true
      } catch (error) {
        console.error('Error deleting facility:', error)
        throw new Error('Failed to delete facility')
      }
    },
    signUp: async (_, { username, password }, { models }) => {
      try {
        const existingUser = await models.User.findOne({ username })
        if (existingUser) {
          throw new Error('Username already exists')
        }

        const user = new models.User({ username, password })
        await user.save()

        const token = generateToken(user.id)

        return {
          token,
          user: user.toObject()
        }
      } catch (error) {
        console.error('Error during sign up:', error)
        throw new Error(error instanceof Error ? error.message : 'Failed to sign up')
      }
    },
    signIn: async (_, { username, password }, { models }) => {
      try {
        const user = await models.User.findOne({ username })
        if (!user) {
          throw new Error('Invalid credentials')
        }

        const isValid = await user.comparePassword(password)
        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        const token = generateToken(user.id)

        return {
          token,
          user: user.toObject()
        }
      } catch (error) {
        console.error('Error during sign in:', error)
        throw new Error('Failed to sign in')
      }
    }
  },
  Facility: {
    id: facility => (facility._id ? facility._id.toString() : facility.id)
  },
  PerformanceData: {
    id: data => (data._id ? data._id.toString() : data.id),
    timestamp: data => data.timestamp.toISOString()
  }
}

export default resolvers
