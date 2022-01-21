import { Api } from "./stripe/Api";

const client = new Api();
const orderId = "12"

try {
  const order = client.v1.getOrdersId(orderId);
  console.log(order);

} catch (err) {
  console.error(err)
}
