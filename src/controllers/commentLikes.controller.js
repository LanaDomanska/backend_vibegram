import * as svc from "../services/commentLikes.service.js";

export async function like(req, res) {
  const { commentId } = req.params;
  const data = await svc.likeComment(req.user.id, commentId);
  res.json(data);
}

export async function unlike(req, res) {
  const { commentId } = req.params;
  const data = await svc.unlikeComment(req.user.id, commentId);
  res.json(data);
}

export async function get(req, res) {
  const { commentId } = req.params;
  const data = await svc.getCommentLikes(commentId);
  res.json(data);
}
