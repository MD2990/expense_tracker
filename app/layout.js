import { Providers } from "./providers";
import "./globals.css";
import React from "react";
import Navigation from "./Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Navigation />

          {children}
        </Providers>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Muscat Shopping Center",
  description: "Apps made by Majid Ahmed",
};
