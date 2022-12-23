import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main>
      <h4 className="text-center">Page not found</h4>
      <Link className="d-block text-center" to="/">
        Go to Home Page
      </Link>
    </main>
  );
}

export default ErrorPage;
