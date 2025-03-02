import express from "express"
import { authMiddleware, checkPermission } from "./middleware";

const app = express();

app.use(express.json());
app.use(authMiddleware);

app.get('/posts', checkPermission('read:post'), (req: any, res) => {
  res.json({ message: 'List of posts', user: req.user.role });
});

app.post('/posts', checkPermission('create:post'), (req: any, res) => {
  res.json({ message: 'Post created', user: req.user.role });
});

app.put('/posts/:id', checkPermission('update:post'), (req: any, res) => {
  res.json({ message: `Post ${req.params.id} updated`, user: req.user.role });
});

app.delete('/posts/:id', checkPermission('delete:post'), (req: any, res) => {
  res.json({ message: `Post ${req.params.id} deleted`, user: req.user.role });
});

app.listen(3000, () => console.log('Server on port 3000'));
