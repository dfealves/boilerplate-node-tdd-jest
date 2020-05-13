const dbHandler = require("../../db.handler.tests");
const app = require("../../src/app");
const request = require("supertest");

describe("handle products api", () => {
  beforeAll(async () => {
    await dbHandler.connect();
  });

  afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      title: "Produto 01",
      description: "descrição legal",
      price: 199,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: "Produto 01",
      description: "descrição legal",
      price: 199,
    });
  });

  it("should not create", async () => {
    const product = await request(app).post("/products").send({});
    expect(product.status).toBe(400);
  });

  it("should be able to list the products", async () => {
    const product = await request(app).post("/products").send({
      title: "Produto 01",
      description: "descrição legal",
      price: 199,
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          title: "Produto 01",
          description: "descrição legal",
          price: 199,
          __v: 0,
          _id: product.body._id,
        },
      ])
    );
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return a product by id", async () => {
    const product = await request(app).post("/products").send({
      title: "Produto 055",
      description: "descriçãodfasdfa legal",
      price: 148989499,
    });

    const response = await request(app).get(`/products/${product.body._id}`);

    expect(response.status).toBe(200);
  });

  it("should be able to update product", async () => {
    const product = await request(app).post("/products").send({
      title: "Title updated",
      description: "description update",
      price: 0,
    });

    const response = await request(app)
      .put(`/products/${product.body._id}`)
      .send({
        title: "Title updateded",
        description: "description updated",
        price: 0,
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      title: "Title updateded",
      description: "description updated",
      price: 0,
    });
  });

  it("should not be able to update a product that does not exists", async () => {
    await request(app)
      .put(`/products/${"5ebb066f316d6d718c056054"}`)
      .expect(400);
  });

  it("it should be able to delete the product", async () => {
    const response = await request(app).post("/products").send({
      title: "Title updated",
      description: "description update",
      price: 0,
    });

    await request(app).delete(`/products/${response.body._id}`).expect(204);

    const products = await request(app).get("/products");

    const product = products.body.find((prod) => prod.id === response.body._id);

    expect(product.toBe(undefined));
  });
});
