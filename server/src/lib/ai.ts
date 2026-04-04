import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { TrainingPlan, UserProfile } from "../../types";
dotenv.config();


export async function generateTrainingPlan(
  profile: UserProfile | Record<string, any>,
): Promise<TrainingPlan> {

  const normalizedProfile: UserProfile ={
        goal: profile.goal || "bulk",
        experience: profile.experience || "intermediate",
        days_per_week: profile.days_per_week || 4,
        session_length: profile.session_length || 60,
        equipment: profile.equipment || "full_gym",
        injuries: profile.injuries || null,
        preffered_split: profile.preffered_split || "upper_lower",
    };

  const apiKey=process.env.GEMINI_API_KEY;
  if(!apiKey){
    throw new Error("Gemini key is not in environment variables!")
  };

  const gemini= new GoogleGenAI({
    apiKey: apiKey
  });

  const prompt= buildPrompt(normalizedProfile)

  try {
    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",  //gemini-2.5-flash
        contents: prompt,
        config: {
            systemInstruction: "you are an expert fitness trainer and program designer, you must respond with valid JSON only, don't include any markdown, reasoning or addition texts",
            temperature: 0.7,
            responseMimeType: "application/json"
        }
    });

    if(!response?.text || response.text.trim() === ""){
        console.error("[AI] no content in response", JSON.stringify(response, null, 2))
        throw new Error("No content in AI response")
    };

    const planData= JSON.parse(response.text);

    if (!planData) {
        throw new Error("Parsed JSON is empty");
    };

    return formatPlanResponse(planData, normalizedProfile)
    
  } catch (err) {
    console.error(`[AI] Error generating training plan:`,err)
    throw err;
  }
};


function formatPlanResponse(aiResponse:any, profile: UserProfile): TrainingPlan{
    
    const plan: TrainingPlan = {
        overview: {
            goal: aiResponse.overview?.goal || `Customized ${profile.goal} program`
        },
        weeklySchedule: 
    }
}


