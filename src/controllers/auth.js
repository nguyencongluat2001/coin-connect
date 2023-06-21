import { convertPhoneNumber, sendOTPService } from '../service/twilio';

export const sendOTP = async (req, res) => {
	const { phoneNumber, message } = req.body;

	if (!phoneNumber)
		return res.status(400).json({ message: 'phoneNumber is required' });

	if (!message) return res.status(400).json({ message: 'message is required' });

	const phone = convertPhoneNumber(phoneNumber);

	await sendOTPService(phone, message);

	return res.status(200).json({ message: 'success' });
};
