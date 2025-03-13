const useColor = () => {
  const brandPrimary = '#7A599C'
  const brandPrimaryRGB = (opacity: number) => `rgba(122, 89, 156, ${opacity})`
  const brandPrimaryTap = '#9B79BD'
  const brandPrimaryTapRGB = (opacity: number) => `rgba(155, 121, 189, ${opacity})`
  const brandPrimaryDark = "#33194E"
  const redError = "#FE5E5E"
  const orange = "#FEB05E"
  const violet = "#653E8D"

  return {
    brandPrimary,
    brandPrimaryTap,
    brandPrimaryRGB,
    brandPrimaryDark,
    brandPrimaryTapRGB,
    redError,
    orange,
    violet
  }
}

export default useColor