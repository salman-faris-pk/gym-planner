import { useAuth } from "@/context/AuthContext";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
// import {daysOptions,equipmentOptions,experienceOptions,goalOptions,sessionOptions,splitOptions} from "@/constants/fitness"
// import { Option } from "@/constants/types";


export default function Onboarding() {
  const { user } = useAuth();

  if (!user) {
    return <RedirectToSignIn />;
  }
  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {/*progress indicator */}

          {/*step1 questionaire */}

          {/*step2  generating*/}
        </div>
      </div>
    </SignedIn>
  );
}
