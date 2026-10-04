import { Resend } from "resend";
import env from "../../config/env.js";

const resend = new Resend(env.RESEND_API_KEY);

const emailStyles = {
    wrapper: `
        margin: 0;
        padding: 40px 20px;
        background: #09080b;
        font-family: Arial, Helvetica, sans-serif;
    `,
    container: `
        max-width: 560px;
        margin: 0 auto;
        background: #131015;
        border: 1px solid #2b222b;
        border-radius: 16px;
        overflow: hidden;
    `,
    content: `
        padding: 46px 40px;
    `,
    brand: `
        margin: 0;
        color: #f4efe6;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 5px;
    `,
    tagline: `
        margin: 9px 0 0;
        color: #a9a1a5;
        font-size: 13px;
        letter-spacing: 1.8px;
    `,
    divider: `
        width: 42px;
        height: 1px;
        margin: 28px 0 0;
        background: #d6ad68;
    `,
    heading: `
        margin: 42px 0 18px;
        color: #f4efe6;
        font-size: 28px;
        font-weight: 600;
        line-height: 1.25;
    `,
    text: `
        margin: 0 0 18px;
        color: #b9b0b5;
        font-size: 15px;
        line-height: 1.7;
    `,
    button: `
        display: inline-block;
        padding: 14px 28px;
        background-color: #d6ad68 !important;
        color: #171018 !important;
        -webkit-text-fill-color: #171018 !important;
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.2px;
        border-radius: 8px;
    `,
    note: `
        margin: 24px 0 0;
        color: #827980;
        font-size: 12px;
        line-height: 1.6;
    `,
    footer: `
        margin-top: 40px;
        padding-top: 24px;
        border-top: 1px solid #2b222b;
        color: #70666d;
        font-size: 12px;
        line-height: 1.6;
    `,
};

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
            <div style="${emailStyles.wrapper}">
                <div style="${emailStyles.container}">
                    <div style="${emailStyles.content}">

                        <p style="${emailStyles.brand}">
                            KAGORA
                        </p>

                        <p style="${emailStyles.tagline}">
                            WHERE SHADOWS MEET.
                        </p>

                        <div style="${emailStyles.divider}"></div>

                        <h1 style="${emailStyles.heading}">
                            Verify your email
                        </h1>

                        <p style="${emailStyles.text}">
                            Hi ${name},
                        </p>

                        <p style="${emailStyles.text}">
                            Your place in Kagora is almost ready.
                            Confirm your email address to complete your
                            account and begin exploring.
                        </p>

                        <div style="margin: 32px 0;">
                            <a
                                href="${verificationLink}"
                                style="${emailStyles.button}"
                            >
                                Verify email
                            </a>
                        </div>

                        <p style="${emailStyles.note}">
                            This verification link expires in 24 hours.
                            If you didn't create a Kagora account,
                            you can safely ignore this email.
                        </p>

                        <div style="${emailStyles.footer}">
                            KAGORA<br>
                            Where Shadows Meet.
                        </div>

                    </div>
                </div>
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
            <div style="${emailStyles.wrapper}">
                <div style="${emailStyles.container}">
                    <div style="${emailStyles.content}">

                        <p style="${emailStyles.brand}">
                            KAGORA
                        </p>

                        <p style="${emailStyles.tagline}">
                            WHERE SHADOWS MEET.
                        </p>

                        <div style="${emailStyles.divider}"></div>

                        <h1 style="${emailStyles.heading}">
                            Reset your password
                        </h1>

                        <p style="${emailStyles.text}">
                            Hi ${name},
                        </p>

                        <p style="${emailStyles.text}">
                            We received a request to reset the password
                            for your Kagora account.
                        </p>

                        <div style="margin: 32px 0;">
                            <a
                                href="${resetLink}"
                                style="${emailStyles.button}"
                            >
                                Reset password
                            </a>
                        </div>

                        <p style="${emailStyles.note}">
                            This password reset link expires in 15 minutes.
                            If you didn't request a password reset,
                            you can safely ignore this email.
                        </p>

                        <div style="${emailStyles.footer}">
                            KAGORA<br>
                            Where Shadows Meet.
                        </div>

                    </div>
                </div>
            </div>
        `,
    });
};