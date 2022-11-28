const databaseName = 'TechShop';
const collectionsName = {
  users: 'users',
  sessions: 'sessions',
  products: 'products',
  carts: 'carts',
  checkouts: 'checkouts',
};
export { databaseName, collectionsName };

// export const user = {
//   name: 'fulano',
//   password: 'aodkawopdkpwkdwdaaADAW',
//   email: 'fulano@teste.com',
//   admin: true,
// };
// export const product = {
//   name: 'tal e tal',
//   description: 'legal',
//   price: 15.0,
//   category: 'exemple',
//   picture: 'www.exemple.com',
//   Qty: 152,
// };
// router.post('/adminCreate', async (req, res) => {
//   const password = bcrypt.hashSync('789456', 10);
//   try {
//     const { insertedId } = await usersCollection.insertOne({
//       name: 'Allan Developer',
//       password: bcrypt.hashSync('789456', 10),
//       email: 'Allan@dev.com',
//       admin: true,
//     });
//     res.send(insertedId);
//   } catch {
//     res.sendStatus(500);
//   }
// });
// router.get('/adminCheck', async (req, res) => {
//   try {
//     const user = await usersCollection.find().toArray();
//     res.send(user);
//   } catch {
//     res.sendStatus(500);
//   }
// });
