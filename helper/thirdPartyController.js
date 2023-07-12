const URL = 'http://bihun.in/api11/';
const Request = require('request');
class ThirdPartyController {

	//----------------------------------------------get competition---------------------------------------\\
	async getMatchOdds(marketId) {
		return new Promise(function (resolve, reject) {
			let options = {
				method: 'GET',
				// url: URL + 'odds.php?eid=' + marketId,
				url: 'https://betfair.openapi.live/api/v2/listMarketBookOdds?market_id=' + marketId,
				headers: { 'cache-control': 'no-cache' }
			};
			Request(options, function (error, response, body) {
				if (error) {
					console.log("at reject match-odds");
					// reject(error);
					resolve(null)
				} else {
					try {
						resolve(JSON.parse(body));
					} catch {
						resolve(null);
					}
				}
			});
		});
	}

	async getBookmakerMarket(marketId) {
		return new Promise(function (resolve, reject) {
			let options = {
				method: 'GET',
				// url: URL + 'bookmaker.php?eid=' + marketId,
				url: 'https://fancy.betpro.gold/api/betfair/bookmaker/' + marketId,
				headers: { 'cache-control': 'no-cache' }
			};
			Request(options, function (error, response, body) {
				if (error) {
					console.log("at reject bookmaker-markert");
					// reject(error);
					resolve(null)
				} else {
					try {
						resolve(JSON.parse(body));
					} catch {
						resolve(null);
					}
				}
			});
		});
	}

	async getSessions(marketId) {
		return new Promise(function (resolve, reject) {
			let options = {
				method: 'GET',
				// url: URL + 'fancy1.php?eid=' + marketId,
				url: 'https://fancy.betpro.gold/api/betfair/fancy/' + marketId,
				headers: { 'cache-control': 'no-cache' }
			};
			Request(options, function (error, response, body) {
				if (error) {
					console.log("at reject session");
					// reject(error);
					resolve(null)
				} else {
					try {
						resolve(JSON.parse(body));
					} catch {
						resolve(null);
					}
				}
			});
		});
	}

	async getMatchList() {
		return new Promise(function (resolve, reject) {
			let options = {
				method: 'GET',
				// url: URL + 'list.php',
				url: 'https://api.bullsoffer9.in/markets/4',
				headers: { 'cache-control': 'no-cache' }
			};
			Request(options, function (error, response, body) {
				if (error) {
					reject(error);
				} else {
					try {
						resolve(JSON.parse(response.body));
					} catch {
						resolve(null);
					}
				}
			});
		});
	}

}

module.exports = new ThirdPartyController;
