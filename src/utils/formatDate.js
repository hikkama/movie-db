import { format } from 'date-fns'

export default function formatDate(date) {
  if (!date) {
    return null
  }

  const splittedDate = date.split('-')
  const [year, month, day] = splittedDate
  const formatedDate = format(new Date(year, month, day), 'PPP')

  return formatedDate.replace(/\w\w,/g, ',')
}
