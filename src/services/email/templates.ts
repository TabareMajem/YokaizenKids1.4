export const emailTemplates = {
  welcomeEmail: (name: string) => ({
    subject: 'Welcome to Kokoro Quest!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6b46c1;">Welcome to Kokoro Quest, ${name}!</h1>
        <p>We're excited to have you join our community of emotional learning.</p>
        <p>Here's what you can do to get started:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Try your first activity</li>
          <li>Connect with other users</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
      </div>
    `
  }),

  subscriptionConfirmation: (planName: string) => ({
    subject: 'Subscription Confirmed - Kokoro Quest',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6b46c1;">Thank You for Subscribing!</h1>
        <p>Your subscription to the ${planName} plan has been confirmed.</p>
        <p>You now have access to all features included in your plan.</p>
      </div>
    `
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your Password - Kokoro Quest',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6b46c1;">Password Reset Request</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 24px; 
                  background-color: #6b46c1; color: white; 
                  text-decoration: none; border-radius: 6px;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  })
};