function buildPrompt(profile:UserProfile):string{
    
     const goalMap: Record<string, string> = {
        bulk: "Focus on building muscle mass and increasing overall body size through progressive overload, strength training, and a calorie surplus diet.",
        cut: "Aim to reduce body fat while preserving as much muscle mass as possible through controlled calorie deficit, resistance training, and cardio.",
        recomp: "Simultaneously build lean muscle and lose body fat by balancing nutrition, strength training, and recovery effectively.",
        strength: "Prioritize increasing raw strength by lifting heavier weights with lower repetitions and focusing on compound movements.",
        endurance: "Improve cardiovascular fitness and muscular endurance through higher repetitions, longer sessions, and aerobic conditioning.",
        maintenance: "Maintain your current physique, strength, and fitness level with a balanced training and nutrition approach.",
        weight_gain: "Increase overall body weight with a focus on gaining muscle mass through structured training and a calorie surplus diet.",
        weight_loss: "Reduce overall body weight primarily by losing fat through a calorie deficit, regular exercise, and consistent activity.",
        athletic: "Enhance overall athletic performance including speed, agility, power, coordination, and functional strength.",
        flexibility: "Improve joint mobility, muscle flexibility, and overall movement quality through stretching and mobility-focused training.",
        rehab: "Recover from injury safely by rebuilding strength, mobility, and stability with controlled and low-impact exercises.",
        general_fitness: "Improve overall health, fitness, strength, endurance, and mobility with a well-rounded and sustainable workout routine."
};

 const experienceMap: Record<string, string> = {
  beginner: "You are new to fitness training with little to no prior experience and need simple, guided workouts focusing on fundamentals.",
  novice: "You have some basic experience with workouts and are starting to build consistency and understanding of exercises.",
  intermediate: "You train regularly and have a solid understanding of workout structure, form, and progression techniques.",
  advanced: "You are highly experienced with structured training programs and can handle high intensity, volume, and complex routines.",
  athlete: "You train at a competitive or professional level with performance-focused goals and sport-specific conditioning."
};

 const equipmentMap: Record<string, string> = {
  dumbbells: "You have access to dumbbells and should focus on exercises that can be performed using them effectively.",
  barbell: "You have access to barbells and weight plates, allowing for compound lifts and strength-focused training.",
  machines: "You have access to gym machines which can help with controlled movements and isolation exercises.",
  resistance_bands: "You will be using resistance bands for flexible, low-impact, and portable training options.",
  kettlebell: "You have access to kettlebells, suitable for dynamic, functional, and strength-based movements.",
  full_gym: "You have full access to a gym with a wide range of equipment for a complete training program.",
  home: "You will be training at home with limited or minimal equipment, focusing on bodyweight and simple setups."
};

 const splitMap: Record<string, string> = {
  full_body: "Each workout session should target all major muscle groups for balanced full-body development.",
  upper_lower: "Split workouts into upper body and lower body days to allow better recovery and focus.",
  ppl: "Follow a Push, Pull, Legs split to organize workouts by movement patterns and muscle groups.",
  bro_split: "Train one muscle group per day with high volume for focused muscle development.",
  arnold_split: "Follow an Arnold-style split combining muscle groups with high volume and frequency.",
  phul: "Use a Power Hypertrophy Upper Lower split combining strength and muscle-building phases.",
  phat: "Follow Power Hypertrophy Adaptive Training for a mix of heavy strength work and hypertrophy volume.",
  body_part: "Focus each workout on specific body parts to maximize isolation and muscle growth.",
  cardio_only: "Workouts should focus entirely on cardiovascular training and endurance improvement.",
  hybrid: "Combine strength training and cardio in a balanced hybrid workout program.",
  custom: "Design a completely custom workout split based on preferences and specific goals."
};

return `Create a personalized ${profile.days_per_week}-day per week training plan for someone with the following profile:
    User Goal: ${goalMap[profile.goal] || profile.goal}
    Experience Level: ${experienceMap[profile.experience] || profile.experience}
    Session Duration: ${profile.session_length} minutes per session
    Equipment: ${equipmentMap[profile.equipment] || profile.equipment}
    Workout Split Preference: ${splitMap[profile.equipment] || profile.equipment}
    ${profile.injuries ? `Injuries/Linitations: ${profile.injuries}`: ""}

    Generate a complete training plan in JSON format  with this exact structure:
    Do not add any extra text, explanations, or comments outside the JSON.
    Follow this schema strictly and use meaningful values like the examples provided:

      {
        "id": "plan_unique_id_example",
        "userId": "user_unique_id_example",
        "overview": {
            "goal": "Build muscle and gain size through strength-focused training",
            "frequency": "x days per week",
            "split": "Upper/Lower split routine",
            "notes": "important notes about the program (2-3 sentence)"
        },
        "weeklySchedule": [
            {
            "day": "Monday",
            "focus": "muscle group or focus area",
            "exercise": [
                {
                "name": "Exercise name",
                "sets": 4,
                "reps": "6-10",
                "rest": "2-3 min",
                "rpe": 8,
                "notes": "form cues or tips(optional)",
                "alternatives": ["Alternative 1 ", "Alternative 2"]
                }
            ]
            }
        ],
        "progression": "Detailed progression strategy (2-3 sentence explaining how to progress)",
        }

        Requirements:
        - Create exactly ${profile.days_per_week} workout days
        - Each workout should fit within ${profile.session_length} minutes
        - Include 4-6 exercises per workout
        - Use RPE(Rate of pereived Exertion) should be between 6 and 9.
        - Include compound movements for begginers/intermediate,advance or given data can have more isolation
        - Match the prefered split type ${profile.preffered_split}
        - ${profile.injuries ? `Avoid exercise that could aggravate : ${profile.injuries}` : ""}
        - Provide exercise alternatives where appropriate
        - Make it progresive and suitable for ${experienceMap[profile.experience] || profile.experience} level
        - Ensure all fields are present in the final JSON.

        Return ONLY the JSON object (no markdown, no extra text)

    `;




}
