export const trending = (req, res) => res.send("Home");
export const see = (req, res) => res.send(`video watch ${req.params.id}`);
export const edit = (req, res) => res.send("video edit");
export const deleteVideo = (req, res) => res.send("video delete");
export const upload = (req, res) => res.send("video upload");
