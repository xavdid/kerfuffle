import {
  AirtableRecord,
  ABookFields,
  ABook,
  MediaType,
  AMovieFields,
  AMovie
} from '../../server/services/interfaces'

export default class MediaItem {
  mediaType: MediaType
  record: AirtableRecord

  constructor(raw: AirtableRecord, mediaType: MediaType) {
    this.mediaType = mediaType
    this.record = raw
  }

  // the external id
  public get extid(): string {
    if (this.mediaType === 'books') {
      return (this.record as ABook).fields[ABookFields.gbid]
    } else if (this.mediaType === 'movies') {
      return (this.record as AMovie).fields[AMovieFields.tmdbId]
    } else {
      return 'tv'
    }
  }
}
