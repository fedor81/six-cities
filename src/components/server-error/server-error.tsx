type ServerErrorProps = {
  message: string;
};

function ServerError({ message }: ServerErrorProps): JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">Не удалось загрузить предложения</b>
        <p className="cities__status-description">{message}</p>
      </div>
    </section>
  );
}

export default ServerError;
