export default {
	methods: {
		format: function(num, digits) {
			var si = [
				{ value: 1, char: "" },
				{ value: 1e3, char: "K" },
				{ value: 1e6, char: "M" },
				{ value: 1e9, char: "B" },
				{ value: 1e12, char: "T" },
				{ value: 1e15, char: "P" },
				{ value: 1e18, char: "E" }
			];
			var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
			var i;
			for (i = si.length - 1; i > 0; i--) {
				if (num >= si[i].value) {
					break;
				}
			}
			return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].char;
		},

		timeSince: function(date) {
			var seconds = Math.floor((new Date() - date) / 1000);
			var interval = seconds / 31536000;
			interval = seconds / 86400;

			if (interval > 1) {
				return Math.floor(interval) + " days ago";
			}
			interval = seconds / 3600;
			if (interval > 1) {
				return Math.floor(interval) + " hours ago";
			}
			interval = seconds / 60;
			if (interval > 1) {
				return Math.floor(interval) + " minutes ago";
			}
			return Math.floor(seconds) + " seconds ago";
		}
	}
};
