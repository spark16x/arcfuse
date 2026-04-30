export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black mb-8 text-on-surface">Terms of Service</h1>
      <div className="prose prose-slate dark:prose-invert">
        <p className="text-on-surface-variant">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">1. Acceptance of Terms</h2>
        <p className="text-on-surface-variant mb-4">
          By accessing and using our services, you accept and agree to be bound by the terms and provision
          of this agreement. In addition, when using these particular services, you shall be subject to any
          posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">2. Description of Service</h2>
        <p className="text-on-surface-variant mb-4">
          We provide a suite of tools for social digital workflow management. We reserve the right to
          modify or discontinue, temporarily or permanently, the service with or without notice to you.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">3. User Conduct</h2>
        <p className="text-on-surface-variant mb-4">
          You agree to use the service only for lawful purposes. You are solely responsible for the knowledge
          of and adherence to any and all laws, rules, and regulations pertaining to your use of the services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">4. Intellectual Property</h2>
        <p className="text-on-surface-variant mb-4">
          The service and its original content, features, and functionality are owned by us and are protected
          by international copyright, trademark, patent, trade secret, and other intellectual property or
          proprietary rights laws.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-on-surface">5. Termination</h2>
        <p className="text-on-surface-variant mb-4">
          We may terminate or suspend access to our service immediately, without prior notice or liability,
          for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
      </div>
    </div>
  );
}
