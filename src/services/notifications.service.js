import Notification from "../models/Notification.js";

const pickAvatarUrl = (u) => (u?.avatarUrl || u?.avatar || "") ?? "";

export const getNotifications = async (userId) => {
  const docs = await Notification
    .find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("fromUser", "username avatar avatarUrl")
    .populate("post", "_id imageUrl")
    .lean();

  return docs.map(n => ({
    _id: n._id,
    type: n.type,
    createdAt: n.createdAt,
    readAt: n.readAt || (n.read ? n.updatedAt : null),  
    fromUser: {
      _id: n.fromUser?._id,
      username: n.fromUser?.username,
      avatarUrl: pickAvatarUrl(n.fromUser),            
    },
    post: n.post ? { _id: n.post._id, imageUrl: n.post.imageUrl } : null,
  }));
};

export const createNotification = async (data) => {
  if (data.user?.toString?.() === data.fromUser?.toString?.()) return null;
  return Notification.create(data);
};

export const markAsRead = async (userId, notificationId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true, readAt: new Date() },  
    { new: true }
  );
};
