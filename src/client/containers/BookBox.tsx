import Book from '../components/Book'
import MediaBox from './MediaBox'

export default class BookBox extends MediaBox {
  setup() {
    this.mediaType = 'books'
    this.component = Book
  }
}
