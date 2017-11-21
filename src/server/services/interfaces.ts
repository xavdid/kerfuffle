export interface Book {
  id: string
  fields: {
    Author: string[]
    Style: string
    'Book Name': string
    'Year Published': number
    'Google Books ID': string
  }
}

export enum BookFields {
  title = 'Book Name',
  year = 'Year Published',
  gbid = 'Google Books ID'
}
