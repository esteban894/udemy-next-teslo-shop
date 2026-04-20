import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
  onMouseEnter,
  onMouseLeave,
  loading = "eager",
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      loading={loading}
    />
  );
};
