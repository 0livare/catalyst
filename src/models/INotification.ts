import {OptionsObject, VariantType} from 'notistack'

export type INotification = {
  key: number,
  message: string,
  options?: OptionsObject,
}

export const createNotification = (
  message: string,
  options?: VariantType | OptionsObject,
): INotification => {
  let notifOptions: OptionsObject = typeof options === 'string'
    ? {variant: options as VariantType}
    : options

  return {
    key: new Date().getTime() + Math.random(),
    message,
    options: notifOptions,
  }
}
