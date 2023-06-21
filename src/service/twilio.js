const twilio = require('twilio');
const client = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

export const sendOTPService = async (phoneNumber, message = 'By Jarvis') => {
	try {
		await client.messages.create({
			body: message,
			from: process.env.TWILIO_NUMBER,
			to: phoneNumber,
		});
	} catch (error) {
		throw new Error(error);
	}
};

// convert phone number Viet Nam
export const convertPhoneNumber = (phoneNumber) => {
	if (phoneNumber.length !== 10) {
		throw new Error('Phone number is not valid');
	}

	if (phoneNumber[0] === '0') {
		return '+84' + phoneNumber.slice(1);
	}

	return phoneNumber;
};
