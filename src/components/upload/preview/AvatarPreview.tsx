import Image from "../../image";

interface AvatarPreviewProps {
  file: any; //string or object
}

export default function AvatarPreview({ file }: AvatarPreviewProps) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === "string" ? file : file.preview;

  return (
    <Image
      alt="avatar"
      src={imgUrl}
      sx={{
        zIndex: 8,
        overflow: "hidden",
        borderRadius: "50%",
        position: "absolute",
        width: `calc(100% - 16px)`,
        height: `calc(100% - 16px)`,
      }}
    />
  );
}
