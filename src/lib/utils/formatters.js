/**
 * Utility functions for formatting data for display
 */

/**
 * Format currency (Algerian Dinar)
 */
export function formatCurrency(amount) {
	if (!amount && amount !== 0) return 'DZD 0';
	return new Intl.NumberFormat('ar-DZ', {
		style: 'currency',
		currency: 'DZD',
		minimumFractionDigits: 0
	}).format(amount);
}

/**
 * Format large numbers with K, M abbreviations
 */
export function formatNumber(num) {
	if (!num && num !== 0) return '0';
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
}

/**
 * Format percentage
 */
export function formatPercentage(value, decimals = 1) {
	if (!value && value !== 0) return '0%';
	return `${value.toFixed(decimals)}%`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
	if (!bytes) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format duration in hours
 */
export function formatDuration(hours) {
	if (!hours && hours !== 0) return '0h';
	if (hours < 1) {
		return `${Math.round(hours * 60)}m`;
	}
	const h = Math.floor(hours);
	const m = Math.round((hours - h) * 60);
	return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString) {
	if (!dateString) return '';
	
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now - date;
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHour = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHour / 24);
	
	if (diffSec < 60) return 'just now';
	if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
	if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
	if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
	if (diffDay < 30) {
		const weeks = Math.floor(diffDay / 7);
		return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
	}
	if (diffDay < 365) {
		const months = Math.floor(diffDay / 30);
		return `${months} month${months > 1 ? 's' : ''} ago`;
	}
	const years = Math.floor(diffDay / 365);
	return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Format phone number (Algerian format)
 */
export function formatPhoneNumber(phone) {
	if (!phone) return '';
	// Remove all non-digits
	const cleaned = phone.replace(/\D/g, '');
	// Format as +213 XXX XXX XXX
	if (cleaned.startsWith('213')) {
		return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
	}
	if (cleaned.startsWith('0')) {
		return `0${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
	}
	return phone;
}

/**
 * Format status for display
 */
export function formatStatus(status) {
	if (!status) return '';
	return status
		.split('_')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/**
 * Format address
 */
export function formatAddress(address) {
	if (!address) return '';
	if (typeof address === 'string') return address;
	const parts = [
		address.street,
		address.city,
		address.state,
		address.zip
	].filter(Boolean);
	return parts.join(', ');
}

/**
 * Format list with commas and "and"
 */
export function formatList(items, limit = null) {
	if (!items || items.length === 0) return '';
	const displayItems = limit ? items.slice(0, limit) : items;
	const remaining = limit && items.length > limit ? items.length - limit : 0;
	
	if (displayItems.length === 1) {
		return displayItems[0];
	}
	if (displayItems.length === 2) {
		return `${displayItems[0]} and ${displayItems[1]}`;
	}
	
	const formatted = displayItems.slice(0, -1).join(', ') + ', and ' + displayItems[displayItems.length - 1];
	return remaining > 0 ? `${formatted}, and ${remaining} more` : formatted;
}

/**
 * Format date range
 */
export function formatDateRange(startDate, endDate) {
	if (!startDate || !endDate) return '';
	const start = new Date(startDate);
	const end = new Date(endDate);
	
	const startStr = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric'
	}).format(start);
	
	const endStr = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	}).format(end);
	
	return `${startStr} - ${endStr}`;
}

/**
 * Sanitize HTML (basic - for display purposes)
 */
export function sanitizeHtml(html) {
	if (!html) return '';
	const div = document.createElement('div');
	div.textContent = html;
	return div.innerHTML;
}