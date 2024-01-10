export default function ErrorComponent({
  error,
  errors,
}: {
  error?: unknown;
  errors?: unknown[];
}) {
  if (errors) {
    const errorMessages = errors
      .filter((error) => error != null)
      .map((error) => (error as Error).message);

    console.log(errorMessages);
    return (
      <>
        <p>에러 발생</p>
        {errorMessages.map((message, i) => (
          <pre key={i}>{message}</pre>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>에러발생</p>
        <pre>{(error as Error).message}</pre>
      </>
    );
  }

  return null;
}
