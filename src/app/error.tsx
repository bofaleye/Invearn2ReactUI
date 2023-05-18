"use client";

export const PageError = ({ error, resetErrorBoundary}: any) => {
  return (
    <div>
      <h1>Error Page</h1>
      <p>{error.message}</p>
    </div>
  )
}