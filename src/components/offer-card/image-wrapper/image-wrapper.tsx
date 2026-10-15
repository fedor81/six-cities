type ImageWrapperProps = {
  link: JSX.Element;
};

function ImageWrapper({ link }: ImageWrapperProps): JSX.Element {
  return (
    <div className="place-card__image-wrapper">
      {link}
    </div>
  );
}

export default ImageWrapper;
