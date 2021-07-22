const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const User = require('../models/User');
const Review = require('../models/Review');

//Some basic tests
test("Testing to see if Jest works", () => {
	expect(1).toBe(1);
});

test("Testing the endpoint '/', and wants to get 'Backed is on' response", async () => {
	const response = await request.get("/");

	expect(response.status).toBe(200);
	expect(response.body).toBe("Backend is on");
});

//Tests using in-memory mongoDB
describe("testing some easy case", () => {
	let mongoServer;
	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri(),
			{
				useNewUrlParser: true,
				dbName: "verifyMASTER",
				useCreateIndex: true,
				useUnifiedTopology: true
			});
	});

	afterEach(async () => {
		await User.deleteMany();
		await Review.deleteMany();
	});

	afterAll(async () => {
		await mongoose.connection.close();
		await mongoose.disconnect();
		if (mongoServer) {
			await mongoServer.stop();
		}
	});


	test("Testing the API, it should return a non-empty array", async () => {
		const response = await request.get("/movie/avengers");

		expect(response.status).toBe(200);
		expect(typeof response).toBe('object');
		expect(response.body).not.toEqual([]);
		expect(response.body).toHaveProperty('results');
		expect(typeof response.body.results).toBe('object');
		expect(response.body.results.length).toBeGreaterThan(0);
	});


	test("Testing the API, it should return 'No such page can be found' in case of an empty request", async () => {
		const response = await request.get("/movie/");

		expect(response.status).toBe(404);
		expect(typeof response.body).toBe('string');
		expect(response.body).toBe("No such page can be found");
	});


	test("Testing the API, it should return an error in case of an idiot request", async () => {
		const response = await request.get("/movie/gd564fh77");

		expect(response.status).toBe(200);
		expect(typeof response.body).toBe('object');
		expect(response.body.results).toEqual([]);
	});


	test("If DB is empty, it should return an empty array", async () => {
		const reviewArr = await Review.find();

		expect(reviewArr).toEqual([]);
	});


	test("If DB has a user, after a review request the DB can find it and save the new review", async () => {
		//insert a user to find him/her by google_id
		await User.create({
			picture: "jpeg-pic",
			email: "legyelmarvegrejoazistenszerelmere@email.com",
			google_id: "google123456",
			full_name: "Kandisz Nóra",
			movie_title: "Szürkemarha 50 árnyalata",
			movie_id: "abc987",
			comment: [{ movie_title: "asd", movie_id: "555", comment: "blabla" }],
		});

		//send review POST request
		const res = await request.post("/api/review").send({
			google_id: "google123456",
			full_name: "Kandisz Nóra",
			movie_title: "Szürkemarha 50 árnyalata",
			movie_id: "abc987",
			comment: "Best movie ever",
		});

		const review = await Review.findOne({});

		expect(res.status).toBe(200);
		expect(res.body).toBe("Success!");
		expect(typeof review).toBe('object');
		expect(review.google_id).toBe("google123456");
		expect(review.full_name).toBe("Kandisz Nóra");
		expect(review.movie_title).toBe("Szürkemarha 50 árnyalata");
		expect(review.movie_id).toBe("abc987");
		expect(review.comment).toBe("Best movie ever");
		expect(review._id).not.toBeUndefined();
		expect(review.date).not.toBeUndefined();
	});


	test("If searchValue=super, and radioValue=movie-title, then return 'Superman' ", async () => {
		//insert 2 reviews
		await Review.insertMany([{
			google_id: "456", full_name: "Para Zita",
			movie_title: "Superman", movie_id: "01", comment: "Volt már jobb is"
		},
		{
			google_id: "137", full_name: "Beviz Elek",
			movie_title: "Batman", movie_id: "02", comment: "Inkább Pókember"
		}]);

		const reviewArr = await Review.find();

		//POST 'super, movie-title'
		const res = await request.post("/api/getReview").send({ searchValue: "super", radioValue: "movie-title" });

		expect(reviewArr).toHaveLength(2);
		expect(res.status).toBe(200);
		expect(typeof res.body).toBe('object');
		expect(res.body.length).toBe(1);
		expect(res.body[0]).toHaveProperty('google_id', "456");
		expect(res.body[0]).toHaveProperty('full_name', "Para Zita");
		expect(res.body[0]).toHaveProperty('movie_title', "Superman");
		expect(res.body[0]).toHaveProperty('movie_id', "01");
		expect(res.body[0]).toHaveProperty('comment', "Volt már jobb is");
	});


	test("If searchValue=viz, and radioValue=user, then return 'Beviz Elek' ", async () => {
		//insert 2 reviews
		await Review.insertMany([{
			google_id: "456", full_name: "Para Zita",
			movie_title: "Superman", movie_id: "01", comment: "Volt már jobb is"
		},
		{
			google_id: "137", full_name: "Beviz Elek",
			movie_title: "Batman", movie_id: "02", comment: "Inkább Pókember"
		}]);

		const reviewArr = await Review.find();

		//POST 'viz, user'
		const res = await request.post("/api/getReview").send({ searchValue: "viz", radioValue: "user" });

		expect(reviewArr).toHaveLength(2);
		expect(res.status).toBe(200);
		expect(typeof res.body).toBe('object');
		expect(res.body.length).toBe(1);
		expect(res.body[0]).toHaveProperty('google_id', "137");
		expect(res.body[0]).toHaveProperty('full_name', "Beviz Elek");
		expect(res.body[0]).toHaveProperty('movie_title', "Batman");
		expect(res.body[0]).toHaveProperty('movie_id', "02");
		expect(res.body[0]).toHaveProperty('comment', "Inkább Pókember");
	});


	test("If searchValue=ádám, and radioValue=user, then return nothing ", async () => {
		//insert 2 reviews
		await Review.insertMany([{
			google_id: "456", full_name: "Para Zita",
			movie_title: "Superman", movie_id: "01", comment: "Volt már jobb is"
		},
		{
			google_id: "137", full_name: "Beviz Elek",
			movie_title: "Batman", movie_id: "02", comment: "Inkább Pókember"
		}]);

		const reviewArr = await Review.find();

		//POST 'ádám, user'
		const res = await request.post("/api/getReview").send({ searchValue: "ádám", radioValue: "user" });

		expect(reviewArr).toHaveLength(2);
		expect(res.status).toBe(200);
		expect(typeof res.body).toBe('object');
		expect(res.body).toEqual([]);
	});


	test("If searchValue=batman, and radioValue=user, then return nothing ", async () => {
		//insert 2 reviews
		await Review.insertMany([{
			google_id: "456", full_name: "Para Zita",
			movie_title: "Superman", movie_id: "01", comment: "Volt már jobb is"
		},
		{
			google_id: "137", full_name: "Beviz Elek",
			movie_title: "Batman", movie_id: "02", comment: "Inkább Pókember"
		}]);

		const reviewArr = await Review.find();

		//POST 'batman, user'
		const res = await request.post("/api/getReview").send({ searchValue: "batman", radioValue: "user" });

		expect(reviewArr).toHaveLength(2);
		expect(res.status).toBe(200);
		expect(typeof res.body).toBe('object');
		expect(res.body).toEqual([]);
	});

});
