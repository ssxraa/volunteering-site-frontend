export function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

export function validatePassword(password) {
	// At least 8 characters, 1 uppercase, 1 lowercase, 1 number
	if (password.length < 8) {
		return { valid: false, message: 'Password must be at least 8 characters' };
	}
	if (!/[A-Z]/.test(password)) {
		return { valid: false, message: 'Password must contain an uppercase letter' };
	}
	if (!/[a-z]/.test(password)) {
		return { valid: false, message: 'Password must contain a lowercase letter' };
	}
	if (!/[0-9]/.test(password)) {
		return { valid: false, message: 'Password must contain a number' };
	}
	return { valid: true };
}

export function validateRequired(value, fieldName) {
	if (!value || value.trim() === '') {
		return { valid: false, message: `${fieldName} is required` };
	}
	return { valid: true };
}

export function validatePhone(phone) {
	// Basic phone validation (can be customized for Algeria format)
	const re = /^[0-9]{10}$/;
	return re.test(phone.replace(/\s/g, ''));
}

export function validateUrl(url) {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}