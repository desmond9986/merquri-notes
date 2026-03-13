import Toast from 'react-native-root-toast'

/**
 * 
 * @param message The message to be displayed in the toast notification.
 * @returns void
 * 
 * This function displays a toast notification with the provided message. The toast will appear at the bottom of the screen, with a short duration, shadow, and animation. It will also hide when pressed.
 */
export const showToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
  })
}