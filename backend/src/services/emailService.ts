import nodemailer from 'nodemailer'

interface ContactData {
  name: string
  email: string
  service: string
  message: string
}

export const sendContactEmail = async (data: ContactData): Promise<void> => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'skillgrit3@gmail.com',
    subject: `New SkillGrid Inquiry - ${data.service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Service Interest:</strong> ${data.service}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This email was sent from the SkillGrid website contact form.</em></p>
    `
  }

  // Send email
  await transporter.sendMail(mailOptions)
}