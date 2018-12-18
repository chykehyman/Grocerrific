import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import GroceryModel from '../models/groceryModel';


const request = supertest(app);

describe('test cases for grocery apis', () => {
  let groceryItem;
  before((done) => {
    GroceryModel.deleteMany({}).then(() => {
      done();
    });
  });

  it('should return `200` when the home/base api is called', (done) => {
    request.get('/api/v1/')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('Success');
        expect(response.body.message).to.equal('Welcome to Grocerrific API');

        if (error) done(error);
        done();
      });
  });

  it('should return `404` when no  matching api route is found', (done) => {
    request.get('/api/v1/wrongRoute')
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal('Failed');
        expect(response.body.message).to.equal('API route does not exist. Redirect to /api/v1');

        if (error) done(error);
        done();
      });
  });

  it('should get an empty array collection of groceries', (done) => {
    request.get('/api/v1/items')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('There are no items in the store');
        if (error) done(error);
        done();
      });
  });

  it('should add a grocery item to the store', (done) => {
    request.post('/api/v1/items')
      .send({ name: 'tomato' })
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Item has been added');
        expect(response.body.payload).to.have.property('name').to.equal('tomato');
        expect(response.body.payload).to.have.property('purchaseStatus').to.equal(false);

        expect(response.body.payload);
        if (error) done(error);
        done();
      });
  });

  it('should get an array of groceries available', (done) => {
    request.get('/api/v1/items')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('All items retreived successfully');
        expect(response.body.payload).to.be.an('array').to.have.length(1);
        if (error) done(error);
        done();
      });
  });

  const grocery = new GroceryModel({ name: 'Lemon' });

  it('should return a `422` error for invalid id when updating', (done) => {
    request.put('/api/v1/items/fakeId123')
      .end((error, response) => {
        expect(response.status).to.equal(422);
        expect(response.body.message).to.equal('Invalid item ID');

        if (error) done(error);
        done();
      });
  });

  it('should buy the item in the store', (done) => {
    grocery.save((error, item) => {
      groceryItem = item;
      request.put(`/api/v1/items/${item._id}`)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal(`${item.name} has been purchased`);
          expect(response.body.payload).to.have.property('name').to.equal(`${item.name}`);
          expect(response.body.payload).to.have.property('purchaseStatus').to.equal(true);

          if (error) done(error);
          done();
        });
    });
  });

  it('should drop or unbuy the item already bought', (done) => {
    grocery.save((error, item) => {
      request.put(`/api/v1/items/${item._id}`)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal(`${item.name} has been dropped`);
          expect(response.body.payload).to.have.property('name').to.equal(`${item.name}`);
          expect(response.body.payload).to.have.property('purchaseStatus').to.equal(false);

          if (error) done(error);
          done();
        });
    });
  });

  it('should return a `404` error for an item that does not exist or has been deleted', (done) => {
    const nonExistingId = '5c176971462e555eeb8c3b52';
    request.put(`/api/v1/items/${nonExistingId}`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Item not found');

        if (error) done(error);
        done();
      });
  });

  it('should return a `422` error for invalid id when deleting', (done) => {
    request.delete('/api/v1/items/fakeId123')
      .end((error, response) => {
        expect(response.status).to.equal(422);
        expect(response.body.message).to.equal('Invalid item ID');

        if (error) done(error);
        done();
      });
  });

  it('should return a `404` error for an item that does not exist or has been deleted', (done) => {
    const nonExistingId = '5c176971462e555eeb8c3b52';
    request.delete(`/api/v1/items/${nonExistingId}`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Item not found');

        if (error) done(error);
        done();
      });
  });

  it('should return a `200` when item has been deleted', (done) => {
    request.delete(`/api/v1/items/${groceryItem._id}`)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(`${groceryItem.name} has been deleted`);

        expect(response.body.payload.id.toString()).to.equals(groceryItem._id.toString());

        if (error) done(error);
        done();
      });
  });
});
