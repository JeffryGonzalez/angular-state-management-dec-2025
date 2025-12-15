import { delay, http, HttpResponse } from 'msw';
type ApiProduct = {
  id: string;
  name: string;
  price: number;
};
let PRODUCTS: ApiProduct[] = [
  { id: '1', name: 'E Product 1', price: 32.23 },
  { id: '2', name: 'D Product 2', price: 118.23 },
  { id: '3', name: 'C Product 3', price: 42.18 },
  { id: '4', name: 'B Product 4', price: 103.23 },
  { id: '5', name: 'A Product 5', price: 1.89 },
];

// eslint-disable-next-line prefer-const
let delayAmount = 1000;

const getRequestCount = 0;
// MSW uses a random delay if no argument is passed to delay, or a number of MS if it is;
const settableDelay = () => {
  if (delayAmount !== 0) {
    return delay(delayAmount);
  } else {
    return delay();
  }
};
export const ProductHandler = [
  http.get('https://some-api/products', async () => {
    //getRequestCount++;
    if (getRequestCount % 3 === 0) {
      PRODUCTS.push({
        id: (getRequestCount + 1000).toString(),
        name: 'F Product ' + getRequestCount,
        price: 32.23,
      });
    }
    await settableDelay();
    return HttpResponse.json(PRODUCTS);
  }),
  http.delete('https://some-api/products/:id', async (req) => {
    const { id } = req.params as unknown as { id: string };
    if (id === '5') {
      await settableDelay();
      return new HttpResponse('Could Not Delete', { status: 400 });
    }
    PRODUCTS = PRODUCTS.filter((product) => product.id !== id);
    await settableDelay();

    return new HttpResponse('', { status: 204 });
  }),
  http.post('https://some-api/products', async ({ request }) => {
    const product = (await request.json()) as unknown as {
      name: string;
      price: number;
    };
    if (product.price > 500) {
      await settableDelay();
      return new HttpResponse('Price too high limit is $500.00', {
        status: 400,
      });
    }
    const newProduct = { ...product, id: crypto.randomUUID() } as unknown as {
      id: string;
      name: string;
      price: number;
    };
    PRODUCTS = [...PRODUCTS, newProduct];
    await settableDelay();
    return HttpResponse.json(newProduct);
  }),
  http.put('https://some-api/products/:id', async ({ request }) => {
    const p = (await request.json()) as unknown as ApiProduct;
    if (p.price > 500) {
      await settableDelay();
      return new HttpResponse('Price too high limit is $500.00', {
        status: 400,
      });
    }

    const products = PRODUCTS.filter((product) => product.id !== p.id);

    PRODUCTS = [p, ...products];
    await settableDelay();
    return HttpResponse.json(p);
  }),
];
