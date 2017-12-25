import Show from '../components/Show'
import MediaBox from './MediaBox'

export default class MovieBox extends MediaBox {
  setup() {
    this.mediaType = 'shows'
    this.component = Show
  }
}
