export const SliceText = (text,length=7) => {
  let ext = text.split(".").pop();
  let textreduce = text.slice(0, length);
  return `${textreduce}[...].${ext}`;
};
