import es from 'elasticsearch';

export class ElasticSearchService {
	private client: any;
	private responses: Array<any>;

	public constructor(host: string, port: string, log: string, apiVersion: string) {
		const client = new es.Client({
			host: host + ':' + port,
			log: log,
			apiVersion: apiVersion,
		});

		this.client = client;
	}

	public async checkConnection() {
		try {
			await this.client.ping({ requestTimeout: 1000 });
		} catch (error) {
			console.log(error);
		}
	}

	public save(response: any) {
		this.responses.push(response);
	}

	public async search(index: string, type: string, body: string) {
		try {
			const response = await this.client.search({
				index: index,
				type: type,
				body: {
					query: {
						match: {
							body: body
						}
					}
				}
			});

			for (const responseMessage of response.hits.hits) {
				console.log(responseMessage);
			}

			return response;
		} catch (error) {
			console.trace(error.message)
		}
	}

	
	public getClient() {
		return this.client;
	}
}





// create 2 routes with expres => not here =? in a file called routes/ or start.