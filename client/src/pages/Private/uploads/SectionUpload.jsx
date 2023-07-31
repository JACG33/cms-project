const SectionUpload = ({ filesContentRef, children }) => {
  return (
    <div className="wrapper__items__upload" ref={filesContentRef}>
      {children}
    </div>
  );
};

export default SectionUpload;
