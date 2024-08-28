export const LoadingIndicator = (props: any) => {
  return (
    <svg
      {...props}
      className="m-auto h-7 w-7 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const AlertIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
    >
      <path
        d="M24.9993 16.667V25.0003M24.9993 33.3337H25.0202M45.8327 25.0003C45.8327 36.5063 36.5053 45.8337 24.9993 45.8337C13.4934 45.8337 4.16602 36.5063 4.16602 25.0003C4.16602 13.4944 13.4934 4.16699 24.9993 4.16699C36.5053 4.16699 45.8327 13.4944 45.8327 25.0003Z"
        stroke="#BF1F16"
        strokeWidth="4.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
