import '../globals.css';

export default function ComplaintLayout({ children }) {
  return (
    <html lang="is">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}