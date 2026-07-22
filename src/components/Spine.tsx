interface SpineProps {
  color: string;
}

export function Spine({ color }: SpineProps) {
  return <span className="spine" style={{ ["--spine" as string]: color }} />;
}
