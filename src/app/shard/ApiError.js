export default function handleApiError(error, message = "Something went wrong") {
  console.error("API Error:", error);

  return Response.json(
    {
      success: false,
      message,
      error: error?.message || "Unknown error",
    },
    { status: 500 }
  );
}