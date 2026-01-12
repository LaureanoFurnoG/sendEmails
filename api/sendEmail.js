import emailRouter from "../controllers/nodeMailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  return emailRouter(req, res);
}
