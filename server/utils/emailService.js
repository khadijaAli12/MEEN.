import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready to send emails');
  }
});

// Send order confirmation email
const sendOrderConfirmation = async (order, userEmail, userName) => {
  try {
    const mailOptions = {
      from: `"meen Parfum" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Order Confirmation #${order._id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3E2723; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background-color: #3E2723; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>meen Parfum</h1>
              <p>Luxury Fragrances Since 1947</p>
            </div>
            
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>Thank you for your order! We're preparing your luxury fragrances with the utmost care.</p>
              
              <div class="order-details">
                <h3>Order Details #${order._id}</h3>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> $${order.totalPrice.toFixed(2)}</p>
                
                <h4>Items Ordered:</h4>
                <ul>
                  ${order.orderItems.map(item => `
                    <li>${item.qty} x ${item.name} - $${(item.price * item.qty).toFixed(2)}</li>
                  `).join('')}
                </ul>
                
                <h4>Shipping Address:</h4>
                <p>
                  ${order.shippingAddress.address}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                  ${order.shippingAddress.country}
                </p>
              </div>
              
              <p>Your order will be processed and shipped within 1-2 business days.</p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/order/${order._id}" class="button">View Order Status</a>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} meen Parfum. All rights reserved.</p>
              <p>This is an automated email, please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: `"meen Parfum" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Welcome to meen Parfum',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3E2723; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background-color: #3E2723; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to meen Parfum</h1>
              <p>Luxury Fragrances Since 1947</p>
            </div>
            
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>Welcome to the world of meen Parfum! We're delighted to have you join our community of fragrance connoisseurs.</p>
              
              <p>Discover our collection of meticulously crafted luxury fragrances, each telling a unique story of elegance and sophistication.</p>
              
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/collections" class="button">Explore Our Collection</a>
              
              <p>As a welcome gift, enjoy free shipping on your first order when you spend over $200.</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} meen Parfum. All rights reserved.</p>
              <p>This is an automated email, please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: `"meen Parfum" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3E2723; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background-color: #3E2723; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>meen Parfum</h1>
              <p>Password Reset</p>
            </div>
            
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>You have requested to reset your password. Click the button below to create a new password.</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
              
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p>${resetUrl}</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} meen Parfum. All rights reserved.</p>
              <p>This is an automated email, please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export { sendOrderConfirmation, sendWelcomeEmail, sendPasswordResetEmail };