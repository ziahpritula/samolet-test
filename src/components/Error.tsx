const Error = () => (
  <div className="wrapper">
    Что-то пошло не так.
    <span
      onClick={() => window.location.reload()}
      style={{ cursor: "pointer", color: "#0077FF" }}
    >
      Обновите эту страницу и попробуйте ещё раз или свяжитесь с нами!
    </span>
  </div>
);

export default Error;
