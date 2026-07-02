import { Image, ImageProps } from "react-native";

export default function AppImage(props: ImageProps) {
  return (
    <Image
      resizeMode="cover"
      {...props}
    />
  );
}