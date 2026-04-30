export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black mb-8 text-on-surface">Privacy Policy</h1>
      <div className="prose prose-slate dark:prose-invert">
        <p className="text-on-surface-variant">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">1. Information We Collect</h2>
        <p className="text-on-surface-variant mb-4">
          We collect information that you provide directly to us, such as when you create or modify your account,
          request customer support, or otherwise communicate with us. This information may include your name,
          email address, phone number, and any other information you choose to provide.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">2. How We Use Information</h2>
        <p className="text-on-surface-variant mb-4">
          We use the information we collect about you to provide, maintain, and improve our services,
          such as to process transactions, send you related information, and respond to your comments,
          questions, and requests.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">3. Sharing of Information</h2>
        <p className="text-on-surface-variant mb-4">
          We do not share personal information about you with third parties except as described in this
          privacy policy or when we have your consent.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">4. Security</h2>
        <p className="text-on-surface-variant mb-4">
          We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized
          access, disclosure, alteration and destruction.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">5. Contact Us</h2>
        <p className="text-on-surface-variant mb-4">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
