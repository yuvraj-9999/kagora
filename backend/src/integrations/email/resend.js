import { Resend } from "resend";
import env from "../../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email,
    name,
    verificationLink
) => {
    return resend.emails.send({
        from: "Kagora <noreply@mail.goslings.online>",
        to: email,
        subject: "Verify your Kagora account",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Welcome to Kagora</h2>

                <p>Hi ${name},</p>

                <p>
                    Thank you for creating your Kagora account.
                </p>

                <p>
                    Please verify your email address to activate your account.
                </p>

                <p style="margin: 30px 0;">
                    <a
                        href="${verificationLink}"
                        style="
                            background: #111827;
                            color: #ffffff;
                            padding: 12px 24px;
                            text-decoration: none;
                            border-radius: 8px;
                            display: inline-block;
                        "
                    >
                        Verify Email
                    </a>
                </p>

                <p>This verification link will expire in 24 hours.</p>

                <hr>

                <p>— Team Kagora</p>
            </div>
        `,
    });
};

export const sendPasswordResetEmail = async (
    email,
    name,
    resetLink
) => {
    return resend.emails.send({
        from: "Kagora <noreply@mail.goslings.online>",
        to: email,
        subject: "Reset your Kagora password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Reset your password</h2>

                <p>Hi ${name},</p>

                <p>
                    We received a request to reset your Kagora password.
                    Click the button below to create a new password.
                </p>

                <p style="margin: 30px 0;">
                    <a
                        href="${resetLink}"
                        style="
                            background: #111827;
                            color: #ffffff;
                            padding: 12px 24px;
                            text-decoration: none;
                            border-radius: 8px;
                            display: inline-block;
                        "
                    >
                        Reset Password
                    </a>
                </p>

                <p>This link will expire in 15 minutes.</p>

                <p>
                    If you didn't request this password reset, you can safely
                    ignore this email.
                </p>

                <hr>

                <p>— Team Kagora</p>
            </div>
        `,
    });
};