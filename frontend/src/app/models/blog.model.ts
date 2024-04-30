export interface Blog {
  id?: number,
  title: string,
  description: string,
  image: string,
  data: string,
  endDate: Date,
  modificationDate?: Date,
  published: boolean
}
