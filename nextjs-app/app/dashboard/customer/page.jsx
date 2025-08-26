'use client';

export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Dashboard</h1>
            <p className="text-gray-600">Welcome to your customer dashboard. Here you can manage your job requests and view quotes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}