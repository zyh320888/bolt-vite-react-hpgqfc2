export type NotificationStatus = 'granted' | 'denied' | 'default';

export async function checkNotificationPermission(): Promise<NotificationStatus> {
  if ('Notification' in window) {
    return await Notification.permission as NotificationStatus;
  }
  return 'default';
}

export async function requestNotificationPermission(): Promise<NotificationStatus> {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission as NotificationStatus;
  }
  return 'default';
}

export function showNotification(title: string, body: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/notification-icon.png'
    });
  }
}

export function openNotificationSettings() {
  const userAgent = navigator.userAgent.toLowerCase();
  let settingsURL: string;

  if (userAgent.indexOf('firefox') > -1) {
    settingsURL = 'about:preferences#privacy';
  } else if (userAgent.indexOf('edg/') > -1) {
    settingsURL = 'edge://settings/content/notifications';
  } else if (userAgent.indexOf('chrome') > -1) {
    settingsURL = 'chrome://settings/content/notifications';
  } else if (userAgent.indexOf('safari') > -1) {
    settingsURL = 'safari://settings/websites';
  } else {
    settingsURL = 'https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DDesktop&hl=en';
  }

  const newWindow = window.open(settingsURL, '_blank');

  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    alert('无法自动打开浏览器设置。请手动打开浏览器设置并导航到通知部分来更改您的偏好。');
  }
}