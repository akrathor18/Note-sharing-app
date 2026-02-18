import Link from '../models/Links.js';
import User from '../models/UserSchema.js';

export const createLink = async ({ userId, label, url }) => {
    const newLink = await Link.create({ user: userId, label, url });

    await User.findByIdAndUpdate(userId, {
        $push: { links: newLink._id }
    });

    return newLink;
};

export const getLinksByUser = async (userId) => {
    return await Link.find({ user: userId });
};

export const bulkUpdateLinks = async ({ userId, links }) => {
    await Link.deleteMany({ user: userId });

    const newLinks = await Link.insertMany(
        links.map(link => ({
            user: userId,
            label: link.label,
            url: link.url,
        }))
    );

    await User.findByIdAndUpdate(userId, {
        links: newLinks.map(l => l._id),
    });

    return newLinks;
};

export const updateLink = async ({ id, userId, label, url }) => {
    return await Link.findOneAndUpdate(
        { _id: id, user: userId },
        { label, url },
        { new: true }
    );
};

export const deleteLink = async ({ id, userId }) => {
    return await Link.findOneAndDelete({ _id: id, user: userId });
};