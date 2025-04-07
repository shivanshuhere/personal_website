var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const fs = require('fs');
const serverPort = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

var transport = {
	host: process.env.HOST,
	port: process.env.MAILPORT,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
	from: process.env.EMAIL,
};

var transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take messages');
	}
});

router.post('/send', (req, res, next) => {
	let name = req.body.data.name;
	let email = req.body.data.email;
	let phone = req.body.data.phone;
	let message = req.body.data.message;
	let senderEmail = `${name} <${process.env.EMAIL}>`;
	let yourEmail = `${process.env.YOURNAME} <${process.env.EMAIL}>`;
	let content = `name: ${name} \n email: ${email} \n message: ${message} \n phone: ${phone}`;
	const mail = {
		from: senderEmail,
		to: process.env.EMAIL, // This is email address where you will receive messages
		subject: `New Portfolio Message from ${name}`,
		text: content,
	};

	transporter.sendMail(mail, (err, data) => {
		console.log(err);
		console.log(data);
		if (err) {
			res.json({
				status: 'fail',
			});
		} else {
			res.json({
				status: 'success',
			});

			//Send Auto Reply email
			transporter.sendMail(
				{
					from: yourEmail,
					to: email,
					subject: 'Message received',
					text: `Hi ${name},\nThank you for sending me a message. I will get back to you soon.\n\nBest Regards,\n${process.env.YOURNAME}\n${process.env.YOURSITE}\n\n\nMessage Details\nName: ${name}\n Email: ${email}\n Message: ${message}`,
					html: `<p>Hi ${name},<br>Thank you for sending me a message. I will get back to you soon.<br><br>Best Regards,<br>${process.env.YOURNAME}<br>${process.env.YOURSITE}<br><br><br>Message Details<br>Name: ${name}<br> Email: ${email}<br> Message: ${message}</p>`,
				},
				function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Message sent: ' + info.response);
					}
				}
			);
		}
	});
});

app.listen(serverPort, () =>
	console.log(`backend is running on port ${serverPort}`)
);