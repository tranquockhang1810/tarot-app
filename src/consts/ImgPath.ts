const genAssetsLink = (link: string) => {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT + link}`
}

export const LOGIN_BACKGROUND_VIDEO = genAssetsLink("/card/background.mp4");
export const AVARTAR_IMAGE = genAssetsLink("/card/avatar.png")
export const CARD_BACKGROUND = genAssetsLink("/card/card-background.jpg")