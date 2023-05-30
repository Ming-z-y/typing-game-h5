import { FC, createRef, useEffect } from "react";

interface ClipItem {
  title: string;
}

export const ClipItem: FC<ClipItem> = (props: ClipItem) => {
  const { title } = props;
  const itemRef = createRef<HTMLDivElement>();
  const classes = ["left", "middle", "right"];
  const index = Math.floor(Math.random() * 10) % 3;
  useEffect(() => {
    itemRef.current?.classList.add(classes[index]);
    setTimeout(() => {
      itemRef.current?.classList.add("bottom");
    }, 50);
  }, []);
  return (
    <div className="clipItem" ref={itemRef}>
      {title}
    </div>
  );
};
