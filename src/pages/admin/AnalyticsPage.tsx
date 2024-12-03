import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import RevenueAnalytics from '../../components/admin/analytics/RevenueAnalytics';
import ChurnAnalysis from '../../components/admin/analytics/ChurnAnalysis';
import CustomerLifetimeValue from '../../components/admin/analytics/CustomerLifetimeValue';
import ConversionFunnels from '../../components/admin/analytics/ConversionFunnels';

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            Comprehensive insights into your business performance
          </p>
        </div>

        {/* Revenue Analytics */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue Overview
          </h2>
          <RevenueAnalytics />
        </section>

        {/* Customer Lifetime Value */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Customer Lifetime Value
          </h2>
          <CustomerLifetimeValue />
        </section>

        {/* Churn Analysis */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Churn Analysis
          </h2>
          <ChurnAnalysis />
        </section>

        {/* Conversion Funnels */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Conversion Funnels
          </h2>
          <ConversionFunnels />
        </section>
      </div>
    </AdminLayout>
  );
}