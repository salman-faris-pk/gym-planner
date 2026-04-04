import { useAuth } from "@/context/AuthContext";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import {
  goalOptions,
  experienceOptions,
  daysOptions,
  sessionOptions,
  splitOptions,
} from "@/constants/fitness";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { FormSelect } from "@/components/FormSelect";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import type { UserProfile } from "@/types";


export default function Onboarding() {
  const { user, saveProfile } = useAuth();
  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    prefferedSplit: "upper_lower",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setErorr] = useState("");

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function hanldeQuestionaire(e: React.SubmitEvent) {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
      goal: formData.goal as UserProfile["goal"],
      experience: formData.experience as UserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as UserProfile["equipment"],
      injuries: formData.injuries || undefined,
      prefferedSplit: formData.prefferedSplit as UserProfile["prefferedSplit"],
    };

    try {
      saveProfile(profile);
      setIsGenerating(true);
    } catch (err) {
      setErorr(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) {
    return <RedirectToSignIn />;
  };


  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {/*progress indicator */}

          {/*step1 questionaire */}
          {!isGenerating ? (
            <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg text-white/95">
                Tell Us About Yourself!
              </CardTitle>
              <CardDescription className="text-sm text-white/70 mt-2">
                Help Us create the perfect plan for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={hanldeQuestionaire}>
                <FormSelect
                  label="What’s your primary goal"
                  value={formData.goal}
                  onChange={(value) => updateForm("goal", value)}
                  options={goalOptions}
                  placeholder="Select a goal"
                />

                <FormSelect
                  label="Training experience"
                  value={formData.experience}
                  onChange={(value) => updateForm("experience", value)}
                  options={experienceOptions}
                  placeholder="Select experience"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    label="Days/Week"
                    value={formData.daysPerWeek}
                    onChange={(value) => updateForm("daysPerWeek", value)}
                    options={daysOptions}
                    placeholder="select Days Per Week"
                  />
                  <FormSelect
                    label="Session Length"
                    value={formData.sessionLength}
                    onChange={(value) => updateForm("sessionLength", value)}
                    options={sessionOptions}
                    placeholder="Select session length"
                  />
                </div>
                <FormSelect
                  label="Preffered training split"
                  value={formData.prefferedSplit}
                  onChange={(value) => updateForm("prefferedSplit", value)}
                  options={splitOptions}
                  placeholder="Select split training.."
                />
                <Label className="text-xs tracking-wide font-light text-white/90">
                  Any injuries or limitations? (optional)
                </Label>
                <Textarea
                  value={formData.injuries}
                  onChange={(e) => updateForm("injuries", e.target.value)}
                  placeholder="E.g., lowerback issues, shoulder impigement..."
                  className="border-amber-50/20 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none placeholder:text-xs -mt-3"
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 gap-2 bg-accent text-black/80 hover:text-black cursor-pointer"
                  >
                    Generate My Plan <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card> ) 
              : (
               <Card className="text-center py-16 ">
                 <Loader2 className="w-10 h-10 text-accent mx-auto animate-spin duration-700 mb-4 transition-transform"/>
                 <CardTitle className="text-2xl font-bold mb-2">
                   Creating your Plan
                 </CardTitle>
                 <CardDescription className="text-muted">
                   {" "}
                   Our AI is building your personaized training program...
                 </CardDescription>
               </Card>
          )}
        </div>
      </div>
    </SignedIn>
  );
}
