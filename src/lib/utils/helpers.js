export function formatDate(dateString) {
	if (!dateString) return '';
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

export function formatTime(timeString) {
	if (!timeString) return '';
	const [hours, minutes] = timeString.split(':');
	const date = new Date();
	date.setHours(parseInt(hours), parseInt(minutes));
	return new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	}).format(date);
}

export function formatDateTime(dateTimeString) {
	if (!dateTimeString) return '';
	const date = new Date(dateTimeString);
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	}).format(date);
}

export function truncateText(text, maxLength = 100) {
	if (!text) return '';
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + '...';
}

export function capitalizeFirst(str) {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInitials(name) {
	if (!name) return '?';
	return name
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

export function getStatusColor(status) {
	const colors = {
		pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
		approved: 'bg-green-100 text-green-800 border-green-300',
		rejected: 'bg-red-100 text-red-800 border-red-300',
		active: 'bg-blue-100 text-blue-800 border-blue-300',
		completed: 'bg-gray-100 text-gray-800 border-gray-300',
		cancelled: 'bg-red-100 text-red-800 border-red-300',
		verified: 'bg-green-100 text-green-800 border-green-300',
		draft: 'bg-gray-100 text-gray-800 border-gray-300'
	};
	return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
}

export function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function pluralize(count, singular, plural) {
	return count === 1 ? singular : plural || `${singular}s`;
}

export function calculateDaysUntil(dateString) {
	if (!dateString) return null;
	const targetDate = new Date(dateString);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	targetDate.setHours(0, 0, 0, 0);
	const diffTime = targetDate - today;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
}