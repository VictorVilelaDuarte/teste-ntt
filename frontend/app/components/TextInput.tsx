type TextInputProps = {
  errorMessage?: string;
  type?: string;
  placeholder?: string;
};

export default function TextInput({
  errorMessage,
  type = "text",
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <>
      <input
        {...rest}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      {errorMessage && (
        <span className="text-red-500 mt-5">{errorMessage}</span>
      )}
    </>
  );
}
