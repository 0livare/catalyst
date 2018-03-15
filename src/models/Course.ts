export type ICourse = {
  id: string,
  title: string,
  watchUrl: string,
  authorId: string,
  length: number,
  category: string,
}

export const Course: ICourse = createCourseWithId('')

export function createCourseWithId(id: string): ICourse {
  return {
    id,
    title: '',
    watchUrl: '',
    authorId: '',
    length: 4444,
    category: '',
  }
}