import { onMounted, ref } from 'vue'

export function useDeviceDetect() {
  const deviceType = ref('unknown')

  const detectDevice = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    if (/android/i.test(ua))
      deviceType.value = 'Android'
    else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream)
      deviceType.value = 'iOS'
    else if (/Win(dows)?( Phone)?/.test(ua))
      deviceType.value = 'Windows'
    else if (/Mac(intosh)?/.test(ua))
      deviceType.value = 'MacOS'
    else if (/Linux/.test(ua))
      deviceType.value = 'Linux'
    else
      deviceType.value = 'PC'
  }

  onMounted(() => {
    detectDevice()
  })

  return {
    deviceType,
  }
}
