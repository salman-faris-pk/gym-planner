import { Router, type Request,type Response} from "express"
import { prisma } from "../lib/prisma";

export const planRouter = Router();

planRouter.post("/generate-plan", async(req:Request,res: Response)=> {
  try {
    const { userId }=req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    };

    const profile = await prisma.user_profiles.findUnique({
        where: { user_id: userId}
    });

    if(!profile){
        return res.status(400).json({ error: "User profile not found. Complete onboarding first"})
    };

    const latestplan = await prisma.training_plans.findFirst({
      where:{ user_id: userId},
      orderBy: {created_at: "desc"},
      select: { version: true}
    });

     const nextVersion = latestplan ? latestplan.version + 1 : 1;
     let planJson;
     


     const planText= JSON.stringify(planJson, null, 2);

     const newPlan= await prisma.training_plans.create({
      data: {
        user_id: userId,
        plan_json: planJson as any,
        plan_text: planText,
        version: nextVersion
      }
     });

     res.json({
        id: newPlan.id,
        version: newPlan.version,
        createdAt: newPlan.created_at
     })

  } catch (err) {
    console.error("Error generating plan", err);
    res.status(500).json({ error: "Failed to generate plan" });
  }
})