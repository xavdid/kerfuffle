import Movie from '../components/Movie'
import MediaBox from './MediaBox'

export default class MovieBox extends MediaBox {
  setup() {
    this.mediaType = 'movies'
    this.component = Movie
  }
}
