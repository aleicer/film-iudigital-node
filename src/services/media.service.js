import { MediaModel } from "../schemas/media.schema.js"

export class MediaService {
  async createMedia(mediaData) {
    try {
      console.log(mediaData)
      const media = new MediaModel(mediaData)
      return await media.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllMedia() {
    try {
      return await MediaModel.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async getMediaById(id) {
    try {
      return await MediaModel.findById(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async updateMedia(id, mediaData) {
    console.log(mediaData)
    try {
      return await MediaModel.findByIdAndUpdate(id, mediaData, { new: true })
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async deleteMedia(id) {
    try {
      return await MediaModel.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
