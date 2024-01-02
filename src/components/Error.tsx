export default function ({ error }: { error: unknown }) {
  const json = JSON.stringify(error, null, 4);
  return (
    <>
      <p>에러 발생</p>
      <pre>{json}</pre>
    </>
  );
}
