import {MailtrapClient} from 'mailtrap'
import env from 'dotenv'

env.config()

const client = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN
});

export const sendWelcomeEmail = async (email, name, profileUrl) => {

    try {
        client.send({
            from: {
                email: "hello@demomailtrap.com",
                name: "Mailtrap Test"
            },
            to: [{email: "pisethk123@gmail.com"}],
            subject: "Welcome to Linkedin clone",
            html: `
                <h1>Hello ${name}</h1>
                <p>we are thrilled to have you join our professional community!</p>
                <p>get start now </p>
                <a href="${profileUrl}">complete your profile now</a>
            `,
            category: "Welcome",
        })
    } catch (error) {
        throw error
    }
}

export const loginEmail = async (email, name, profileUrl) => {

    try {
        client.send({
            from: {
                email: "hello@demomailtrap.com",
                name: "Mailtrap Test"
            },
            to: [{email: "pisethk123@gmail.com"}],
            subject: "Welcome to Linkedin clone again",
            html: `
                <h1>Hello ${name}</h1>
                <p>we are thrilled to have you join our professional community!</p>
                <p>get start now </p>
                <a href="${profileUrl}">complete your profile now</a>
            `,
            category: "Welcome",
        })
    } catch (error) {
        throw error
    }
}

export const sendCommentNotificationEmail = async (recipientEmail, recipientName, commenterName, postUrl, commentContent) => {
    try {
        client.send({
            from: {
                email: "hello@demomailtrap.com",
                name: "Mailtrap Test"
            },
            to: [{email: "pisethk123@gmail.com"}],
            subject: "New comment on your post",
            html: `
                <h1>Hello ${recipientName}</h1>
                <p>${commenterName} has commented on your post</p>
                <p>"${commentContent}"</p>
                <a href="${postUrl}">see comment now</a>
            `,
            category: "comment_notifications",
        })
    } catch (error) {
        throw error
    }
}

export const sendConnectionAcceptedEmail = async(senderEmail, senderName, recipientName, profileUrl) => {
    try {
        client.send({
            from: {
                email: "hello@demomailtrap.com",
                name: senderName
            },
            to: [{email: "pisethk123@gmail.com"}],
            subject: "connection Accepted",
            html: `
                <h1>Hello ${recipientName}</h1>
                <p>${profileUrl} has accepted your connectin request</p>
                <a href="${profileUrl}">see his/her profile now</a>
            `,
            category: "comment_notifications",
        })
    } catch (error) {
        throw error
    }
}